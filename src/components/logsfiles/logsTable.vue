<script setup>
import { getDirectory } from "@/composables/useDirectories"
import { getDate } from "@/composables/useTextFormat"

const props = defineProps({
  user: {
    type: String,
    required: true,
  },
})

const route = useRoute()

const serverId = route.params.id
const query = ref(`/var/log`)

const directory = ref(await getDirectory(serverId, query.value))
const loadingState = ref(false)


const headers = [
  { title: 'File Name', key: 'name' },
  { title: 'File Type', key: 'type' },
  { title: 'Permissions', key: 'rights' },
  { title: 'Owner', key: 'owner' },
  { title: 'Group', key: 'group' },
  { title: 'Size', key: 'size' },
  { title: 'Access Time', key: 'accessTime' },
  { title: 'Modify Time', key: 'modifyTime' },
]
</script>

<template>
  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="directory"
            :items-per-page="50"
            class="text-no-wrap"
            density="compact"
            :loading="loadingState"
          >
            <template #item.name="{item}">
              <span style="cursor: pointer;">
                {{ item.name }}
              </span>
            </template>

            <template #item.type="{item}">
              {{ item.type === 'd' ? 'Folder' : 'File' }}
            </template>

            <template #item.rights="{item}">
              {{ `${item.rights.user}-${item.rights.group}-${item.rights.other}` }}
            </template>

            <template #item.accessTime="{item}"> 
              {{ getDate(item.accessTime) }}
            </template>

            <template #item.modifyTime="{item}"> 
              {{ getDate(item.modifyTime) }}
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import ViewDialog from "@/components/dialogs/directory/viewDialog.vue"
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
const query = ref(``)

const directory = ref(await getDirectory(serverId, `/var/log${query.value}`))
const loadingState = ref(false)

const viewLog = ref(false)
const editLog = ref(false)
const deleteLog = ref(false)

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

const onQuery = async () => {
  loadingState.value=true
  directory.value = await getDirectory(serverId, `/var/log${query.value}`)
  loadingState.value=false
}

const appendFolder = async folder => {
  query.value += `/${folder}`
  await onQuery()
}

const selectedFile = ref(null)

const onView = item => {
  selectedFile.value = item
  viewLog.value = true
}

const onClose = () => {
  selectedFile.value = null
  viewLog.value = false
  editLog.value = false
  deleteLog.value = false
}

const onUpdate = async () => {
  await onQuery()
}
</script>

<template>
  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <div class="d-flex align-center w-100">
            <!-- Search  -->
            <VForm @submit.prevent="onQuery">
              <VTextField
                v-model="query"
                placeholder="/var/log"
                density="compact"
                variant="plain"
                class="app-user-search-filter"
              />
            </VForm>
          </div>
    
          <VDivider class="mt-3 mb-3" />
          <VDataTable
            :headers="headers"
            :items="directory"
            :items-per-page="50"
            class="text-no-wrap"
            density="compact"
            :loading="loadingState"
          >
            <template #item.name="{item}">
              <a
                v-if="item.type === 'd'"
                style="cursor: pointer;"
                @click="appendFolder(item.name)"
              >{{ item.name }}</a>

              <div v-else>
                <span style="cursor: pointer;">
                  {{ item.name }}
                </span>
                <VMenu activator="parent">
                  <VList>
                    <VListItem
                      link
                      @click="onView(item.name)"
                    >
                      <template #prepend>
                        <VIcon icon="ri-eye-line" />
                      </template>
                      <VListItemTitle>View</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </div>
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

  <VDialog
    v-model="viewLog"
    :max-width="600"
  >
    <ViewDialog
      :id="parseInt(serverId)"
      :query="query.value ? `/var/log/${query.value}/` : `/var/log`"
      :file-name="selectedFile"
      @close="onClose"
    />
  </VDialog>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}
</style>

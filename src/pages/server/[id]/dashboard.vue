<script setup>
import { getCpuUsage, getMemoryUsage, getOS, getSpecification, getVolumes } from '@/composables/useSsh'
import linux from '@images/avatars/linux.png'

const router = useRouter()
const route = useRoute()

const serverId = route.params.id

const headers = [
  { title: 'File System', key: 'Filesystem' },
  { title: '1K-Blocks', key: '1K-blocks' },
  { title: 'Used', key: 'Used' },
  { title: 'Available', key: 'Available' },
  { title: 'Use %', key: 'Use%' },
  { title: 'Mounted On', key: 'Mounted' },
]

const data = ref({
  osInformation: await getOS(serverId),
  serverSpecification: await getSpecification(serverId),
  cpuUsage: await getCpuUsage(serverId),
  memoryUsage: await getMemoryUsage(serverId),
  volumes: await getVolumes(serverId),
})

console.log(data.value.volumes)
</script>

<template>
  <VRow>
    <VCol class="justify-space-between item-center">
      <div class="d-flex flex-row gap-3">
        <h2 class="font-weight-medium">
          Dashboard
        </h2>
      </div>
    </VCol>
  </VRow>

  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <div class="d-flex flex-row align-center">
            <div>
              <span class="font-weight-medium">
                SERVER ACTIONS
              </span>
            </div>

            <VSpacer />

            <div class="d-flex flex-row gap-3 align-center">
              <VBtn density="compact">
                <VIcon
                  start
                  icon="ri-restart-line"
                />
                RESTART
              </VBtn>
              <VBtn 
                density="compact" 
                @click="() => {
                  router.push('logs')
                }"
              >
                <VIcon
                  start
                  icon="ri-file-list-3-line"
                />
                LOGS
              </VBtn>
              <VBtn
                density="compact"
                @click="() => {
                  router.push('directories')
                }"
              >
                <VIcon
                  start
                  icon="ri-file-line"
                />
                DIRECTORIES
              </VBtn>
              <VBtn
                density="compact"
                @click="() => {
                  router.push('console')
                }"
              >
                <VIcon
                  start
                  icon="ri-keyboard-line"
                />
                CONSOLE
              </VBtn>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VImg :src="linux" />
            </VCol>
            <VCol cols="6">
              <VCard class="h-100">
                <VCardText>
                  <span class="font-weight-medium">
                    OS INFORMATION
                  </span>

                  <div
                    v-for="(item, key ) in data.osInformation"
                    :key="key"
                    class="d-flex flex-row"
                  >
                    {{ key }}: <VSpacer /> {{ item }}
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="6">
              <VCard class="h-100">
                <VCardText>
                  <span class="font-weight-medium">
                    SERVER SPECIFICATION
                  </span>

                  <div
                    v-for="(item, key ) in data.serverSpecification"
                    :key="key"
                    class="d-flex flex-row"
                  >
                    {{ key }}: <VSpacer /> {{ item }}
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="6">
      <VCard>
        <VCardText class="d-flex flex-row">
          <span class="font-weight-medium">
            CPU LOAD
          </span>

          <VSpacer />
          <span>
            {{ data.cpuUsage }}
          </span>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="6">
      <VCard>
        <VCardText class="d-flex flex-row">
          <span class="font-weight-medium">
            MEMORY
          </span>
          <VSpacer />
          <span>
            {{ data.memoryUsage }}
          </span>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <span class="font-weight-medium">
            VOLUME LIST
          </span>

          <VDataTable
            :headers="headers"
            :items="data.volumes"
            :items-per-page="10"
            class="text-no-wrap"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

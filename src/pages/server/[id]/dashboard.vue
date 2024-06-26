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
                <b>
                  SERVER ACTIONS
                </b>
              </span>
            </div>

            <VSpacer />

            <div class="d-flex flex-row gap-3 align-center">
              <VBtn
                density="compact"
                disabled
              >
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
              <VImg
                :src="linux"
                max-height="10rem"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VCard class="h-100">
                <VCardText>
                  <span>
                    <b>OS INFORMATION</b> 
                  </span>

                  <div
                    v-for="(item, key ) in data.osInformation"
                    :key="key"
                    class="d-md-flex flex-row d-lg-block"
                  >
                    <div class="font-weight-medium">
                      {{ key }}:
                    </div> 
                    <VSpacer /> 
                    <div>
                      {{ item }}
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VCard class="h-100">
                <VCardText>
                  <span>
                    <b>SERVER SPECIFICATION</b> 
                  </span>

                  <div
                    v-for="(item, key ) in data.serverSpecification"
                    :key="key"
                    class="d-md-flex flex-row d-lg-block"
                  >
                    <div class="font-weight-medium">
                      {{ key.toUpperCase() }}:
                    </div> 
                    <VSpacer /> 
                    <div>
                      {{ item }}
                    </div>
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
          <span>
            <b>
              CPU LOAD
            </b>
          </span>

          <VSpacer />
          <span>
            {{ (data.cpuUsage * 100).toFixed(2) }} %
          </span>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="6">
      <VCard>
        <VCardText class="d-flex flex-row">
          <span>
            <b>
              MEMORY
            </b>
          </span>
          <VSpacer />
          <span>
            {{ (data.memoryUsage * 100).toFixed(2) }} %
          </span>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <span>
            <b>
              VOLUME LIST
            </b>
          </span>

          <VDivider class="mt-3 mb-3" />
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

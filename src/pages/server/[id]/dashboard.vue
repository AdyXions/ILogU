<script setup>
import linux from '@images/avatars/linux.png'

const router = useRouter()

const headers = [
  { title: 'File System', key: '' },
  { title: '1K-Blocks', key: '' },
  { title: 'Used', key: '' },
  { title: 'Available', key: '' },
  { title: 'Use %', key: '' },
  { title: 'Mounted On', key: '' },
]

const sample = ref({
  
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
            <VCol cols="2">
              <VImg :src="linux" />
            </VCol>
            <VCol>
              <VCard>
                <VCardText>
                  <span class="font-weight-medium">
                    OS INFORMATION
                  </span>
                </VCardText>
              </VCard>

              <VCard class="mt-3">
                <VCardText>
                  <span class="font-weight-medium">
                    SERVER SPECIFICATION
                  </span>
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
        <VCardText>
          <span class="font-weight-medium">
            CPU LOAD
          </span>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="6">
      <VCard>
        <VCardText>
          <span class="font-weight-medium">
            MEMORY
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
            :items="data"
            :items-per-page="5"
            class="text-no-wrap"
          >
            <template #item.id="{ item }">
              <span class="text-h6">{{ item.id }}</span>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

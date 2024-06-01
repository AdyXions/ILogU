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

const data = ref({
  osInformation: null,
  serverSpecification: null,

})

const getData = async () => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "cat /etc/os-release",
    }),
    redirect: "follow",
  })

  data.value.osInformation =  (await response.text()).split('\n').map(item => item.split("=")).slice(0, 8)
  
}

await getData()
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
              <VCard>
                <VCardText>
                  <span class="font-weight-medium">
                    OS INFORMATION
                  </span>

                  <div
                    v-for="(item, key ) in data.osInformation"
                    :key="key"
                    class="d-flex flex-row"
                  >
                    {{ item[0] }}: <VSpacer /> {{ item[1] }}
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="6">
              <VCard>
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

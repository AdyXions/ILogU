<script setup>

const router = useRouter()

const Server = ref({
  id: null,
  hostname: null,
  port: null,
  user: null,
  password: null,
  privateKey: null,
})

const AddEditDialog  = ref(false)

const onAddEdit = () => {
  Server.value = {
    id: null,
    hostname: null,
    port: '',
    user: '',
    password: '',
    privateKey: '',
  }
  AddEditDialog.value = true
}

const onClose = () => {
  AddEditDialog.value = false
}

const items = ref([])


const fetchServers = async () => {
  try {
    const response = await $api('/users/me', {
      method: 'GET',
      params: {
        fields: ['ssh_tokens.*', 'ssh_tokens.tags.*'],
      },
    })

    // console.log(response.data.ssh_tokens)

    items.value = response.data.ssh_tokens.map(item => ({
      id: item.id,
      icon: 'ri-server-fill',
      name: item.server_name,
      lastHealthCheck: new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      tags: item.tags,
    }))
  } catch (e) {
    console.log(e)
  }
}

fetchServers()
</script>

<template>
  <VCol cols="12">
    <div class="d-flex justify-space-between align-center">
      <h2 class="font-weight-medium">
        Home
      </h2>
      <VBtn
        color="primary"
        elevated
        @click="onAddEdit"
      >
        Add Server
      </VBtn>
    </div>
  </VCol>
  
  
  
  <VContainer>
    <VRow v-if="items.length > 0">
      <VCol
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        lg="4"
        md="6"
      >
        <VHover v-slot="{ isHovering, props }">
          <VCard
            density="compact"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 2"
            class="mx-auto"
            v-bind="props"
            style="cursor: pointer;"
            @click="router.push('/server/' + item.id + '/dashboard')"
          >
            <VCardText>
              <VRow>
                <VCol
                  cols="4"
                  class="d-flex align-center"
                >
                  <div class="text-center">
                    <VIcon size="40">
                      {{ item.icon }}
                    </VIcon>
                    <div>
                      {{ item.name }}
                    </div>
                    <VDivider class="my-3" />
                    <VChip
                      size="x-small"
                      :color="healthCheck(item.id) ? 'success' : 'error'"
                    >
                      {{ healthCheck(item.id) ? 'Healthy' : 'Down' }}
                    </VChip>
                  </div>
                </VCol>

                <VCol cols="8">
                  <VRow>
                    <VCol class="d-flex align-center">
                      <VIcon icon="ri-time-line" />
                      <i> {{ item.lastHealthCheck }}</i>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VIcon>
                        ri-price-tag-3-line
                      </VIcon> 
                      {{ item.tags.length > 0 ? item.tags.join(', ') : 'No tags' }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol
                      cols="12"
                      class="d-flex align-center"
                    >
                      <VIcon icon="ri-file-list-line" />
                      <div> Hello</div>
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VHover>
      </VCol>
    </VRow>
  </VContainer>
  <!-- AddEdit Dialog -->
  <VDialog
    v-model="AddEditDialog"
    transition="dialog-top-transition"
    :max-width="1000"
  >
    <AddEditServerDialog @close="onClose" />
  </VDialog>
</template>



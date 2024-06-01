<script setup>
import { ref } from 'vue'

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

const items = ref([
  { 
    icon: 'ri-server-fill', 
    name: 'Server 1', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:00', 
    tags: ['Production', 'Critical'], 
    specs: '16GB RAM, 4 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 2', 
    healthCheck: 'Unhealthy', 
    lastHealthCheck: '2024-06-01 09:30', 
    tags: ['Staging'], 
    specs: '8GB RAM, 2 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 3', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:05', 
    tags: ['Development'], 
    specs: '4GB RAM, 2 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 4', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:00', 
    tags: ['Production', 'Critical'], 
    specs: '16GB RAM, 4 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 5', 
    healthCheck: 'Unhealthy', 
    lastHealthCheck: '2024-06-01 09:30', 
    tags: ['Staging'], 
    specs: '8GB RAM, 2 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 6', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:05', 
    tags: ['Development'], 
    specs: '4GB RAM, 2 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 7', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:00', 
    tags: ['Production', 'Critical'], 
    specs: '16GB RAM, 4 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 8', 
    healthCheck: 'Unhealthy', 
    lastHealthCheck: '2024-06-01 09:30', 
    tags: ['Staging'], 
    specs: '8GB RAM, 2 CPUs', 
  },
  { 
    icon: 'ri-server-fill', 
    name: 'Server 9', 
    healthCheck: 'Healthy', 
    lastHealthCheck: '2024-06-01 10:05', 
    tags: ['Development'], 
    specs: '4GB RAM, 2 CPUs', 
  },
])
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
    <VRow>
      <VCol
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="4"
      >
        <VHover v-slot="{ isHovering, props }">
          <VCard
            density="compact"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 2"
            class="mx-auto"
            v-bind="props"
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
                  </div>
                </VCol>

                <VCol cols="8">
                  <VRow>
                    <VCol cols="5">
                      <VChip size="x-small">
                        {{ item.healthCheck }}
                      </VChip>
                    </VCol>
                    <VCol cols="7">
                      <i> {{ item.lastHealthCheck }}</i>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VIcon>
                        ri-price-tag-3-line
                      </VIcon> 
                      {{ item.tags.join(', ') }}
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <div> {{ item.specs }}</div>
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



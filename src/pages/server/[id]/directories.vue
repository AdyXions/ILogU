<script setup>
const router = useRouter()

const headers = [
  { title: 'File System', key: 'Filesystem' },
  { title: '1K-Blocks', key: '1K-blocks' },
  { title: 'Used', key: 'Used' },
  { title: 'Available', key: 'Available' },
  { title: 'Use %', key: 'Use%' },
  { title: 'Mounted On', key: 'Mounted' },
]
</script>

<template>
  <VRow>
    <VCol class="justify-space-between item-center">
      <div class="d-flex flex-row gap-3">
        <h2
          class="font-weight-medium"
          @click="() => {
            router.push('dashboard')
          }"
        >
          Dashboard
        </h2>
        <h2 class="font-weight-medium">
          >
        </h2>
        <h2 class="font-weight-medium">
          Directories
        </h2>
      </div>
    </VCol>
  </VRow>

  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items-per-page="50"
            class="text-no-wrap"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

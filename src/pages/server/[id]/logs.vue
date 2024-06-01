<script setup>

const router = useRouter()
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
          Logs
        </h2>
      </div>
    </VCol>
  </VRow>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const serverId = route.params.id

const user = ref()

const getUser = async () => {
  try {
    const response = await $api(`/items/tokens/${serverId}`, { method: "GET" })
    
    user.value = response.data.user
  } catch (error)  {
    console.log(error)
  }
}

await getUser()
</script>

<template>
  <VRow>
    <VCol class="justify-space-between item-center">
      <div class="d-flex flex-row gap-3">
        <h2
          class="font-weight-medium"
          style="cursor: pointer;"
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
          Log Files
        </h2>
      </div>
    </VCol>
  </VRow>

  <LogsTable :user="user" />
</template>

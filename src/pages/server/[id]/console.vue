<script setup>
import { consoleCommand } from "@/composables/useSsh"

const router = useRouter()
const route = useRoute()

const serverId = route.params.id
const command = ref('')
const result = ref('')

const onSubmit = async () => {
  result.value = await consoleCommand(serverId, command.value)
}
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
          Console
        </h2>
      </div>
    </VCol>
  </VRow>

  <VRow>
    <VCol>
      <VCard class="h-100">
        <VCardText>
          <div>
            <span class="font-weight-medium">
              <b>
                Result
              </b>
            </span>
          </div>
          <VTextarea
            v-model="result"
            class="mb-3 h-100"
            readonly
          />

          <div>
            <span class="font-weight-medium">
              <b>
                Command
              </b>
            </span>
          </div>
          <VForm @submit.prevent="onSubmit">
            <VTextField
              v-model="command"
              density="compact"
            />
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

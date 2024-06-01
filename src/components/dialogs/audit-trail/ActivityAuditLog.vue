<script setup lang="ts">
const isDialogOpen = ref(false)
const data = ref()


const setDialog = (item: any) => {
  data.value = item
  isDialogOpen.value = true
}

defineExpose({setDialog})
</script>

<template>
  <div>
    <VDialog v-model="isDialogOpen">
      <VCard class="mx-auto" style="max-inline-size: 30rem;">
        <VCardTitle>
          Log
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="data.action"
                label="Action"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="data.user.email"
                label="User"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="data.timestamp"
                label="Date"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="data.ip"
                label="IP Address"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="data.user_agent"
                label="User Agent"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="12"> 
              <VTextField
                v-model="data.collection"
                label="Collection"
                readonly
              ></VTextField>
            </VCol> 
            <VCol>
              <VTextField
                v-model="data.comment"
                label="Comment"
                readonly
              ></VTextField>
            </VCol>

          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn @click="isDialogOpen = false">
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

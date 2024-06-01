<script setup>
const props = defineProps({
  id: {
    type: Number,
  },
  query: {
    type: String,
  },
  fileName: {
    type: String,
  },
})

const emit = defineEmits(['close'])

const content = ref(await getFile(props.id, `${props.query}/${props.fileName}`))


// Close function
const onClose = () => {
  emit('close')
}
</script>

<template>
  <VCard>
    <VForm ref="refForm">
      <VRow>
        <VCardText>
          <VCol
            cols="12"
            md="12"
          >
            <h3 class="font-weight-medium">
              View File
            </h3>
            <DialogCloseBtn
              variant="text"
              size="default"
              @click="onClose"
            />
          </VCol>

          <VDivider class="my-3" />


          <VCol>
            <VTextarea
              v-model="content"
              readonly
            />
          </VCol>
        </VCardText>
      </VRow>
    </VForm>
  </VCard>
</template>

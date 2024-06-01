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

const emit = defineEmits(['close', 'update'])


// Close function
const onClose = () => {
  emit('close')
}

// Save function
const onConfirm = async () => {
  await deleteFile(props.id, props.query, props.fileName)
  emit('update')
  emit('close')
}
</script>

<template>
  <VCard>
    <VForm
      ref="refForm"
      @submit.prevent="(onConfirm)"
    >
      <VRow>
        <VCardText>
          <VCol
            cols="12"
            md="12"
          >
            <h3 class="font-weight-medium">
              Delete File
            </h3>
            <DialogCloseBtn
              variant="text"
              size="default"
              @click="onClose"
            />
          </VCol>

          <VDivider class="my-3" />

          <VCol>
            <p>
              Are you sure you want to remove this file?
            </p>
          </VCol>

          <VCol class="d-flex justify-end gap-5">
            <VBtn type="submit">
              Yes
            </VBtn>
            <VBtn
              color="secondary"
              @click="onClose"
            >
              No
            </VBtn>
          </VCol>
        </VCardText>
      </VRow>
    </VForm>
  </VCard>
</template>

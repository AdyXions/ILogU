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

const newFileName = ref('')

// Close function
const onClose = () => {
  emit('close')
}

// Save function
const onConfirm = async () => {
  await renameFile(props.id, props.query, props.fileName, newFileName.value)
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
              Rename File
            </h3>
            <DialogCloseBtn
              variant="text"
              size="default"
              @click="onClose"
            />
          </VCol>

          <VDivider class="my-3" />

          <VCol>
            <VTextField
              v-model="newFileName"
              label="File Name"
              placeholder="New File Name"
            />
          </VCol>

          <VCol class="d-flex justify-end gap-5">
            <VBtn type="submit">
              Save
            </VBtn>
            <VBtn
              color="secondary"
              @click="onClose"
            >
              Cancel
            </VBtn>
          </VCol>
        </VCardText>
      </VRow>
    </VForm>
  </VCard>
</template>

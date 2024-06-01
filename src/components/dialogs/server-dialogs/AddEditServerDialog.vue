<script setup>
const emit = defineEmits()

const selectedRadio = ref('Password')

const tags = ref([])

const dialog = ref(false)

const save = () => {

}

const close = () => {
  emit('close')
}
</script>

<template>
  <VCard>
    <VCardTitle>
      <div class="headline my-3">
        {{ id ? 'Edit Server' : 'Add Server' }}
      </div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <VTextField
            v-model="hostname"
            label="Hostname"
          />
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <VTextField
            v-model="port"
            label="Port"
          />
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <VTextField
            v-model="user"
            label="User"
          />
        </VCol>
        <VCol cols="12">
          <VCombobox
            v-model="tags"
            clearable
            multiple
            chips
            label="Tags"
          />
        </VCol>
      </VRow>
      <VDivider class="my-5" />

      <VRow>
        <VCol>
          <VRadioGroup
            v-model="selectedRadio"
            horizontal
          >
            <VRadio
              label="Password"
              value="Password"
            />
            <VRadio
              label="Private Key"
              value="Private Key"
              disabled
            />
          </VRadioGroup>
        </VCol>
      </VRow>

      <VRow>
        <VCol v-show="selectedRadio == 'Password'">
          <VTextField
            v-model="password"
            label="Password"
            type="password"
          />
        </VCol>
        <VCol v-show="selectedRadio == 'Private Key'">
          <VFileInput
            v-model="privateKey"
            label="Private Key"
          />
        </VCol>
      </VRow>
    </VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn
        color="primary"
        @click="save"
      >
        Save
      </VBtn>
      <VBtn @click="close">
        Cancel
      </VBtn>
    </VCardActions>
  </VCard>
</template>


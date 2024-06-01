<script setup>
const selectedRadio = ref('Password')

const dialog = ref(false)


const content = ref({
  hostname: '',
  port: '',
  user: '',
  tags: [],
  password: '',
})
</script>

<template>
  <div>
    <VBtn @click="dialog = !dialog">
      Add Server
    </VBtn>

    <VDialog v-model="dialog">
      <VCard class="mx-auto">
        <VCardTitle>
          <div class="headline my-3">
            {{ id ? 'Edit Server' : 'Add Server' }}
          </div>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="content.hostname"
                label="Hostname"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="content.port"
                label="Port"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="content.user"
                label="User"
              />
            </VCol>
            <VCol cols="12">
              <VCombobox
                v-model="content.tags"
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
                v-model="content.password"
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
    </VDialog>
  </div>
</template>


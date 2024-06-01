<script setup>
/* eslint-disable camelcase */

import { firstName, lastName, email, password, emailRule } from '@/composables/useUsersApi'

const emit = defineEmits()

const saveUser = async () => {
  try {
    const formData = {
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      password: password.value,
    }

    const response = await $api('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    // Reset form values to null
    email.value = null
    firstName.value = null
    lastName.value = null
    password.value = null

    emit('update')
    close()

  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

const dialog = ref(false)

const save = () => {

}

const close = () => {
  emit('close')
}
</script>

<template>
  <VCard>
    <VRow>
      <VCol>
        <VCardTitle>Add User</VCardTitle>
      </VCol>
    </VRow>
    <VCardText>
      <VForm ref="form">
        <VRow>
          <VCol>
            <VTextField
              v-model="firstName"
              label="First Name"
              :rules="[requiredValidator]"
            />
          </VCol>
          <VCol>
            <VTextField
              v-model="lastName"
              label="Last Name"
              :rules="[requiredValidator]"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VTextField
              v-model="email"
              label="Email"
              :rules="[requiredValidator, emailRule]"
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VTextField
              v-model="password"
              label="Password"
              :rules="[requiredValidator]"
              type="password"
            />
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn
        color="primary"
        @click="saveUser"
      >
        Save
      </VBtn>
      <VBtn
        color="secondary"
        @click="close"
      >
        Cancel
      </VBtn>
    </VCardActions>
  </VCard>
</template>

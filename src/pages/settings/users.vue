<script setup>
import { ref } from 'vue'
import { headers, users, getUsers } from '@/composables/useUsersApi'

onMounted(getUsers)

const newUser = ref({ id: '', email: '' })
const addEditDialog = ref(false)

const onAddUser = () => {
  newUser.value = { id: '', email: '' }
  addEditDialog.value = true
}

const onClose = () => {
  addEditDialog.value = false
}

const saveUser = () => {
  if (newUser.value.id && newUser.value.email) {
    users.value.push({ ...newUser.value })
    onClose()
  }
}

const deleteUser = id => {
  users.value = users.value.filter(user => user.id !== id)
}
</script>

<template>
  <VRow>
    <VCol>
      <h2 class="font-weight-medium">
        User List
      </h2>
    </VCol>
    <VCol class="text-right">
      <VBtn
        color="primary"
        @click="onAddUser"
      >
        Add User
      </VBtn>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="users"
            class="elevation-1"
          >
            <template #[`item.email`]="{ item }">
              {{ item.email }}
            </template>
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.actions`]="{ item }">
              <VIcon @click="deleteUser(item.id)">
                ri-delete-bin-6-line
              </VIcon>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog
    v-model="addEditDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>Add/Edit User</VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VTextField
            v-model="newUser.id"
            label="ID"
            required
          />
          <VTextField
            v-model="newUser.email"
            label="Email"
            required
          />
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
          @click="onClose"
        >
          Cancel
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>


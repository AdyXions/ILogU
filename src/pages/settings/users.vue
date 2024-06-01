<script setup>
import { getUsers, headers, users, deleteUser } from '@/composables/useUsersApi'
import { ref } from 'vue'
import AddUsersDialog from '@/components/dialogs/users/AddUsersDialog.vue'

onMounted(getUsers)

const addEditDialog = ref(false)

const onAddUser = () => {
  addEditDialog.value = true
}

const onClose = () => {
  addEditDialog.value = false
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
            @update:options="getUsers"
          >
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
    transition="dialog-top-transition"
    max-width="750px"
  >
    <AddUsersDialog
      @close="onClose"
      @update="getUsers"
    />
  </VDialog>
</template>


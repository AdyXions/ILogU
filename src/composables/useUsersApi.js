export const headers = ref([
  { title: 'Email', key: 'email' },
  { title: 'First Name', key: 'first_name' },
  { title: 'Last Name', key: 'last_name' },
  { title: 'Actions', key: 'actions', sortable: false },
])

export const users = ref([])

export const email = ref('')
export const firstName = ref('')
export const lastName = ref('')
export const password = ref('')

export const emailRule = value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'

export const getUsers = async () => {
  try {

    const response =  await $api(`/users`, {
      method: 'GET',
    })

    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
export const deleteUser = async userId => {
  try {
    await $api(`/users/${userId}`, {
      method: 'DELETE',
    })

    // Update the users array after deletion
    users.value = users.value.filter(user => user.id !== userId)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}


export const headers = ref([
  { title: 'Email', key: 'email' },
  { title: 'First Name', key: 'first_name' },
  { title: 'Last Name', key: 'last_name' },
  { title: 'Actions', key: 'actions', sortable: false },
])

export const users = ref([])

export const getUsers = async (id, email) => {
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

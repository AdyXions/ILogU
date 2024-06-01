<script setup>
import ActivityAuditLog from '@/components/dialogs/audit-trail/ActivityAuditLog.vue'

const ActivityAuditLogRef = ref()

const headers = [
  { title: 'User', key: 'user.email' },
  { title: 'Action', key: 'action' },
  { title: 'Date', key: 'timestamp' },
  { title: 'Actions', key: 'actions' },
]

const tableSettings = ref({
  headers: headers,
  items: [],
  loading: false,
  page: 1,
  itemsPerPage: 10,
  search: '',
  totalItems: 0,
})

const fetchData = async options => {
  tableSettings.value.loading = true

  try {
    const response = await $api(`/activity`, {
      method: 'GET',
      params: {
        fields: ['action', 'user.email', 'timestamp', '*'],
        sort: '-timestamp',
        page: options.page,
        limit: options.itemsPerPage,
        meta: 'total_count',
      },
    })

    tableSettings.value.totalItems = response.meta.total_count

    tableSettings.value.items = response.data.sort((a, b) =>  a.timestamp - b.timestamp)

  } catch (error) {
    console.log(error)
  }

  tableSettings.value.loading = false

}

const openLog = item => {
  ActivityAuditLogRef.value.setDialog(item)
}
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>Audit Trail</VCardTitle>
      <VCardText>
        <VDataTableServer
          v-model:items-per-page="tableSettings.itemsPerPage"
          :items="tableSettings.items"
          :loading="tableSettings.loading"
          :search="tableSettings.search"
          :headers="headers"
          :items-length="tableSettings.totalItems"
          @update:options="fetchData"
        >
          <template #item.actions="{item}">
            <div>
              <VBtn
                icon="ri-eye-line"
                variant="text"
                @click="openLog(item)"
              />
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>


    <ActivityAuditLog ref="ActivityAuditLogRef" />
  </div>
</template>

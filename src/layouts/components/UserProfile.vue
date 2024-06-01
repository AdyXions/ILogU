<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const router = useRouter()

const logout = async () => {
  try {
    await $api('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: sessionStorage.getItem('refresh_token'),
      }),
    })

    sessionStorage.clear()

    router.push('/login')
  } catch (e) {
    console.log(e)
  }
}

if (!sessionStorage.getItem('access_token')) {
  router.push('/login')
}
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      size="38"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="15px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <h6 class="text-sm font-weight-medium">
              John Doe
            </h6>
            <VListItemSubtitle class="text-capitalize text-disabled">
              Admin
            </VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VListItem>
              <VBtn
                block
                color="error"
                append-icon="ri-logout-box-r-line"
                @click="logout"
              >
                Logout
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

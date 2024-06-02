<script setup lang="ts">
const props = defineProps(['item', 'query', 'id'])
const emit = defineEmits(['done'])
const permission = ref('')

const process = async () => {
  $api('/ssh', {
    method: 'POST',
    body: {
      command: `chmod ${permission.value} ${props.query}/${props.item}`,
      server_id: props.id,
    },
  })

  emit('done')
}
</script>

<template>
  <div>
    <VCard title="Change Permission">
      <VCardText>
        <VTextField
          v-model="permission"
          label="Enter Permission Code"
          placeholder="777"
          type="number"
        />

        <!-- {{ `${props.query}/${props.item}` }} -->
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          :disabled="permission == ''"
          @click="process"
        >
          Apply
        </VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>

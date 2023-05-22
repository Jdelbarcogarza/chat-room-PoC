<template>
  <div class="bg-sendingMsgGray self-end py-1 px-3 rounded-xl rounded-br w-fit text-white font-medium">
    <p>{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
	text: string;
}>();
</script>
<template>
	<div
		class="bg-incomingMsgGreen mt-0.5 py-1 px-3 md:px-4 md:py-1.5 rounded-xl rounded-br w-fit text-white font-medium md:text-xl"
	>
		<p>{{ props.text }}</p>
</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	text: string;
}>();
</script>

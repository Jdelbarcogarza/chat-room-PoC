<template>
	<div
		class="bg-incomingMsgGreen py-1 px-3 rounded-xl rounded-bl w-fit text-white font-medium"
	>
		<p>{{ props.text }}</p>
</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	text: string;
}>();
</script>

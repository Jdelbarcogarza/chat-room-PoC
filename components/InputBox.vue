<template>
	<div class="flex bg-blue-200 items-center p-2">
		<textarea
			id="chat"
			rows="1"
			v-model="message"
			class="block flex-grow p-2.5 w-full text-sm text-gray-900 bg-white rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none h-auto"
			placeholder="Mensaje"
		></textarea>

		<!-- Icono viene de: https://icones.js.org/collection/ic?s=send -->
		<button
			type="submit"
      @click="sendMessage()"
			class="inline-flex justify-center p-2 ml-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
		>
			<Icon name="ic:round-send" size="24" class="" />
			<span class="sr-only">Send message</span>
		</button>
	</div>
</template>

<script setup lang="ts">
const message = ref<string>();

const emit = defineEmits<{
  (event: "sendMessage", text: string): void 
}>()

async function sendMessage() {
  
  // validar que si se tenga un mensaje en el text box.
  if (!message.value) {
    return
  }
  console.log(message.value);
  emit("sendMessage", message.value)

  // clear state.
  message.value = ""

}

</script>

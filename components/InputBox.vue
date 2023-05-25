<template>
	<form
		@submit.prevent="sendMessage()"
		class="flex bg-incomingMsgGreen items-center p-2"
	>
		<input
			id="chat"
			v-model="message"
			type="text"
			class="block flex-grow p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Mensaje"
		/>

		<!-- Icono viene de: https://icones.js.org/collection/ic?s=send -->
		<button
			type="submit"
			class="inline-flex justify-center p-2 ml-2 text-sendingMsgGray rounded-full cursor-pointer hover:bg-gray-200"
		>
			<Icon name="ic:round-send" size="24" class="" />
			<span class="sr-only">Send message</span>
		</button>
	</form>
</template>

<script setup lang="ts">
import axios from "axios";

const emit = defineEmits<{
	(event: "sendMessage", text: string): void;
}>();

const message = ref<string>();

async function sendMessage() {
	// validar que si se tenga un mensaje en el text box.
	if (!message.value) {
		return;
	}
	console.log(message.value);
	// enviar valor del mensaje
	emit("sendMessage", message.value);

	// clear state.
	message.value = ""
}
</script>

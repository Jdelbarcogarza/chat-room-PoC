<template>
	<!-- contenedor del chat -->
	<div class="min-w-sm max-w-md bg-orange-200 h-96 overflow-y-auto">
		<!-- chat -->
		<ul
			class="flex flex-col p-2"
			:ref="ul"
			id="chatList"
			
		>
			<!-- <ChatComponent :chat="messages" /> -->
			<template v-for="message in messages">
				<li v-if="message.isIncomingMessage">
					<IncomingMessage :text="message.text" />
				</li>

				<li v-else class="self-end">
					<SendingMessage :text="message.text" />
				</li>
			</template>
		</ul>
		<TypingBubble :is-typing="true" />
	</div>

	<div>
		<div class="mb-6">
			<label
				for="default-input"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Default input</label
			>

			<InputBox class="max-w-md" @send-message="addMessage" />
			<InputBox
				class="max-w-md bg-red-400"
				@send-message="addMessageIncoming"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Message } from "~/types/Message.type";

// SCROLL INTO VIEW
const ul = ref();

function scrollToElement() {
	ul.value?.(false);
	let element = document.getElementById("chatList")
	element?.scrollIntoView(false)
}


const messages = ref<Message[]>([]);
let numberOfMessages: number = 0;

function addMessage(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: false };
	messages.value.push(newMessage);
	numberOfMessages++;
	
	setTimeout(() => {

		scrollToElement();
	}, 1000)
}

function addMessageIncoming(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: true };
	messages.value.push(newMessage);
	numberOfMessages++;
 // no se agrega si llega un mensaje nuevo
}
</script>

<template>
	<!-- contenedor del chat -->
	<div class="min-w-sm max-w-md bg-orange-200 h-96 overflow-y-auto">
		<!-- chat -->
		<ul class="flex flex-col p-2" :ref="ul" id="chatList">
			<!-- <ChatComponent :chat="messages" /> -->

			<IncomingMessage text="Hola que onda" />
			<SendingMessage class="self-end" text="nada todo bien" />
			<IncomingMessage text="que bueno, yo ando haciendo el testing" />
			<SendingMessage class="self-end" text="que padre!! Yo tambien ando probando cosas" />
			<SendingMessage class="self-end" text="quiero que funcione bien por eso" />
			<IncomingMessage text="si va a salir, hemos trabajado duro" />

			<template v-for="message in messages">
				<li v-if="message.isIncomingMessage">
					<IncomingMessage :text="message.text" />
				</li>

				<li v-else class="self-end">
					<SendingMessage :text="message.text" />
				</li>
			</template>
		</ul>
		<TypingBubble :is-typing="false" />
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
	let element = document.getElementById("chatList");
	element?.scrollIntoView({behavior: "smooth", block: "end"});
}

const messages = ref<Message[]>([]);
let numberOfMessages: number = 0;

function addMessage(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: false };
	messages.value.push(newMessage);
	numberOfMessages++;

	setTimeout(() => {
		scrollToElement();
	}, 100);
}

function addMessageIncoming(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: true };
	messages.value.push(newMessage);
	numberOfMessages++;

	setTimeout(() => {
		scrollToElement();
	}, 100);
}
</script>

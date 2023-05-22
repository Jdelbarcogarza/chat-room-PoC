<template>
	<!-- contenedor del chat -->
	<div class="min-w-sm max-w-md bg-orange-200 h-96 overflow-y-auto">
		<!-- chat -->
		<ul class="flex flex-col p-2" v-for="message in messages" ref="ul">
			<IncomingMessage :text="message.text" v-if="message.isIncomingMessage" />

			<SendingMessage v-else :text="message.text"/>
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
type Message = {
	text: string;
	isIncomingMessage: boolean;
};


// SCROLL INTO VIEW


const messages = ref<Message[]>([]);
let numberOfMessages: number = 0;

function addMessage(text: string) {
	console.log("se agrego", text);
	const newMessage: Message = { text: text, isIncomingMessage: false };
	messages.value.push(newMessage);
	numberOfMessages++;
}

function addMessageIncoming(text: string) {
	console.log("se agrego", text);
	const newMessage: Message = { text: text, isIncomingMessage: true };
	messages.value.push(newMessage);
	numberOfMessages++;

}
</script>

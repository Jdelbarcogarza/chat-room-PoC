<template>
	<!-- contenedor del chat -->
	<div class="min-w-sm max-w-md bg- white h-96 overflow-y-auto">
		<!-- chat -->
		<ul class="flex flex-col p-2" id="chatList">
			<!-- <ChatComponent :chat="messages" /> -->

			<IncomingMessage text="Hola que onda" />
			<SendingMessage class="self-end mt-2" text="nada todo bien" />
			<IncomingMessage
				class="mt-3"
				text="que bueno, yo ando haciendo el testing"
			/>
			<SendingMessage
				class="mt-3 self-end"
				text="que padre!! Yo tambien ando probando cosas"
			/>
			<SendingMessage
				class="self-end"
				text="quiero que funcione bien por eso"
			/>

			<!-- asi es como deben de ir acomodados el avatar y el mensaje -->
			<!-- <div class="flex">
				<BotAvatar class="relative top-5 right-2.5" />
				<IncomingMessage
					class="mt-2 -ml-3"
					text="si va a salir, hemos trabajado duro"
				/>
			</div> -->

			<template v-for="(message, index) in messages">
				<!-- si es el ultimo mensaje del bot, poner ahi su avatar -->
				<li class="max-w-[80%]" v-if="message.isIncomingMessage && lastBotMessageIndex === index">
					<div class="flex">

						<BotAvatar class="relative top-5 right-2.5" />
						<IncomingMessage
						class="mt-2 -ml-3"
						:text="message.text"
						/>
					</div>

				</li>

				<!-- si es un mensaje en medio de la conversación, solo desplegar eso  -->
				<li v-else-if="message.isIncomingMessage">
					<IncomingMessage class="ml-7" :text="message.text" />
				</li>
				
				<li v-else class="self-end max-w-[80%]">
					<!-- checar si mensaje anterior es del otro jugador para agregar margin adicional -->
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

/* TODO: Detectar cuando el último mensaje es del otro "jugador"
para agregar padding adicional. 

Mensajes continuos del mismo jugador tienen margin de mt-0.5.
Mensajes de jugador A y jugadorB tienen más margin.
*/

function scrollToElement() {
	let element = document.getElementById("chatList");
	element?.scrollIntoView({ behavior: "smooth", block: "end" });
}

const messages = ref<Message[]>([]);
const numberOfMessages = ref<number>(0);
const numberOfIncomingMessages = ref<number>(0);

const lastBotMessageIndex = ref<number>(0)


const isLastMessageMine = ref<boolean>(false);

function addMessage(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: false };
	messages.value.push(newMessage);
	numberOfMessages.value =  numberOfMessages.value + 1;

	setTimeout(() => {
		scrollToElement();
	}, 100);

	isLastMessageMine.value = false;
	console.log("last bot index", lastBotMessageIndex.value)


}

function addMessageIncoming(text: string) {
	const newMessage: Message = { text: text, isIncomingMessage: true };
	messages.value.push(newMessage);
	numberOfIncomingMessages.value = numberOfIncomingMessages.value + 1;

	lastBotMessageIndex.value = numberOfMessages.value + numberOfIncomingMessages.value - 1

	console.log("last bot index", lastBotMessageIndex.value)

	setTimeout(() => {
		scrollToElement();
	}, 100);

	isLastMessageMine.value = true;
}
</script>

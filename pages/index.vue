<template>
	<!-- contenedor del chat -->
	<div class="absolute inset-0 border min-w-sm max-w-3xl">
		<div class=" bg-white h-[90%] overflow-y-auto">
			<!-- chat -->
			<ul class="flex flex-col p-2" id="chatList">
				<!-- <IncomingMessage class="ml-7" text="Hola! Bienvenid@ a DmX" />
				<IncomingMessage class="ml-7" text="¿En qué podemos ayudarte?" />

				<SendingMessage
					class="self-end mt-2"
					text="Hola! Estoy buscando asesorarme en..."
				/>
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
				/> -->

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
					<li class="max-w-[80%]" v-if="message.isIncomingMessage">
						<div class="flex" v-if="lastBotMessageIndex === index">
							<BotAvatar class="relative top-3 right-2.5" />
							<IncomingMessage class="-ml-3" :text="message.text" />
						</div>

						<!-- si es un mensaje en medio de la conversación, solo desplegar eso  -->
						<IncomingMessage v-else class="ml-7" :text="message.text" />
					</li>

					<li
						v-else
						class="self-end max-w-[80%]"
						:class="{ 'pt-3': separateUserMessages(messages, index) }"
					>
						<!-- checar si mensaje anterior es del otro jugador para agregar margin adicional -->
						<SendingMessage :text="message.text" />
					</li>
				</template>
			</ul>
			<TypingBubble :is-typing="false" />
		</div>

		<!-- controls -->
		<div class="h-[10%]">
			<div class="h-full">
				<InputBox class="h-full" @send-message="addMessage" />

				<!-- input box para probar los incoming messages -->
				<!-- <InputBox
					class="max-w-md bg-red-400"
					@send-message="addMessageIncoming"
				/> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Message } from "~/types/Message.type";
import axios from "axios";

const config = useRuntimeConfig();

// cuando el chat inicia, se hace el query inicial
onMounted(async () => {
	const req = await axios.get(config.public.apiBase, {
		params: {
			Input: "Inicio_chat",
		},
	});

	addMessageIncoming(req.data.BotAns)
	console.log(req.data)
});

function scrollToElement() {
	let element = document.getElementById("chatList");
	element?.scrollIntoView({ behavior: "smooth", block: "end" });
}

const messages = ref<Message[]>([]);
const numberOfMessages = ref<number>(0);
const numberOfIncomingMessages = ref<number>(0);

const lastBotMessageIndex = ref<number>(0);

const isLastMessageMine = ref<boolean>(false);

const separateUserMessages = (messages: any, index: number): boolean => {
	// checar is no hay un elemento
	if (!messages[index - 1]) {
		return false;
	}

	// si no es un incoming message, no aplicar separación
	if (messages[index - 1].isIncomingMessage === false) {
		return false;
	}

	// si es un incoming message, sí aplicar separación
	if (messages[index - 1].isIncomingMessage === true) {
		return true;
	}

	return true;
};

async function addMessageIncoming(text: string) {



	const newMessage: Message = { text: text, isIncomingMessage: true };
	messages.value.push(newMessage);
	numberOfIncomingMessages.value = numberOfIncomingMessages.value + 1;

	lastBotMessageIndex.value =
		numberOfMessages.value + numberOfIncomingMessages.value - 1;

	console.log("last bot index", lastBotMessageIndex.value);

	setTimeout(() => {
		scrollToElement();
	}, 100);

	isLastMessageMine.value = true;
}

/**
 * 
 * @param text El texto que puso el usuario en el text box
 */
async function addMessage(text: string) {

 // make request. La respuesta es la respuesta del bot
 const req = await axios
		.get(config.public.apiBase, {
			params: {
				Input: text,
			},
		})

	const newMessage: Message = { text: text, isIncomingMessage: false };
	messages.value.push(newMessage);
	numberOfMessages.value = numberOfMessages.value + 1;

	setTimeout(() => {
		scrollToElement();
	}, 100);

	isLastMessageMine.value = false;
	console.log("last bot index", lastBotMessageIndex.value);


	// get response from API
	addMessageIncoming(req.data.BotAns)

}


</script>

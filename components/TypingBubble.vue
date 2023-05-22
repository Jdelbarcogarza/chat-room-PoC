<template>
	<div class="flex space-x-1 bg-white w-fit h-fit p-2 pt-2 rounded-full">
		<div
			class="bg-gray-300 w-2 h-2 rounded-full animate-bounce blue-circle"
		></div>
		<div
			class="bg-gray-300 w-2 h-2 rounded-full animate-bounce green-circle"
		></div>
		<div
			class="bg-gray-300 w-2 h-2 rounded-full animate-bounce red-circle"
		></div>
	</div>
</template>


<style>
	.blue-circle{
		animation-delay: 0.1s;
	}
	.green-circle{
		animation-delay: 0.2s;
	}
	.red-circle{
		animation-delay: 0.3s;
	}</style>
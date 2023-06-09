// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["~/assets/css/main.css"],
	modules: ["nuxt-icon"],
	plugins: ["~/plugins/autoAnimatePlugin.ts"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	
	runtimeConfig: {
		public: {
			apiBase: process.env.BASE_CHAT_API,
		},
	},
});

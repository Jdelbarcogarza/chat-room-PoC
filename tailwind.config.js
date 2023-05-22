/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {

      colors: {
        "incomingMsgGreen": "#18253E",
        "sendingMsgGray": "#63a532"
      }
    }
  },


  plugins: [],
}


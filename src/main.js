import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    icons: {

        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi,
        },
    },
    components,
    directives,
})

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')

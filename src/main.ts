import { container } from '@/infrastructure/ioc/container'
import { router } from '@ui/router'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(router)
app.use(vuetify)

// Injection de dépendances
app.provide('container', container)

app.mount('#app')
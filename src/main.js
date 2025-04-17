import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import piniaPersistedstate from "pinia-plugin-persistedstate";
import "./reset.css";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount("#app");

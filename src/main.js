import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./reset.css";
import "./style.css";
import "./fullcalendar.css";

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");

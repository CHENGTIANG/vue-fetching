import Vue from 'vue';
import App from "./App.vue";

import Fetched from "../dist/index";
Vue.component("Fetched", Fetched);

new Vue({
    render: (h) => h(App),
  }).$mount('#app');
  
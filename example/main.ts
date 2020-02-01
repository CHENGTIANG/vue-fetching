import Vue from 'vue';
import App from "./App.vue";

import Fetched from "../dist/index";
import LoadingComponent from './Loading.vue';
import ErrorComponent from './Error.vue';
// Vue.component("Fetched", Fetched);

Vue.component("Fetched", Fetched.extend({
  props: {
    loadingComponent: {
      default: () => LoadingComponent,
    },
    errorComponent: {
      default: () => ErrorComponent
    }
  }
}))

// Vue.component("Loading", LoadingComponent);
// Vue.component("Fetched", Fetched.extend({
//   props: {
//     loadingComponent: {
//       default: 'Loading'
//     },
//     errorComponent: {
//       default: () => ErrorComponent
//     }
//   }
// }))


new Vue({
  render: (h) => h(App),
}).$mount('#app');

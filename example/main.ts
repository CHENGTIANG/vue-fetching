import Vue from 'vue';
import App from "./App.vue";

import Fetching from "../src";
import LoadingComponent from './Loading.vue';
import ErrorComponent from './Error.vue';
// Vue.component("Fetching", Fetching);

Vue.component("Fetching", Fetching.extend({
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
// Vue.component("Fetching", Fetching.extend({
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

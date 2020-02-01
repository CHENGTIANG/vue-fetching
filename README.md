## Installation

```bash
npm install vue-fetched
# or
yarn add vue-fetched
```


## Usage

Import the component to use it

```js
import Fetched from 'vue-fetched';

Vue.component('Fetched', Fetched);
```


Globally set the default `loadingComponent` and `errorComponent` component

```js
import Fetched from 'vue-fetched';
import LoadingComponent from 'path/to/Loading.vue';
import ErrorComponent from 'path/to/Error.vue';

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
```


### Using `loading`, `default` and `error` slots

```vue
<template>
  <Fetched :fetch="fetchUser">
    <!-- The default scoped slot will be used as the result -->
    <template v-slot="{data: user}">
      <div>Name: {{user.name}}</div>
      <div>Age: {{user.age}}</div>
    </template>  
    <!-- Use the "loading" slot to display a loading message -->
    <template v-slot:loading>
      <p>Loading...</p>
    </template>  
    <!-- The "error" scoped slot will be used if there is an error -->
    <template v-slot:error="{error, retry}">
      <p>
        Error: {{ error }}
        <button @click="retry">Retry</button>
      </p>
    </template>
  </Fetched>
</template>

<script>
export default {
  methods: {
    async fetchUser() {
      return await fetch('/user');
    }
  }
};
</script>
```


### Using one single `combined` slot

```vue
<template>
  <Fetched :fetch="fetchUser">
    <template v-slot:combined="{ loading, data, error, retry }">
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">
        Error: {{ error }}
        <button @click="retry">Retry</button>
      </p>
      <div v-else>
        <div>Name: {{data.name}}</div>
        <div>Age: {{data.age}}</div>
      </div>
    </template>
  </Fetched>
</template>
<script>
const responseData = {
  name: "Grant",
  age: 22
};
export default {
  methods: {
    fetchUser() {
      return new Promise((resolve, reject) => {
        const isSuccess = Math.random() < 0.5;
        setTimeout(
          isSuccess
            ? resolve.bind(this, responseData)
            : reject.bind(this, "fetch error."),
          1000
        );
      });
    }
  }
};
</script>
```

<template>
  <div>
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

    <br />
    <br />
    <br />

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
  </div>
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
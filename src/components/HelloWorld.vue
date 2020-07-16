<template>
  <div>
    <button @click.prevent="login">Login</button>
    <button @click.prevent="getGroups">Get Groups</button>
    <br />
    <h2>You are <span v-if="!loggedIn">not</span> logged in</h2>
    <ul>
      <li v-for="group in groups" :key="group.id">
        {{group.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import AuthService from '../services/authService';

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      loggedIn: false,
      groups: []
    }
  },
  created() {
    this.authService = new AuthService();
  },
  methods: {
    getGroups: async function() {
      this.groups = await this.authService.getGroups();
    },
    login: async function() {
      await this.authService.login();
      this.loggedIn = true;
    }
  }
}
</script>
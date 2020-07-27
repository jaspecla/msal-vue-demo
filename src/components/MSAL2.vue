<template>
  <div>
    <div><h1>MSAL 2</h1></div>
    <div><h3>OAuth 2.0 Auth Code Flow with PKCE</h3></div>
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
import AuthService from '../services/msal2-authService';

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
      try {
        await this.authService.login();
        this.loggedIn = true;
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
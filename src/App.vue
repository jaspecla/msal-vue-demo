<template>
  <div id="app">
    <img height="100px" alt="Azure Active Directory logo" src="./assets/AD.svg">
    <div>
    <span class="menu-link"><router-link to="/msal1">MSAL 1</router-link></span>
    <span class="menu-link"><router-link to="/msal2">MSAL 2 </router-link></span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.menu-link {
  padding: 10px;
}
</style>

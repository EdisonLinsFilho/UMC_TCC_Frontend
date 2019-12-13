<template>
  <div id="app">
   
    <link rel="icon" href="./src/assets/LogoBMin.png" type="image/x-icon" />
  <link rel="shortcut icon" href="./src/assets/LogoBMin.png" type="image/x-icon" />
    <div class="container loginscreen page-body" v-if="!isLogged">
      <log-in :logon="isLogged" @logIn="isLogged = $event" @logInid="loggedID = $event" @loggedAccess="logged = $event"></log-in>
    </div>
    <div class="pageApp" v-if="isLogged">
      <div class="topbar">
        <top-bar :logoff="isLogged" :passid="loggedID" @logOff="isLogged = $event"></top-bar>
      </div>
      <div class="container page-body">
        <router-view ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "./components/shared/topBar/TopBar.vue";
import Login from "./components/pages/login/LoginPage.vue";

export default {
  components: {
    "top-bar": TopBar,
    "log-in": Login,    
  },

  name: "app",
  data() {
    return {
      isLogged: 0,
      loggedID: 0,
      loggedAccess0: "",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400");

body {
  font-family: "Roboto", sans-serif;
  background: #f3f4f7;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10003;
}

.page-body {
  margin: 10px auto 10px auto;
  padding: 10px auto 5px auto;
  background: white;
  border-radius: 4px;
}
</style>

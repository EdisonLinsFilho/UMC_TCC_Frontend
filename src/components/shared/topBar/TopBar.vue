<template>
  <div class="container-fluid">
    <!--Topbar-->
    <div class="topbar">
      <div class="navbar navi-top">
        <div class="navbar-logo">
          <router-link to="/">
            <button class="btn mylogo" data-toggle="tooltip" data-placement="right" title="Home">
              <img class="img-logo" src="../../../assets/logoUMC.png" alt="logo" style="width:60px;">
              <i class="material-icons home-icon">home</i>
            </button>
          </router-link>
        </div>

        <div class="navbar navi-right" style="padding: 0 10px 0 0;">
          <div class="user-icon dropdown dropleft">
            <button class="btn mylogo icon-img" data-toggle="dropdown">
              <img class="user-img" src="../../../assets/my-account.png">
            </button>

            <div class="dropdown-menu">
              <router-link :to="'/userme/' + passid">
                <div class="dropdown-item">Minha conta</div>
              </router-link>
              <div class="dropdown-item dropdown-header cursor" @click="logoff();">Logoff</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <!--Navegação azul-->
      <div class="navbar navbar-expand-sm navi-menu">
        <div class="btn-group" style="margin:0 auto;">
          <router-link to="/agenda">
            <button class="btn btn-light btn-mennu">Agenda</button>
          </router-link>
          <router-link to="/usuario">
            <button v-if="this.isCoordenador == true" class="btn btn-light btn-mennu">Usuarios</button>
          </router-link>
          <router-link to="/materials">
            <button class="btn btn-light btn-mennu">Material</button>
          </router-link>
          <div class="dropdown" v-if="this.isCoordenador == true">
            <router-link to="/relatorio">
              <button class="btn btn-light btn-mennu dropdown-item">Relatório</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    passid: Number
  },
  data(){
    return{
      loggedoff: this.logoff,
      isProfessor: "",
      isMonitor: "",
      isCoordenador: ""
    }
  },

  methods: {
    logoff() {
      this.loggedoff = 0;
      this.$emit("logOff", this.loggedoff);

      localStorage.clear();
    }
  },
  created() {
    const acesso = localStorage.getItem('loggedAccess')

    if(acesso == 'COORDENADOR'){
      this.isCoordenador = true;
      this.isMonitor = false;
      this.isProfessor = false;
    } else if(acesso == 'MONITOR') {
      this.isCoordenador = false;
      this.isMonitor = true;
      this.isProfessor = false;
    } else {
      this.isCoordenador = false;
      this.isMonitor = false;
      this.isProfessor = true;
    }
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 0;
}

.topbar {
  /* background-image: url(../../../assets/dark-triangles.png); */
  background-color: #ffffff;
  height: 45px;
}

.navi-top {
  padding: 0;
  height: 40px;
}

.navbar-logo {
  padding: 10px;
  width: 40px;
  height: 40px;
  padding: 6.5px 10px;
}

.mylogo {
  opacity: 0.9;
  border: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0);
}

.btn:hover {
  opacity: 1;
}

.img-logo {
  position: relative;
  vertical-align: middle;
}

.home-icon {
  font-size: 18px;
  color: #22528A !important;
  position: relative;
  vertical-align: middle;
}

.navi-menu {
  background-image: url(../../../assets/dark-triangles.png) !important;
  background: #22528A;
  padding: 0;
}

.btn-mennu {
  background-image: url(../../../assets/dark-triangles.png) !important;
  background: #22528A;
  border: none;
  outline: none;
  outline-color: transparent;
  color: #f0f2f5;
}
.btn-mennu:focus,
.btn-mennu:hover {
  background-image: url(../../../assets/dark-triangles.png) !important;
  color: #f0f2f5;
  background: #22528A;
  box-shadow: inherit;
}

.dropdown-menu {
  background-image: url(../../../assets/dark-triangles.png);
  background-color: #22528A;
}
.dropdown-toggle {
  background-color: #22528A;
}
.searchbar-top{
  padding: 0 10px 0 0;
}
.searchbar-top i {
  vertical-align: middle;
}

.searchbar-top input {
  border: none;
  border-bottom: 1.1px solid black !important;
  color: #22528A;
  background: none;
}

.user-icon {
  max-height: 33px;
  max-width: 33px;
}
.user-img {
  height: 33px;
  max-width: 33px;
  border-radius: 50%;
}

.dropdown-item {
  color: #f0f2f5;
}

.dropdown-item:hover {
  background: #1f476e;
  box-shadow: inherit;
}
.cursor{
  cursor: pointer;
}
</style>

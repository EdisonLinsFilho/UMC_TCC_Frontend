<template>
  <div>
    <!-- Tabs -->
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#search-material">Procurar Material</a>
      </li>
      <li class="nav-item">
        <a v-if="this.isProfessor == false" class="nav-link" data-toggle="pill" href="#new-material">Cadastrar Material</a>
      </li>
    </ul>
    <!-- Panels -->
    <div class="tab-content">
      <div id="search-material" class="container tab-pane active">
        <br />
        <search-material></search-material>
      </div>
      <div id="new-material" class="container tab-pane fade">
        <br />
        <new-material></new-material>
      </div>
    </div>
  </div>
</template>

<script>
import NewMaterial from "./NewMaterial.vue"
import SearchMaterial from "./SearchMaterial.vue"
export default {
  data() {
    return {
      isProfessor: "",
      isMonitor: "",
    };
  },
  components: {
     "new-material": NewMaterial,
     "search-material": SearchMaterial
  },
  created() {
    const acesso = localStorage.getItem('loggedAccess')

    if(acesso == 'COORDENADOR'){
      this.isMonitor = false;
      this.isProfessor = false;
    } else if(acesso == 'MONITOR') {
      this.isMonitor = true;
      this.isProfessor = false;
    } else {
      this.isMonitor = false;
      this.isProfessor = true;
    }
  }
};
</script>

<style>
.clientinput {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  background: none;
  vertical-align: middle;
  float: right;
}
</style>

<template>
  <div class="row">
    <div class="col-12">
      <!-- Pilss -->
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link item-mod active" data-toggle="pill" href="#consulta-agenda">Consulta Atividade</a>
        </li>
        <li class="nav-item">
          <a v-if="this.isMonitor == false" class="nav-link item-mod" data-toggle="pill" href="#nova-agenda">Nova Atividade</a>
        </li> 
      </ul>
      <!-- conteudo dos pills -->
      <div class="tab-content">
        <div id="consulta-agenda" class="container tab-pane active">
          <br>
            <minha-consulta-agenda></minha-consulta-agenda>
        </div>
        <div id="nova-agenda" class="container tab-pane fade">
          <br>
            <minha-nova-agenda></minha-nova-agenda>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NovaAgenda from "./NovaAgenda.vue";
import ConsultaAgenda from "./ConsultaAgenda.vue";

export default {
  data() {
    return {
      isProfessor: "",
      isMonitor: "",
    };
  },
  components: {
    'minha-nova-agenda' : NovaAgenda,
    'minha-consulta-agenda' : ConsultaAgenda,
    
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
</style>

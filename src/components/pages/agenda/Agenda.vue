<template>
  <div class="row">
    <div class="col-12">
      <!-- Pilss -->
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link item-mod" data-toggle="pill" href="#nova-agenda">Nova Atividade</a>
        </li>
        <li class="nav-item">
          <a class="nav-link item-mod" data-toggle="pill" href="#consulta-agenda">Consulta Atividade</a>
        </li>
      </ul>
      <!-- conteudo dos pills -->
      <div class="tab-content">
        <div id="nova-agenda" class="container tab-pane fade">
          <br>
            <minha-nova-agenda></minha-nova-agenda>
        </div>
        <div id="consulta-agenda" class="container tab-pane fade">
          <br>
            <minha-consulta-agenda></minha-consulta-agenda>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NovaAgenda from "./NovaAgenda.vue";
import ConsultaAgenda from "./ConsultaAgenda.vue";

export default {
  components: {
    'minha-nova-agenda' : NovaAgenda,
    'minha-consulta-agenda' : ConsultaAgenda,
    
  }
};
</script>

<style>
</style>

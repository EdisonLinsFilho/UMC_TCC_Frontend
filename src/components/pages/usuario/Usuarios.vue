<template>
  <div class="row">
    <div class="col-12">
      <!-- Pilss -->
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link item-mod active" data-toggle="pill" href="#consulta-usuario">Consulta Usuario</a>
        </li>
        <li class="nav-item">
          <a class="nav-link item-mod" data-toggle="pill" href="#novo-usuario">Cadastrar Usuario</a>
        </li>
      </ul>
      <!-- conteudo dos pills -->
      <div class="tab-content">
        
        <div id="consulta-usuario" class="container tab-pane active">
          <br>
            <meu-consulta-usuairo></meu-consulta-usuairo>
        </div>

        <div id="novo-usuario" class="container tab-pane fade">
          <br>
            <meu-novo-usuario></meu-novo-usuario>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ConsultaUsuario from "./ConsultaUsuario.vue";
import NovoUsuario from "./NovoUsuario.vue";
export default {
  components: {
    'meu-novo-usuario' : NovoUsuario,
    'meu-consulta-usuairo' : ConsultaUsuario,
  }
}

</script>

<style>
</style>

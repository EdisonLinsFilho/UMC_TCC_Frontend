<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div class="row">
      <div class="form-group col-md-2">
        <label for="campoUm">Campo Um</label>
        <input
          type="text"
          v-model="campoUm"
          required="required"
          class="form-control"
          placeholder="Digitando********"
          id="campos"
        />
      </div>
      <div class="form-group col-md-2">
        <label for="campoDois">Campo Dois</label>
        <input
          type="text"
          v-model="campoDois"
          required="required"
          class="form-control"
          placeholder="Digite........"
          id="campos"
        />
      </div>
      <div class="form-group col-md-4">
        <label for="campoTres">Campo Três</label>
        <input
          type="text"
          v-model="campoTres"
          required="required"
          class="form-control"
          placeholder="Digitando........"
          id="campos"
        />
      </div>
      <div class="form-group col-md-4">
        <label for="campos">
          <br />
        </label>
        <br />
        <button type="button" class="btn btn-primary md-4" @click="procurarRelatorio()">Pesquisar</button>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
i {
  color: #365c7b;
}
i:hover {
  color: var(--birorange);
}
.open {
  background-color: greenyellow;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.edit {
  background-color: blue;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.delete {
  background-color: red;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.btnTable {
  height: 20px;
  width: 20px;
}
.fullLine {
  align-self: center;
  width: 297px;
}
</style>
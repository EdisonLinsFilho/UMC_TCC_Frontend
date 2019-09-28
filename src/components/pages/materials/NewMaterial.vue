<template>
  <div class="container-fluid">
    <div class="row">
      <div class="form-group col-md-4">
        <label for="campo1">Descrição* </label>
        <input type="text" v-model="descricao" required="required" class="form-control" id="descricao">
      </div>
      <div class="form-group col-md-4">
        <label for="campo2">Campo Dois </label>
        <input type="text" class="form-control" id="campo2">
      </div>
      <div class="form-group col-md-4">
        <label for="campo3">Campo Três </label>
        <input type="text" class="form-control" id="campo3">
      </div>
    </div>
  
    <div class="row">
      <div class="form-group col-md-3">
        <label for="campo4">Campo Quatro </label>
        <input type="text" class="form-control" id="campo4">
      </div>
      <div class="form-group col-md-3">
        <label for="campo5">Campo Cinco </label>
        <input type="text" class="form-control" id="campo5">
      </div>
      <div class="form-group col-md-3">
        <label for="campo6">Campo Seis </label>
        <input type="text" class="form-control" id="campo6">
      </div>
     <div class="form-group col-md-3">
        <label for="campo7">Campo Sete </label>
        <input type="text" class="form-control" id="campo7">
      </div>
      <div class="form-group col-md-6">
        <label for="campo8">Campo Oito</label>
        <input type="text" class="form-control" id="campo8">
      </div>
      <div class="form-group col-md-6">
        <label for="campo6">Campo Nove</label>
        <input type="text" class="form-control" id="campo9">
      </div>
      
      <div class="form-group col-md-3">
        <label for="campo10">Campo Dez</label>
        <input type="text" class="form-control" id="campo10">
      </div>
      <div class="form-group col-md-3">
        <label for="campo11">Campo Onze</label>
        <input type="text" class="form-control" id="campo11">
      </div>
      <div class="form-group col-md-3">
        <label for="campo12">Campo Doze</label>
        <input type="text" class="form-control" id="campo12">
      </div>
     <div class="form-group col-md-3">
        <label for="campo13">Campo Treze</label>
        <input type="text" class="form-control" id="campo13">
      </div>
      <div class="form-group col-md-6">
        <label for="campo14">Campo Quatorze</label>
        <input type="text" class="form-control" id="campo14">
      </div>
      <div class="form-group col-md-6">
        <label for="campo15">Campo Quinze</label>
        <input type="text"  class="form-control" id="campo15">
      </div>
    </div>
    <hr />
    
    <div id="actions" class="row">
      <div class="col-md-12">
        <button type="submit" @click="checkForm()" class="btn btn-primary">Salvar</button>
        <button @click="resetFields()" class="btn btn-default">Limpar</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data( ) {
    return {
    descricao: ""
    };
  },
  methods: {
   checkForm: () =>{
      if (this.descricao == "") {
        alert('A Descrição é obrigatório.');
      }
    },
    resetFields: () =>{
      this.descricao = "";
    }
  }
};
</script>
<style>
.sour-tar {
  background-color: #e9ecef;
  color: #6b757d;
  border: solid 1px #ced4da;
}
</style>

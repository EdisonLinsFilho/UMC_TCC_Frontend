<template>
  <div class="container-fluid">
    <div class="row">
      <div class="form-group col-md-6">
        <label for="material">Material</label>
        <font color="red">*</font>
        <input
          type="text"
          v-model="material"
          required="required"
          class="form-control"
          placeholder="Digite o nome do Material"
          id="material"
        />
      </div>

      <div class="form-group col-md-4">
        <label for="classe.material">Classe Material</label>
        <font color="red">*</font>
        <select type="text" class="form-control" id="classe.material">
          <option disabled selected>Selecione uma opção...</option>
          <option value="ci">Ciência</option>
          <option value="co">Consumo</option>
          <option value="ds">Desenvolvimento Cognitivo</option>
          <option value="ed">Educação Especial</option>
          <option value="ef">Educação Física</option>
          <option value="lp">Língua Portuguesa</option>
          <option value="ma">Matemática</option>
          <option value="ns">Natureza e Sociedade</option>
          <option value="ou">Outros</option>
        </select>
      </div>

      <div class="form-group col-md-10">
        <label for="descricao.material">Descrição do Material</label>
        <textarea class="form-control" id="descricao.material" rows="3"></textarea>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-3">
        <label for="categoria.material">Categoria Material</label>
        <font color="red">*</font>
        <select class="custom-select my-1 mr-sm-2" id="categoria.material">
          <option disabled selected>Selecione uma opção...</option>
          <option value="co">Consumíveis</option>
          <option value="du">Duráveis</option>
          <option value="do">Dourado</option>
          <option value="ou">Outros</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label for="embalagem.material">Embalagem Material</label>
        <font color="red">*</font>
        <select class="custom-select my-1 mr-sm-2" id="embalagem.material">
          <option disabled selected>Selecione uma opção...</option>
          <option value="ca">Caixa</option>
          <option value="me">Metro</option>
          <option value="pa">Pacote</option>
          <option value="un">Unidade</option>
          <option value="ou">Outros</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="quantidade">Quantidade</label>
        <font color="red">*</font>
        <input type="text" class="form-control" id="quantidade" />
      </div>
      <div class="row">
        
        <div  class="form-group col-md-4">
          <label for="local.estoque">Local De Estoque</label>
          <input type="text" class="form-control" id="local.estoque" />
        </div>
        <div class="form-group col-md-6">
          <label for="campo6">campo seis</label>
          <input type="text" class="form-control" id="campo6" />
        </div>
        <div class="form-group col-md-3">
          <label for="campo6">Campo Nove</label>
          <input type="text" class="form-control" id="campo9" />
        </div>

        <div class="form-group col-md-3">
          <label for="campo10">Campo Dez</label>
          <input type="text" class="form-control" id="campo10" />
        </div>
      </div>
    </div>
    <hr />

    <div id="actions" class="row">
      <div class="col-md-4">
        <button type="submit" @click="checkForm()" class="btn btn-primary">Salvar</button>
        <button @click="resetFields()" class="btn btn-link fullLine">Limpar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      material: ""
    };
  },
  methods: {
    checkform: () => {
      //if (this.material ==" ") {
      this.material = " ";
      alert("A Descrição é obrigatório.");
      //}
    },
    resetFields: () => {
      this.material == "";
      alert("kkkkk");
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

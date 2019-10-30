<template>
  <div class="container-fluid">
    <div class="row">
      <div class="form-group col-md-6">
        <label >Material</label>
        <font color="red">*</font>
        <input
          type="text"
          v-model="cadastro.material"
          required="required"
          class="form-control"
          placeholder="Digite o nome do Material"
          id="material"
        />
      </div>

      <div class="form-group col-md-4">
        <label >Classe Material</label>
        <font color="red">*</font>
        <select
          type="text"
          class="form-control"
          v-model="cadastro.classeMaterial"
          id="classe.material"
        >
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
        <label >Descrição do Material</label>
        <textarea
          class="form-control"
          id="descricao.material"
          v-model="cadastro.descricaoMaterial"
          rows="3"
        ></textarea>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-3">
        <label >Categoria Material</label>
        <font color="red">*</font>
        <select
          class="custom-select my-1 mr-sm-2"
          v-model="cadastro.categoriaMaterial"
          id="categoria.material"
        >
          <option disabled selected>Selecione uma opção...</option>
          <option value="co">Consumíveis</option>
          <option value="du">Duráveis</option>
          <option value="do">Dourado</option>
          <option value="ou">Outros</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label >Embalagem Material</label>
        <font color="red">*</font>
        <select
          class="custom-select my-1 mr-sm-2"
          v-model="cadastro.embalagemMaterial"
          id="embalagem.material"
        >
          <option disabled selected>Selecione uma opção...</option>
          <option value="ca">Caixa</option>
          <option value="me">Metro</option>
          <option value="pa">Pacote</option>
          <option value="un">Unidade</option>
          <option value="ou">Outros</option>
        </select>
      </div>
      <div class="row">
        <div class="form-group col-md-3">
          <label for="quantidade">Quantidade</label>
          <font color="red">*</font>
          <input
            type="text"
            v-mask="'#####'"
            v-model="cadastro.quantidade"
            class="form-control"
            placeholder="Ex: 20"
          />
        </div>
        <div class="form-group col-md-4">
          <label >Quantidade Minima</label>
          <font color="red">*</font>
          <input
            type="text"
            v-mask="'#####'"
            v-model="cadastro.quantidadeMinima"
            class="form-control"
            placeholder="Ex: 20"
          />
        </div>
        <div class="form-group col-md-4">
          <label >Data Lançamento</label>
          <input
            type="text"
            v-mask="'##/##/####'"
            placeholder
            class="form-control"
            v-model="cadastro.dataLancamento"
            id="data.lancamento"
            
          />
        </div>
      </div>
    </div>
    <hr />

    <div id="actions" class="row">
      <div class="col-md-4">
        <button type="submit" @click="checkForm()" class="btn btn-primary">Salvar</button>
        <button type="button" class="btn btn-link" @click="resetFields()">Limpar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    resetFields() {
      (this.cadastro.material = ""),
        (this.cadastro.classeMaterial = ""),
        (this.cadastro.descricaoMaterial = ""),
        (this.cadastro.categoriaMaterial = ""),
        (this.cadastro.embalagemMaterial = ""),
        (this.cadastro.quantidade = ""),
        (this.cadastro.dataLancamento = "");
    }
  },
  data() {
    return {
      cadastro: {
        material: "",
        classeMaterial: "",
        descricaoMaterial: "",
        categoriaMaterial: "",
        embalagemMaterial: "",
        quantidade: "",
        dataLancamento: ""
      }
    };
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

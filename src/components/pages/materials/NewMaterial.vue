<template>
  <div class="container-fluid">
    <div class="row">
      <div class="form-group col-md-6">
        <label>Material</label>
        <font color="red">*</font>
        <input
          type="text"
          maxlength="40"
          v-model="cadastro.nome"
          required="required"
          class="form-control"
          placeholder="Digite o nome do Material"
          id="material"
        />
      </div>

      <div class="form-group col-md-6">

        <label>Classe Material</label>
        <font color="red">*</font>
        <select type="text" class="form-control" v-model="cadastro.classe" id="classe.material">
          <option disabled selected>Selecione uma opção...</option>
          <option value="CIENCIA">Ciência</option>
          <option value="DESENVOLVIMENTO_COGNITIVO">Desenvolvimento Cognitivo</option>
          <option value="EDUCACAO_FISICA">Educação Física</option>
          <option value="LINGUA_PORTUGUESA">Língua Portuguesa</option>
          <option value="MATEMATICA">Matemática</option>
          <option value="NATUREZA_E_SOCIEDADE">Natureza e Sociedade</option>
          <option value="OUTROS">Outros</option>
        </select>
      </div>

      <div class="form-group col-md-12">
        <label>Descrição do Material</label>
        <font color="red">*</font>
        <textarea
          maxlength="100"
          class="form-control"
          id="descricao.material"
          v-model="cadastro.descricao"
          rows="3"
        ></textarea>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-6">
        <label>Categoria Material</label>
        <font color="red">*</font>
        <select
          class="custom-select my-1 mr-sm-2"
          v-model="cadastro.categoria"
          id="categoria.material"
        >
          <option disabled selected>Selecione uma opção...</option>
          <option value="CONSUMIVEL">Consumível</option>
          <option value="DURAVEL">Duráveis</option>
          <option value="OUTROS">Outros</option>
        </select>
      </div>
      <div class="form-group col-md-6">

        <label >Embalagem Material</label>
        <font color="red">*</font>
        <select
          class="custom-select my-1 mr-sm-2"
          v-model="cadastro.embalagem"
          id="embalagem.material"
        >
          <option disabled selected>Selecione uma opção...</option>
          <option value="CAIXA">Caixa</option>
          <option value="METRO">Metro</option>
          <option value="PACOTE">Pacote</option>
          <option value="UNIDADE">Unidade</option>
          <option value="OUTROS">Outros</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="quantidade">Quantidade</label>
        <font color="red">*</font>
        <input
          type="text"
          v-mask="'######'"
          v-model="cadastro.quantidade"
          class="form-control"
          placeholder="Ex: 20"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="quantidadeMinima">Quantidade Minima</label>
        <font color="red">*</font>
        <input
          type="text"
          v-mask="'######'"
          v-model="cadastro.quantidadeMinima"
          class="form-control"
          placeholder="Ex: 20"
        />
      </div>
    </div>
    <div id="actions" class="row">
      <div class="col-md-4">
        <button type="submit" @click="validaCampos()" class="btn btn-primary btn-umc">Salvar</button>
        <button type="button" class="btn btn-link" @click="resetFields()">Limpar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    resetFields() {
      (this.cadastro.nome = ""),
        (this.cadastro.classe = ""),
        (this.cadastro.descricao = ""),
        (this.cadastro.categoria = ""),
        (this.cadastro.embalagem = ""),
        (this.cadastro.quantidade = ""),
        (this.cadastro.quantidadeMinima = ""),
        (this.cadastro.dataLancamento = ""),
        (this.releaseDate = "");
    },
    validaCampos() {
      if (this.cadastro.nome == "") {
        alert("Preenchimento do Material é obrigatorio");
        return;
      }
      if (this.cadastro.classe == "") {
        alert("Preenchimento da Classe é obrigatorio");
        return;
      }
      if (this.cadastro.descricao == "") {
        alert("Preenchimento da descrição é obrigatorio");
        return;
      }
      if (this.cadastro.categoria == "") {
        alert("Preenchimento da Categoria é obrigatorio");
        return;
      }
      if (this.cadastro.embalagem == "") {
        alert("Preenchimento da Embalagem é obrigatorio");
        return;
      }
      if (this.cadastro.quantidade == "") {
        alert("Preenchimento da Quantidade é obrigatorio");
        return;
      }
      if (this.cadastro.quantidadeMinima == "") {
        alert("Preenchimento da Quantidade Minima é obrigatorio");
        return;
      }
      this.$http
        .post("http://localhost:8080/api/v1/material", this.cadastro)
        .then(
          function(data) {
            this.resetFields();
            alert("Material salvo !");
            this.agenda = data.body;
            localStorage.setItem('novoMaterial', 1);
          },
          error => {
            alert("Material não salvo !");
            console.log(error.data);
          }
        );
    }
  },
  data() {
    return {
      releaseDate: "",
      cadastro: {
        nome: "",
        classe: "",
        descricao: "",
        categoria: "",
        embalagem: "",
        status: 'ATIVO'
      }
    };
  },
}
</script>
<style>
.sour-tar {
  background-color: #e9ecef;
  color: #6b757d;
  border: solid 1px #ced4da;
}
</style>

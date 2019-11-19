<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div class="row">
      <div class="form-group col-md-8">
        <label>Nome Material</label>
        <input
          type="text"
          v-model="material"

          required="required"
          class="form-control"
          placeholder="Digite  Material"
          id="material"
        />
      </div>
      <div class="form-group col-md-4">
        <label>
          <br />
        </label>
        <br />
        <button type="button" class="btn btn-primary md-4" @click="procurarmaterial()">Pesquisar</button>
      </div>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Nome Material</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Classe Material</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Categoria Material</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Quantidade Estoque</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >&emsp;Ações</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Baixa</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Material 1</td>
          <td>Matematica</td>
          <td>Duradouro</td>
          <td>10</td>
          <td width="14%" align="Left">
            <div class="material-icons" style="cursor: pointer" @click="show()">
              search&ensp;
              <span></span>
              <i></i>
            </div>

            <div class="material-icons" style="cursor: pointer" @click="showEdit()">
              edit&ensp;
              <span></span>
              <i></i>
            </div>

            <span class="trash" @click="confirmDelete()">
              <span></span>
              <i></i>
            </span>
          </td>
          <td>
            <div
              class="material-icons"
              style="cursor: pointer"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              @click="confirmBaixa()"
            >
              &ensp;import_export
              <span></span>
              <i></i>
            </div>

          </td>
        </tr>
      </tbody>
    </table>
    <!-- Search results -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <!-- PopUp -->
    <modal name="allPageDisbled" height="auto">
      <br />
      <hr />
      <h4 class="modal-title">Visualização de material</h4>
      <hr />
      <div class="form-group col-md-12">
        <label>
          <h5>Nome</h5>
        </label>
        <input type="text" v-model="descricaoMaterial" class="form-control" disabled />
      </div>
      <div class="form-group col-md-12">
        <label>
          <h5>Classe</h5>
        </label>
        <input type="text" v-model="classeMaterial" class="form-control" disabled />
      </div>
      <div class="form-group col-md-12">
        <label>
          <h5>Categoria</h5>
        </label>
        <input type="text" v-model="categoriaMaterial" class="form-control" disabled />
      </div>
      <div class="form-group col-md-12">
        <label>
          <h5>Embalagem</h5>
        </label>
        <input type="text" v-model="embalagemMaterial" class="form-control" disabled />
      </div>
      <div class="form-group col-md-12">
        <label>
          <h5>Quantidade</h5>
        </label>
        <input type="text" v-mask="'#####'" v-model="quantidade" class="form-control" disabled />
      </div>
      <div class="form-group col-md-12">
        <label>
          <h5>Data</h5>
        </label>
        <input type="text" v-model="dataLancamento" class="form-control" disabled />
      </div>
    </modal>

    <modal name="allPageEdit" height="auto">
      <br />
      <hr />
      <h4 class="modal-title">Editar material</h4>
      <hr />
      <div class="modal-fade">
        <div class="form-group col-md-12">
          <label>
            <h5>Nome</h5>
          </label>
          <input type="text" v-model="descricaoMaterial" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>
            <h5>Classe</h5>
          </label>
          <input type="text" v-model="classeMaterial" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>
            <h5>Categoria</h5>
          </label>
          <input type="text" v-model="categoriaMaterial" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>
            <h5>Embalagem</h5>
          </label>
          <input type="text" v-model="embalagemMaterial" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>
            <h5>Quantidade</h5>
          </label>
          <input type="text" v-mask="'#####'" v-model="quantidade" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>
            <h5>Data</h5>
          </label>
          <input type="text" v-model="dataLancamento" class="form-control" />
        </div>
        <div align="center">
          <button type="button" class="btn btn-link fullLine" @click="clearModalEdit()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveEdit()">Salvar</button>
        </div>
      </div>
    </modal>

    <modal name="confirmDelete" height="auto">
      <br />
      <h4 class="modal-title">Deseja realmente excluir ?</h4>
      <div align="center">
        <br />
        <button type="button" class="btn btn-link fullLine" @click="hideDelete()">Cancelar</button>
        <button type="button" class="btn btn-primary fullLine" @click="saveDelete()">Sim</button>
      </div>
    </modal>
    <!--aqui a modal de Baixa-->
    <modal name="confirmBaixa" height="auto">
      <hr />
      <h4 class="modal-title">Baixa Material</h4>
      <hr />
      <br />
      <div class="row spaceLeft">
        <div class="form-group col-md-12">
          <label>
            <h5>Nome do material</h5>
          </label>
          <input type="text" v-model="descricaoMaterial" class="form-control" disabled />
        </div>
      </div>
      <div class="row spaceLeft">
        <div class="form-group col-md-5">
          <label>
            <h5>Quantidade em estoque</h5>
          </label>
         <input type="text" v-mask="'#####'" v-model="quantidade" class="form-control" disabled />
        </div>
        <div class="form-group col-md-7">
          <label>
            <h5>Entrada / Saida</h5>
          </label>
          <select type="text" class="form-control" v-model="solicitacao">
            <option value="ENTRADA" selected>Entrada</option>
            <option value="SAIDA">Saida</option>
          </select>
        </div>
      </div>
      <div class="row spaceLeft">
        <div class="form-group col-md-12">
          <label>
            <h5>Quantidade utilizada</h5>
          </label>
          <input type="text" v-model="quantidadeUtilizada" class="form-control" />
        </div>
      </div>
      <br />
      <div align="center">
        <button type="button" class="btn btn-success fullLine" @click="baixaMaterial()">Baixar</button>
        <button type="button" class="btn btn-primary fullLine" @click="saveBaixa()">Salvar</button>
      </div>
    </modal>

    <!-- PopUp -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      descricaoMaterial: "Material 1",
      classeMaterial: "Matematica",
      categoriaMaterial: "Duradouro",
      embalagemMaterial: "Embalagem 1",
      quantidade: "10",
      quantidadeUtilizada: "0",
      dataLancamento: "10/10/10 10:10",
      id: "",
      solicitacao: ""
    };
  },

  computed: {},

  mounted() {},

  created(){
    this.seachMaterial();
  },

  methods: {
    hideDelete() {
      this.$modal.hide("confirmDelete");
    },
    saveDelete() {
      //Enviar ID para BE para salvar
    },
    confirmDelete() {
      this.$modal.show("confirmDelete");
    },
    show() {
      this.isEdit = "true";
      this.$modal.show("allPageDisbled");
    },
    showEdit() {
      this.isEdit = "false";
      this.$modal.show("allPageEdit");

      //Recebendo os campos do BE
    },
    confirmBaixa() {
      this.$modal.show("confirmBaixa");
    },
    baixaMaterial() {
      if (this.solicitacao == "") {
        alert("Entrada / Saida é obrigatório !");
      } else if (
        this.solicitacao == "ENTRADA" &&
        this.quantidadeUtilizada != ""
      ) {
        var quantfinal =
          parseInt(this.quantidade) + parseInt(this.quantidadeUtilizada);
        this.quantidade = quantfinal;
        this.quantidadeUtilizada = "0";
      } else if (
        parseInt(this.quantidade) < parseInt(this.quantidadeUtilizada)
      ) {
        alert("Quantidade utilizada maior que quantidade do estoque");
      } else {
        this.quantidade -= this.quantidadeUtilizada;
        this.quantidadeUtilizada = "0";
      }
    },

    saveBaixa() {
      if (this.quantidade < 10) {
        alert("Quantidade do material em estoque, está abaixo da média");
      }
    }
  }
};
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
.show {
  cursor: pointer;
}
.material-icons:hover {
  color: red;
}
h4.modal-title {
  text-align: center;
}
.spaceLeft{
  padding-left: 15px;
  padding-right: 15px;
}
</style>

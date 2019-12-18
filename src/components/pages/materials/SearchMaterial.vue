<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div class="row">
      <div class="form-group col-md-10">
        <input
          type="text"
          v-model="nomeParaPesquisa"
          v-on:keyup="procuraMaterialFiltro()"
          class="form-control"
          placeholder="Digite o Nome do Material"
        />
      </div>
      <div class="form-group col-md-2">
        <button type="button" class="btn btn-primary md-4 btn-umc" @click="procurarMaterial()">Limpar</button>
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
            >Descrição Material</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Quantidade Minima</a>
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
          <th v-if="!acessoProfessor" scope="col">
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
        <tr v-for="(material ,i) in allMaterials" :key="i">
          <td>{{material.nome}}</td>
          <td>{{material.descricao}}</td>
          <td>{{material.quantidadeMinima}}</td>
          <td>{{material.quantidade}}</td>
          <td width="14%" align="Left">
            <div class="material-icons"  @click="show(material)">
              search&ensp;
              <span></span>
              <i></i>
            </div>

            <div v-if="!acessoProfessor" class="material-icons" style="cursor: pointer" @click="showEdit(material)">
              edit&ensp;
              <span></span>
              <i></i>
            </div>

            <span v-if="!acessoProfessor" class="trash" @click="confirmDelete(material)">
              <span></span>
              <i></i>
            </span>
          </td>
          <td>
            <div v-if="!acessoProfessor" class="material-icons" style="cursor: pointer" data-toggle="modal" data-target=".bd-example-modal-lg" @click="confirmBaixa(material)">
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
      <div class="modal-header">
        <h4>Resumo Material</h4>
      </div>
      <div class="borda">
        <div class="form-group col-md-12">
          <label>Descrição</label>
          <input type="text" v-model="material.descricao" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Classe</label>
          <input type="text" v-model="material.classe" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Categoria</label>
          <input type="text" v-model="material.categoria" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Embalagem</label>
          <input type="text" v-model="material.embalagem" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Quantidade</label>
          <input type="text" v-mask="'######'" v-model="material.quantidade" class="form-control" disabled />
        </div>
         <div class="form-group col-md-12">
          <label>Quantidade Minima</label>
          <input type="text" v-model="material.quantidadeMinima" class="form-control" disabled />
        </div>
      </div>
    </modal>

    <modal name="allPageEdit" height="auto"	>
      <div class="modal-header">
        <h4>Material</h4>
      </div>
      <div class="borda">
        <br/>
       <div class="form-group col-md-12">
          <label>Descrição</label>
          <input type="text" v-model="material.descricao" class="form-control"  />
        </div>
        <div class="form-group col-md-12">
          <label>Classe</label>
          <select type="text" class="form-control" v-model="material.classe" id="classe.material">
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
          <label>Categoria</label>
          <select
          class="custom-select my-1 mr-sm-2"
          v-model="material.categoria"
        >
          <option value="CONSUMIVEL">Consumíveis</option>
          <option value="DURAVEL">Duráveis</option>
          <option value="DOURADO">Dourado</option>
          <option value="OUTROS">Outros</option>
        </select>
        </div>
        <div class="form-group col-md-12">
          <label>Embalagem</label>
          <select
          class="custom-select my-1 mr-sm-2"
          v-model="material.embalagem"
        >
          <option value="CAIXA">Caixa</option>
          <option value="METRO">Metro</option>
          <option value="PACOTE">Pacote</option>
          <option value="UNIDADE">Unidade</option>
          <option value="OUTROS">Outros</option>
        </select>
        </div>
         <div class="form-group col-md-12">
          <label>Quantidade Minima</label>
          <input type="text" v-mask="'######'" v-model="material.quantidadeMinima" class="form-control"  />
        </div>
        <div align="center">
          <button type="button" class="btn btn-link fullLine"  @click="clearModalEdit()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveEdit()">Salvar</button>
        </div>    
      </div>
    </modal>

    <modal name="confirmDelete" height="auto">
      <div class="borda">
        <br />
        <p class="size" align="center">Deseja realmente excluir ?</p>
        <div align="center">
          <button type="button" class="btn btn-link btn-cancelar fullLine" @click="hideDelete()">Cancelar</button>
          <button type="button" class="btn btn-success fullLine" @click="saveDelete()">Sim</button>
        </div>
      </div>
    </modal>


    
    <!--aqui a modal de Baixa-->
    <modal name="confirmBaixa" height="auto">
      <div class="modal-header">
        <h4>Baixa em Material</h4>
      </div>
      <div class="borda">
        <div class="row spaceLeft">
          <div class="form-group col-md-12">
            <label>Nome do material</label>
            <input type="text" v-model="material.descricao" class="form-control" disabled />
          </div>
        </div>
        <div class="row spaceLeft">
          <div class="form-group col-md-5">
            <label>Quantidade em estoque</label>
          <input type="text" v-mask="'######'" v-model="material.quantidade" class="form-control" disabled />
          </div>
          <div class="form-group col-md-7">
            <label>Entrada / Saida</label>
            <select type="text" class="form-control" v-model="solicitacao">
              <option value="SAIDA">Saida</option>
              <option value="ENTRADA">Entrada</option>
            </select>
          </div>
        </div>
        <div class="row spaceLeft">
          <div class="form-group col-md-12">
            <label>Quantidade</label>
            <input type="text" v-mask="'######'" v-model="quantidadeUtilizada" class="form-control" />
          </div>
        </div>
        <br />
        <div align="center">
          <button type="button" class="btn btn-link fullLine" @click="hideBaixa()">Cancelar</button>
          <button type="button" class="btn btn-success fullLine " @click="baixaMaterial()">Salvar</button>
        </div>
      </div>
    </modal>

    <!-- PopUp -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      materialAuxiliar: [],
      allMaterials: [],
      materiaisPorNome: [],
      materiaisPorClasse: [],
      nomeParaPesquisa: "",
      classeParaPesquisa: "",
      material: [],
      descricaoMaterial: "",
      classeMaterial: "",
      categoriaMaterial: "",
      embalagemMaterial: "",
      quantidade: "",
      quantidadeUtilizada: "0",
      id: "",
      solicitacao: "SAIDA",
      interval: "",
      acessoProfessor: false,
    };
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  created(){
    this.procurarMaterial();
    this.verificarNovoMaterial();
    this.verificaUsuarioLogado();
  },

  methods: {
    verificaUsuarioLogado(){
      var acesso = localStorage.getItem('loggedAccess');

      if(acesso == "PROFESSOR"){
        this.acessoProfessor = true;
      } else {
        this.acessoProfessor = false;
      }

    },
    verificaMesmoObjeto2(item){
      if(item == this.materialAuxiliar){
        this.allMaterials.push(item);
      }
    },
    verificaMesmoObjeto1(item){
      this.materialAuxiliar = item;
      this.materiaisPorClasse.forEach(this.verificaMesmoObjeto2())
    },
    procuraMaterialFiltro(){
      if(this.nomeParaPesquisa.length < 2 && this.classeParaPesquisa == ""){
        this.procurarMaterial();
      } else {
        this.procurarMaterialporNome(this.nomeParaPesquisa);
      }
    },
    verificarNovoMaterial(){
      this.interval = setInterval(function () {
        var check = localStorage.getItem('novoMaterial');
        if(check == 1){
          this.procurarMaterial();
          localStorage.setItem('novoMaterial', 0);
        }
      }.bind(this), 1500); 
    },
    clearModalEdit() {
      var idMaterial = this.material.id;
      this.material = [];
      this.material.id = idMaterial;
    },
    procurarMaterialporNome(nome){
      this.$http.get("http://localhost:8080/api/v1/material/getByName/" + nome).then(
        function(data) {
          this.materiaisPorNome = data.body;
          this.allMaterials = data.body;
        },
        error => {
          this.materiaisPorNome = [];
          alert('Operação não realizada');
        }
      )
    },
    procurarMaterialporClasse(classe){
      this.$http.get("http://localhost:8080/api/v1/material/getByClasse/" + classe).then(
        function(data) {
          this.materiaisPorClasse = data.body;         
        },
        error => {
          this.materiaisPorClasse = [];
          alert('Operação não realizada');
        }
      )
    },
    procurarMaterial(){
      this.$http.get("http://localhost:8080/api/v1/material/getAll/ativo").then(
        function(data) {
          this.allMaterials = data.body;
        },
        error => {
          alert('Operação não realizada');
          console.error(error.data);
        }
      )
    },
    hideBaixa(){
      this.$modal.hide('confirmBaixa');
    },
    hideDelete(){
      this.$modal.hide('confirmDelete');

    },
    saveDelete() {
      this.material.status = "deletado";
      this.postDelete();
    },
    confirmDelete(material) {
      this.material = material;
      this.$modal.show("confirmDelete");
    },
    postDelete(){
      this.$http.post("http://localhost:8080/api/v1/material/change-status/" + this.material.status + "/" + this.material.id).then(
        () => {
          this.procurarMaterial();
          this.hideDelete();
          alert('Material deletado');
        },error => {
          alert('Operação não realizada');
          console.error(error.data);
        }
      )
    },
    saveEdit(){
      this.$http.post("http://localhost:8080/api/v1/material", this.material).then(
        () => {          
          this.procurarMaterial();          
        },
        error => {
          alert('Operação não realizada');
          console.error(error.data);
        }
      );
    },
    show (material) {
      this.material = material;
      this.$modal.show('allPageDisbled');
    },
    showEdit(material) {
      this.material = material;
      this.$modal.show("allPageEdit");
    },
    confirmBaixa(material) {
      this.material = material;
      this.$modal.show("confirmBaixa");
    },
    baixaMaterial() {

      if(this.quantidadeUtilizada == ""){
        alert('O campo Quantidade Utilizada é obrigatório');
        return;
      }

      if (this.solicitacao == "ENTRADA") {
        var quantfinal = parseInt(this.material.quantidade) + parseInt(this.quantidadeUtilizada);
        this.material.quantidade = quantfinal;
        this.quantidadeUtilizada = "0";

        //Verificação se Quantidade Menor que Quantidade Minima
        if(this.material.quantidade < this.material.quantidadeMinima){
          alert('A quantidade de: ' + this.material.nome + ' ainda está abaixo do que quantidade Minima sugerida !');
        }

      } else if (parseInt(this.material.quantidade) < parseInt(this.quantidadeUtilizada)) {
        alert("Quantidade utilizada maior que quantidade do estoque");
        return;
      } else {
        var quantfinal = parseInt(this.material.quantidade) - parseInt(this.quantidadeUtilizada);
        this.material.quantidade = quantfinal;
        this.quantidadeUtilizada = "0";

        //Verificação se Quantidade Menor que Quantidade Minima
        if(this.material.quantidade < this.material.quantidadeMinima){
          alert('A quantidade de: ' + this.material.nome + ' está abaixo do que quantidade Minima sugerida !');
        }

      }

      this.saveEdit();
      this.hideBaixa();
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
.borda {
  border: 1px solid black;
}
.size {
  font-size: 25px;
}
</style>

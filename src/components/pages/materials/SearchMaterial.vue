<template>
  <div class="container-fluid">
    <!-- Search bar -->
 <div class="row">
      <div class="form-group col-md-2">
         <label >Codigo Material</label>
        <input type="text"
          v-model="codigoMaterial"
          required="required"
          class="form-control"
          placeholder="Digitando........."
          id="material" />
      </div>
      <div class="form-group col-md-6" >
         <label >Nome Material</label>
        <input type="text"
          v-model="nomeMaterial"
          required="required"
          class="form-control"
          placeholder="Digite  Material"
          id="material"  />
          
      </div>
    <div class="form-group col-md-4" >
       <label >
         <br/>
       </label>
      <br/>
        <button type="button" class="btn btn-primary md-4" @click="searchMaterialByNameOrCode()">Pesquisar</button>
 </div>
 </div>
    <br/>
    <table class="table" >
      <thead>
        <tr>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Nome Material
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Classe Material
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Categoria Material
            </a>
          </th>
    <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Quantidade Estoque
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              
            </a>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mat ,i) in allMaterials" :key="i">
          <td>{{mat.nome}}</td>
          <td>{{mat.classe}}</td>
          <td>{{mat.categoria}}</td>
          <td>{{mat.quantidade}}</td>
          <td width="15%" align="right">
            <button type="button" class="btnTable open" @click="show(mat.id)" ></button>
            <button type="button" class="btnTable edit" @click="showEdit(mat.id)" ></button>
            <button type="button" class="btnTable delete" @click="confirmDelete(mat.id)" ></button>
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
        <modal name="allPageDisbled" height="auto"	>
          <div class="borda">
            <br/>
           <div class="input-group mb-3">
              <input type="text" v-model="material.descricao" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="material.classe" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="material.categoria" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="material.embalagem" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'#####'" v-model="material.quantidade" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="realeseDate" class="form-control" disabled/>
            </div>    
          </div>
        </modal>

        <modal name="allPageEdit" height="auto"	>
          <div class="borda">
            <br/>
           <div class="input-group mb-3">
              <input type="text" v-model="material.descricao" class="form-control" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="material.classe" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="material.categoria" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="material.embalagem" class="form-control"  />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'#####'" v-model="material.quantidade" class="form-control"  />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="realeseDate" class="form-control" />
            </div>
            <div align="center">
              <button type="button" class="btn btn-link fullLine"  @click="clearModalEdit()">Limpar</button>
              <button type="button" class="btn btn-primary fullLine" @click="saveEdit()">Salvar</button>
            </div>    
          </div>
        </modal>

        <modal name="confirmDelete" height="auto"	>
          <div class="borda">
            <br/>
            <p class="size" align="center">Deseja realmente excluir ?</p>
            <div align="center">
              <button type="button" class="btn btn-link fullLine"  @click="hideDelete()">Cancelar</button>
              <button type="button" class="btn btn-primary fullLine" @click="saveDelete()">Sim</button>
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
      realeseDate: "",
      nomeMaterial: "",
      codigoMaterial: "",
      allMaterials: [],
      material: {
        descricao: "",
        classe: "",
        categoria: "",
        embalagem: "",
        quantidade: "",
        dataLancamento: "",
      }
    };
  },
  computed: {},

  mounted() {},

  created(){
    this.seachMaterial();
  },

  methods: {
    seachMaterial(){
      this.$http.get("http://localhost:8080/api/v1/material/getAll").then(
        function(data) {
          this.allMaterials = data.body;
        },
        error => {
          console.error(error.data);
        }
      )
    },
    hideDelete(){
      this.$modal.hide('confirmDelete');
    },
    saveDelete(){
      //Enviar ID para BE para salvar

    },
    confirmDelete(materialID) {
      this.$http
      .get("http://localhost:8080/api/v1/material/" + materialID)
      .then(
        function(data) {
          this.material = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
      this.$modal.show('confirmDelete');
    },
    show (materialID) {
      this.$http.get("http://localhost:8080/api/v1/material/" + materialID).then(
        function(data) {
          this.material = data.body;
          this.convertToDate(this.material.dataLancamento);
        },
        error => {
          console.error(error.data);
        }
      );
      this.$modal.show('allPageDisbled');
    },
    showEdit (materialID) {
      this.$http
      .get("http://localhost:8080/api/v1/material/" + materialID)
      .then(
        function(data) {
          this.material = data.body;
          this.convertToDate(this.material.dataLancamento);
        },
        error => {
          console.error(error.data);
        }
      );
      this.$modal.show('allPageEdit');
    //Recebendo os campos do BE
    },
    convertToDate(date){
      date = date / 1000;
      var newDate = new Date(date*1000); // converte para data
      this.realeseDate = newDate.toLocaleDateString("pt-BR");
    },
    searchMaterialByNameOrCode(){
      if((this.nomeMaterial != "") && (this.codigoMaterial == "")){
        this.$http.get("http://localhost:8080/api/v1/material/getByName/" + this.nomeMaterial).then(
          function(data) {
            this.material = data.body;
          },
          error => {
            console.error(error.data);
          }
        )
      }else if ((this.nomeMaterial == "") && (this.codigoMaterial != "")){
        //Segundo campo de persquisa de material
      }else{
        alert("Digite em algum campo para pesquisar!");
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
.open{
  background-color:greenyellow;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.edit{
  background-color: blue;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.delete{
  background-color: red;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.btnTable{
  height: 20px;
  width: 20px;
}
.fullLine{
  align-self: center;
  width: 297px
}
</style>

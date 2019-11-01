<template>
  <div class="container-fluid">
    <!-- Search bar -->
 <div class="row">
      <div class="form-group col-md-2">
         <label >Codigo Material</label>
        <input type="text"
          v-model="material"
          required="required"
          class="form-control"
          placeholder="Digitando........."
          id="material" />
      </div>
      <div class="form-group col-md-6" >
         <label >Nome Material</label>
        <input type="text"
          v-model="material"
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
        <button type="button" class="btn btn-primary md-4" @click="procurarmaterial()">Pesquisar</button>
 </div>
 </div>
    <br/>
    <table class="table" >
      <thead>
        <tr>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Data/Hora
            </a>
          </th>
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
        <tr>
          <td>10/10/1010 10:10</td>
          <td>Material 1</td>
          <td>Matematica</td>
          <td>Duradouro</td>
          <td>10</td>
          <td width="9%" align="right">
            <button type="button" class="btnTable open" @click="show()" ></button>
            <button type="button" class="btnTable edit" @click="showEdit()" ></button>
            <button type="button" class="btnTable delete" @click="confirmDelete()" ></button>
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
              <input type="text" v-model="descricaoMaterial" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="classeMaterial" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="categoriaMaterial" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="embalagemMaterial" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'#####'" v-model="quantidade" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="dataLancamento" class="form-control" disabled/>
            </div>    
          </div>
        </modal>

        <modal name="allPageEdit" height="auto"	>
          <div class="borda">
            <br/>
           <div class="input-group mb-3">
              <input type="text" v-model="descricaoMaterial" class="form-control" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="classeMaterial" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="categoriaMaterial" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="embalagemMaterial" class="form-control"  />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'#####'" v-model="quantidade" class="form-control"  />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="dataLancamento" class="form-control" />
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
        descricaoMaterial: "Material 1",
        classeMaterial: "Matematica",
        categoriaMaterial: "Duradouro",
        embalagemMaterial: "Embalagem 1",
        quantidade: "10",
        dataLancamento: "10/10/10 10:10"
      
    };
  },
  computed: {},

  mounted() {},

  methods: {
    hideDelete(){
      this.$modal.hide('confirmDelete');
    },
    saveDelete(){
      //Enviar ID para BE para salvar

    },
    confirmDelete() {
      this.$modal.show('confirmDelete');
      this.id = id;
    },
    show () {
      this.isEdit = "true";
      this.$modal.show('allPageDisbled');
    },
    showEdit () {
      this.isEdit = "false";
      this.$modal.show('allPageEdit');

    //Recebendo os campos do BE
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

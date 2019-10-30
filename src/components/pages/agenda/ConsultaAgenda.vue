<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <input type="text" class="form-control" v-mask="'##/##/#### ##:##'" v-model="dataToSearch" placeholder="Digite a data"  />
      </div>
      <div class="col-8" >
        <input type="text" v-model="professorToSearch" class="form-control fullLineProf" placeholder="Digite o nome do professor"  />
      </div>
      <div class="col">
        <button type="button" class="btn btn-primary" @click="procurarAgenda()" >Pesquisar</button>
      </div>
    </div>
    <br/>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Data/Hora
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Descricao
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Material
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Professor
            </a>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td width="9%" align="right">
            <!-- <button type="button" class="btnTable open" @click="show(agenda.id)" ></button>
            <button type="button" class="btnTable edit" @click="showEdit(agenda.id)" ></button>
            <button type="button" class="btnTable delete" @click="confirmDelete(agenda.id)" ></button> -->
          </td>
        </tr>
      </tbody>
    </table>
       <!-- PopUp -->
        <modal name="allPageDisbled" height="auto"	>
          <div class="borda">
            <br/>
           <div class="input-group mb-3">
              <input type="text" v-model="agenda.descricao" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.material" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.escola" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.tipoEnsino" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'##'" v-model="agenda.criancas" class="form-control"  disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.responsavel" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.coordenator" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.professor" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.monitor" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
             <input type="text" v-model="agenda.data" class="form-control" disabled/>
            </div >
            
          </div>
        </modal>

        <modal name="allPageEdit" height="auto"	>
          <div class="borda">
            <br/>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.descricao" class="form-control" placeholder="Descrição da Atividade" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.material" class="form-control" placeholder="Material da Atividade"/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.escola" class="form-control" placeholder="Escola da Atividade" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.tipoEnsino" class="form-control" placeholder="Ensino da Atividade" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-mask="'##'" v-model="agenda.criancas" class="form-control" placeholder="Numero de crianças da Atividade" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.responsavel" class="form-control" placeholder="Responsavel da Atividade" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.coordenator" class="form-control" placeholder="Coordenador da Atividade" />
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.professor" class="form-control" placeholder="Professor da Atividade" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="agenda.monitor" class="form-control" placeholder="Monitor da Atividade" />
            </div >
            <div class="input-group mb-3">
             <input type="text" v-model="agenda.data" class="form-control" placeholder="Data da Atividade" />
            </div >
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

import { CoolSelect } from 'vue-cool-select'

export default {
  data() {
    return {
      agenda: [],
      id: "",
      data: "",
      professor: "",
      descricao: "",
      material: "",
      escola: "",
      coordenator: "",
      tipoEnsino: "",
      criancas: "",
      monitor: "",
      responsavel: "",
      professorToSearch: "",
      dataToSearch: "",
    };
  },
  methods: {
    clearModalEdit(){
      this.data = "";
      this.descricao = "";
      this.material = "";
      this.professor = "";
      this.escola = "";
      this.coordenator = "";
      this.tipoEnsino = "";
      this.criancas = "";
      this.monitor = "";
      this.responsavel = "";
    },
    procurarAgenda(){
      //Procurar Agenda atraves dos campos não obrigatorios
      if((this.professorToSearch == null && this.dataToSearch == null) || (this.professorToSearch == "" && this.dataToSearch == "")){
        //Search All
      this.$http.get("http://localhost:8080/api/v1/agenda/getAll")
      .then(function(data) {
        this.agenda = data.body;
      });
      }

    },
    hideDelete(){
      this.$modal.hide('confirmDelete');
    },
    saveDelete(){
      //Enviar ID para BE para salvar

    },
    confirmDelete(id) {
      this.$modal.show('confirmDelete');
      this.id = id;
    },
    show () {
      this.isEdit = "true";
      this.$modal.show('allPageDisbled');
    },
    showEdit (id) {
      this.isEdit = "false";
      this.$modal.show('allPageEdit');

    //Recebendo os campos do BE
      
     
    },
    saveEdit(){
      //Salvar no BE
      //Buscar Lista Novamente do BE

      this.$modal.hide('allPageEdit');
    }
  },
  computed:{
    
  },
  components: {
    CoolSelect
  }, 
}
</script>

<style >
/* TODO - Não Consegui Utilizar */
.link-table {
color: black
}
.fullLineProf{
  width: 600px
}
.fullLine{
  align-self: center;
  width: 297px
}
.btnLess{
  height: 33px
}
.checkBox{
  padding-top: 10px
}
.btnTable{
  height: 20px;
  width: 20px;
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
.borda{
  border: 1px
  solid black;
}
.size{
   font-size: 25px;
}
</style>
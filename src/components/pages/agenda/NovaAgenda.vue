<template>
 <div>
    <div class="container">
      <form> 
        <div class="row">
          <div class="form-group col-md-12">
            <label for="campo1">Descrição da Atividade </label>
           <input type="text" v-model="agenda.descricao" class="form-control" placeholder="Digite uma descrição da Atividade"  />
          </div>  
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="campo1">Nome da Escola </label>
            <input type="text" v-model="agenda.escola" class="form-control" placeholder="Digite o nome da Escola"/>
          </div>   
        </div>
        <div class="row">
          <div class="form-group col-md-2">
            <label for="campo1">Numero de Crianças </label>
            <input type="text" v-mask="'###'" v-model="agenda.criancas" class="form-control" placeholder="Ex: 20"/>
          </div>  
          <div class="form-group col-md litleSpace">
            <label for="campo1">Tipo de Ensino </label>
            <input type="text" v-model="agenda.tipoEnsino" class="form-control" placeholder="Digite o Ensino Exemplo: Ensino Fundamental"/>
          </div>    
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Coordenador:</span>
            <cool-select
              class="camposDropDown"
              v-model="selectedCoordenador"
              :items="items"
              placeholder="Pesquisa o Nome do Coordenador"
            />
            <button type="button" class="plus_someone" @click="show()">+</button>
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Professor:</span>
            <cool-select
              class="camposDropDown"
              v-model="selectedProfessor"
              :items="items"
              placeholder="Pesquise o Nome do Professor"
            />
            <button type="button" class="plus_someone" @click="show()">+</button>
        </div>  
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Monitor:</span>
            <cool-select
              class="camposDropDown"
              v-model="selectedMonitor"
              :items="items"
              placeholder="Pesquise o Nome do Monitor"
            />
            <button type="button" class="plus_someone" @click="show()">+</button>
        </div>    
       

       <div class="col-8 ">
        <label for="langTable">Responsável da Escola</label>
          <table class="table table-hover sour-tar">
              <thead>
                <tr>
                  <th>Responsável</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(responsavel, i) in novoResponsaveis" :key="i">
                  <td>{{responsavel}}</td>
                  <td>
                    <span class="trash" @click="remResponsavel(novoResponsaveis.indexOf(responsavel))">
                      <span></span>
                      <i></i>
                    </span>
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr class="add-new-p">
                  <th>
                    <div class="input-group">
                      <select class="form-control form-align " id="source" v-model="responsavelSelect">
                        <option v-for="(responsavel, i) in responsaveis" :key="i">{{responsavel}}</option>
                      </select>
                      <button type="button" class="plus_someone selectSize" @click="show()">+</button>
                    </div>
                  </th>
                  <th></th>
                  <th class="icon-align">
                    <button class="add-button" @click.prevent="addResponsavel()">
                      <i class="material-icons add-icon">add_circle</i>
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
        </div>

        
      </form>
      <container >
        <button type="button" class="btn btn-primary" @click="salvarAgenda()">Salvar</button>
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      
      </container>
    </div>
    <!-- PopUp -->
    <modal name="responsavelModal" height="auto"	>
      <div class="borda" >
        <br>
        <div class="input-group mb-3 space_up">
          <div class="input-group-prepend">
            <span class="input-group-text">Nome</span>
          </div>
          <input type="text" class="form-control" placeholder="Digite o Nome" v-model="novoResponsavel.nome" />
        </div >
        <div align="center">
          <button type="button" class="btn btn-link fullLine"  @click="clearModal()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveOne()">Salvar</button>
        </div> 
      </div> 
    </modal>
    <!-- PopUp -->
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import { Datetime } from "vue-datetime";
  

export default {
   
  methods: {
    salvarAgenda(){
      this.agenda.coordenator = this.selectedCoordenador;
      this.agenda.responsavel = this.responsavelSelect;

      this.$http
        .post("http://localhost:8080/api/v1/agenda", this.agenda)
        .then(function() {
          alert("New project registred");
          this.resetFields();
          console.log(this.project);
        });
    },
    remResponsavel(index) {
      this.novoResponsaveis.splice(index, 1);
    },
    addResponsavel() {
      if(this.novoResponsaveis == null || this.novoResponsaveis.length <= 2 ){
        this.novoResponsaveis.push(
          this.responsavelSelect
        );
        this.responsavelSelect = "";
      } else {
        alert('Poderá haver no máximo 3 Responsávies por atividade')
      }
    },
    onKeydown (event) {
      const char = String.fromCharCode(event.keyCode)
      if(this.responsavel.rg.length != 12){
        if (!/[0-9]/.test(char)) {
          event.preventDefault()
        } 
      }  
    },
    clearModal(){
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = "")
    },
    saveOne(){
      if(this.responsavel.nome == "") {
        alert('O nome é obrigatório');
      } else{
        this.responsavel.push({nome: this.novoResponsavel.nome })
        this.selected = this.novoResponsavel.nome,
        this.hide();
      }
    },
    show () {
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      this.$modal.show('responsavelModal');
    },
    hide () {
      this.$modal.hide('responsavelModal');
    },

    close () {
      this.$router.back()
    },
    resetFields() {
      (this.agenda.monitor = ""),
      (this.agenda.descricao = ""),
      (this.agenda.professor = ""),
      (this.agenda.coordenator = ""),
      (this.agenda.escola = ""),
      (this.agenda.tipoEnsino = ""),
      (this.agenda.criancas = ""),
      (this.agenda.escola = ""),
      (this.selectedMonitor = ""),
      (this.selectedCoordenador = ""),
      (this.selectedProfessor = ""),
      (this.novoResponsaveis = []) ,
      (this.responsavelSelect = "")
    }
  },

  components: {  
    CoolSelect,
    datetime: Datetime,


  },
  data() {
    return {
      items: ['Roberto', 'Ricardo', 'Rivaldo', 'Emily', 'Isabella ', 'Breno', 'Leonor', 'Carolina ', 'Rivaldo', 'Roberto', 'Carla ', 'Beatrice ', 'Giovana ', 'Lavinia ', 'Alex ', 'Carlos ', 'Clara ', 'Eduarda '],
      responsaveis: ['Roberto', 'Ricardo', 'Rivaldo', 'Emily', 'Isabella ', 'Breno', 'Leonor', 'Carolina ', 'Rivaldo', 'Roberto', 'Carla ', 'Beatrice ', 'Giovana ', 'Lavinia ', 'Alex ', 'Carlos ', 'Clara ', 'Eduarda '],
      novoResponsaveis: [],
      listNull: [],
      responsavelSelect: "",
      selectedMonitor: null,
      selectedCoordenador: null,
      selectedProfessor: null,
      novoResponsavel: {
        nome: "",
        rg: ""
      },
      responsavel: [
      ],
      agenda: {
        coordenator: "",
        monitor: "",
        professor: "",
        escola: "",
        criancas: "",
        tipoEnsino: "",
        responsável: {
          nome: "",
        },
        material: "",
        data: "1571778742000",
        descricao: "",
      }
    } 
  }
  
}

</script>

<style scoped>
.plus_someone{
  height: 34px;
}
.fullLine{
  width: 250px
}
.sizeCool{
  width: 250px
}
.subTitulo{
  padding-top: 5px;
  width: 190px
}
.camposDropDown{
  width:  834px;
}
.borda{
  border: 1px
  solid black;
}
.litleSpace{
  padding-left: 25px;
}
.selectSize {
  height: 38px;
}
</style>
<template>
 <div>
    <div>
      <form> 
        <div class="row">
          <div class="form-group col-md-10">
            <label for="campo1">Descrição da Atividade </label>
            <input type="text" v-model="agenda.descricao" class="form-control" placeholder="Digite uma descrição da Atividade"  />
          </div>
          <div class="form-group col-md-2">
            <label for="campo1">Data da Atividade </label>
            <datetime
              class="date"
              type="datetime"
              v-model="agenda.data"
              minute-step="15"
              :placeholder="'Selecione uma Data'"
            ></datetime>
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
            <label >Tipo de Ensino </label>
            <select
              class="custom-select my-1 mr-sm-2"
              v-model="agenda.tipoEnsino"
            >
              <option disabled selected>Selecione uma opção...</option>
              <option value="FUNDAMENTAL">Fundamental</option>
              <option value="PRIMARIO">Primário</option>
            </select>
          </div>    
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Coordenador:</span>
            <cool-select
              item-text="nome"
              class="camposDropDown"
              v-model="agenda.coordenator"
              :items="coordenadores"
              placeholder="Pesquisa o Nome do Coordenador"
            />
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Professor:</span>
            <cool-select
              item-text="nome"
              class="camposDropDown"
              v-model="agenda.professor"
              :items="professores"
              placeholder="Pesquise o Nome do Professor"
            />
        </div>  
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Monitor:</span>
            <cool-select
              item-text="nome"
              class="camposDropDown"
              v-model="agenda.monitor"
              :items="monitores"
              placeholder="Pesquise o Nome do Monitor"
            />
        </div>    
      <div class="row">
        <!-- Tabela Responsável -->
        <div class="col-6 ">
          <label for="langTable">Responsável da Escola</label>
            <table class="table table-hover sour-tar">
                <thead>
                  <tr>
                    <th>Responsável</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(responsavel, i) in novosResponsaveis" :key="i">
                    <td>{{responsavel.nome}}</td>
                    <td>
                      <span class="trash" @click="remResponsavel(novosResponsaveis.indexOf(responsavel))">
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
                        <cool-select
                          class="responsavelDrop"
                          item-text="nome"
                          v-model="responsavelSelect"
                          :items="responsaveis"
                          placeholder="Pesquise o Responsavel"
                        /> 
                        <button type="button" class="btn btn-link" @click="show()">Criar Novo Responsável</button>
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
          <!-- Tabela Responsável -->

          <!-- Tabela Material -->
          <div class="col-6 ">
          <label for="langTable">Materiais</label>
            <table class="table table-hover sour-tar">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material, i) in materiaisParaAtividade" :key="i">
                    <td>{{material.descricao}}</td>
                    <td>
                      <span class="trash" @click="remMaterial(materiaisParaAtividade.indexOf(material))">
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
                        <cool-select
                          item-text="descricao"
                          class="materialDrop"
                          v-model="materialSelecionado"
                          :items="materiais"
                          placeholder="Pesquise o Material"
                        /> 
                      </div>
                    </th>
                    <th></th>
                    <th class="icon-align">
                      <button type="button" class="add-button" @click="showModalMaterial()">
                        <i class="material-icons add-icon">add_circle</i>
                      </button>
                    </th>
                  </tr>
                </thead>
              </table>
          </div>            
          <!-- Tabela Material -->
        </div>
        <br/>
      </form>
      <container >
        <button type="button" class="btn btn-primary" @click="salvarAgenda()">Salvar</button>
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      
      </container>
    </div>

    <!-- MODALS -->
      
    <!-- Material -->
    <modal name="novoMaterial" height="auto"  >
      <div class="container borda" >
        <div class="row">
          <div class="col-md">
            <label for="">Quantidade que Utilizará </label>
            <input type="text" class="form-control" v-mask="'######'" v-model="materialSelecionado.quantidade"  placeholder="Digite a quantidade que utilizará "  />
          </div>
          <div class="col-md">
            <label for="">Quantidade Máxima </label>
            <input type="text" class="form-control" v-model="quantidadeUtilizada" disabled  />
          </div>
        </div>
          <br/>
            <button type="button" class="btn btn-primary" @click="addMaterial()" >Salvar</button>
            <button type="button" class="btn btn-link" @click="hideMaterial()">Cancelar</button>  
      </div>
    </modal>
    <!-- Material -->

    <!-- PopUp -->
    <modal name="novoResponsavel" height="auto" >
      <div class="borda" >
        <br>
        <div class="input-group mb-3 space_up">
          <div class="input-group-prepend">
            <span class="input-group-text spanSize">Nome</span>
          </div>
          <input type="text" class="form-control" maxlength="50" placeholder="Digite o Nome" v-model="novoResponsavel.nome" />
        </div >
        <div class="input-group mb-3 space_up">
          <div class="input-group-prepend">
            <span class="input-group-text spanSize">RG</span>
          </div>
          <input type="text" class="form-control" v-mask="'##.###.###-X'" placeholder="Digite o RG" v-model="novoResponsavel.rg" />
        </div >
        <div class="input-group mb-3 space_up">
          <div class="input-group-prepend">
            <span class="input-group-text spanSize">Email</span>
          </div>
          <input type="text" class="form-control" maxlength="50" placeholder="Digite o Email" v-model="novoResponsavel.email" />
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
  data() {
    return {
      agendada: "AGENDADA",
      coordenadores: [],
      professores: [],
      monitores: [],
      //Varieavies Referente a Material
      index: "",
      quantidadeUtilizada: 0,
      materiaisParaAtividade: [],
      materiais: [],
      materialSelecionado: {
        quantidade: "0",
        descricao: "",
      },
      responsavelSelect: [],
      //Lista de Responsáveis para a atividade
      responsaveis: [],
      //Variavel da Modal para cadastro de responsável
      novoResponsavel: {
        nome: "",
        rg: "",
        email: ""
      },
      novosResponsaveis: [],
      agenda: {
        coordenator: "",
        monitor: "",
        professor: "",
        escola: "",
        criancas: "",
        tipoEnsino: "",
        material: [{
          descricao: "",
          quantidade: ""
        }],
        data: "1389135600",
        descricao: "",
        responsavel: [{
          nome: "",
          rg: ""
        }],
      }
    } 
  }, 
  methods: {
    addMaterial(){
      if(this.quantidadeUtilizada < this.materialSelecionado.quantidade){
        alert('A quantidade a ser utilizada deve ser menor que a disponível !');
      } else {
        this.materiaisParaAtividade.push(this.materialSelecionado);
        this.hideMaterial();
      }
      
       
      
    },
    salvarAgenda(){

      var date = Date.parse(this.agenda.data)
      
      let agenda = {
        status: this.agendada,
        coordenator: this.agenda.coordenator,
        monitor: this.agenda.monitor,
        professor: this.agenda.professor,
        escola: this.agenda.escola,
        criancas: this.agenda.criancas,
        tipoEnsino: this.agenda.tipoEnsino,
        data: date,
        resposaveis: this.novosResponsaveis,
        materiais: this.materiaisParaAtividade,
      }

      this.$http
        .post("http://localhost:8080/api/v1/agenda", agenda)
        .then(function() {
          alert("Nova agenda Cadastrada");
          this.resetFields();
          console.log(this.project);
        }, error => {
          console.log(error.data);
        });
    },
    remResponsavel(index) {
      this.novosResponsaveis.splice(index, 1);
    },
    remMaterial(index){
      this.materiaisParaAtividade.splice(index, 1);
    },
    addResponsavel() {
      this.novosResponsaveis.push(this.responsavelSelect)
      this.responsavelSelect = []
    },
    clearModal(){
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      (this.novoResponsavel.email = "")
    },
    saveOne(){
      if(this.novoResponsavel.nome == "" || this.novoResponsavel.rg == "" ||  this.novoResponsavel.email == "") {
        alert('Todos os campos são obrigatórios.');
      } else{

        this.$http
        .post("http://localhost:8080/api/v1/responsavel", this.novoResponsavel)
        .then(function() {
          alert("Novo Responsável Cadastrado !");
          this.clearModal();
        },error => {
          console.log(error.data);
        });

        this.hide();
      }
    },
    showModalMaterial() {
      if(this.materialSelecionado.descricao != ""){
        this.quantidadeUtilizada = this.materialSelecionado.quantidade
        this.materialSelecionado.quantidade = "0"

        this.$modal.show('novoMaterial');
      } else {
        alert('Para incluir um material, deve selecionar um material');
      }
    },
    show () {
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      this.$modal.show('novoResponsavel');
    },
    hide () {
      this.$modal.hide('novoResponsavel');
    },
    hideMaterial(){
       this.$modal.hide('novoMaterial');
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
      (this.agenda.monitor = ""),
      (this.agenda.data = ""),
      (this.agenda.coordenator = []),
      (this.agenda.professor = ""),
      (this.novosResponsaveis = []) ,
      (this.responsavelSelect = "")
    },
    procurarResponsaveis(){
      //Procurar Todos Responsaveis
      this.$http.get("http://localhost:8080/api/v1/responsavel/getAll")
      .then(function(data) {
        this.responsaveis = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarCoordenadores(){
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess?acesso=COORDENADOR")
      .then(function(data) {
        this.coordenadores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarProfessores(){
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess?acesso=PROFESSOR")
      .then(function(data) {
        this.professores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarMonitores(){
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess?acesso=MONITOR")
      .then(function(data) {
        this.monitores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarMateriais(){
      this.$http.get("http://localhost:8080/api/v1/material/getAll")
      .then(function(data) {
        this.materiais = data.body;
      },error => {
        console.log(error.data);
      });
    },

  },
  created(){
      this.procurarResponsaveis();
      this.procurarCoordenadores();
      this.procurarProfessores();
      this.procurarMonitores();
      this.procurarMateriais();
  },

  components: {  
    CoolSelect,
    datetime: Datetime,
  },
  
  
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
  width:  890px;
}
.borda{
  border: 1px
  solid black;
}
.litleSpace{
  padding-left: 20px;
}
.selectSize {
  height: 38px;
}
.materialDrop {
  width: 380px;
}
.responsavelDrop {
  width: 220px;
}
.coolSize{
  height: 34px;
}
.show {
  cursor: pointer;
  background-color: transparent;
}
.material-icons:hover{
  color:red;
}
.spanSize{
  width: 65px;
}
</style>
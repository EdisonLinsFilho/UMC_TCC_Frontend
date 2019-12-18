<template>
 <div>
    <div>
      <form> 
        <div class="row">
          <div class="form-group col-md-10">
            <label for="campo1">Descrição da Atividade </label>
            <font color="red">*</font>
            <input type="text" maxlength="100" v-model="agenda.descricao" class="form-control" placeholder="Digite uma descrição da Atividade"  />
          </div>
          <div class="form-group col-md-2">
            <label for="campo1">Data da Atividade </label>
            <font color="red">*</font>
            <datetime
              class="date"
              type="datetime"
              v-model="agenda.data"
              :placeholder="'Selecione uma Data'"
            ></datetime>
          </div>  
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="campo1">Nome da Escola </label>
            <font color="red">*</font>
            <input type="text" maxlength="70" v-model="agenda.escola" class="form-control" placeholder="Digite o nome da Escola"/>
          </div>   
        </div>
        <div class="row">
          <div class="form-group col-md-2">
            <label for="campo1">Numero de Crianças </label><font color="red">*</font>
            <input type="text" v-mask="'###'" v-model="agenda.criancas" class="form-control" placeholder="Ex: 20"/>
          </div>  
          <div class="form-group col-md litleSpace">
            <label >Tipo de Ensino </label>
            <font color="red">*</font>
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
            <span class="subTitulo">Nome do Coordenador: <font color="red">*</font></span>
            <cool-select
              item-text="nome"
              class="camposDropDown"
              v-model="agenda.coordenator"
              :items="coordenadores"
              placeholder="Pesquisa o Nome do Coordenador"
            />
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Professor: <font color="red">*</font></span>
            <cool-select
              item-text="nome"
              class="camposDropDown"
              v-model="agenda.professor"
              :items="professores"
              placeholder="Pesquise o Nome do Professor"
            />
        </div>  
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Monitor: <font color="red">*</font></span>
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
          <label for="langTable">Responsável da Escola</label><font color="red">*</font>
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
                        >
                        <template slot="item" slot-scope="{ item: responsavel }">
                          <div>
                            {{responsavel.nome}} -
                            {{responsavel.rg}}
                          </div>
                        </template>
                        </cool-select> 
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
                          v-model="material"
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
      <div>
        <button type="button" class="btn btn-primary btn-umc" @click="salvarAgenda()">Salvar</button>
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      
      </div>
    </div>

    <!-- MODALS -->
      
    <!-- Material -->
    <modal name="novoMaterial" height="auto"  >
      <div class="container borda" >
        <div class="row">
          <div class="col-md">
            <label for="">Quantidade que Utilizará </label>
            <input type="text" class="form-control" v-mask="'######'" v-model="quantidadeUtilizada"  placeholder="Digite a quantidade que utilizará "  />
          </div>
          <div class="col-md">
            <label for="">Quantidade Máxima </label>
            <input type="text" class="form-control" v-model="materialSelecionado.quantidade" disabled  />
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
      <div class="modal-header">
         <h4> Novo Responsável </h4>
      </div>
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
          <button type="button" class="btn btn-primary fullLine btn-umc" @click="saveOne()">Salvar</button>
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
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      status: "ACTIVE",
      coordenadores: [],
      professores: [],
      monitores: [],
      //Varieavies Referente a Material
      index: "",
      quantidadeUtilizada: 0,
      materiaisParaAtividade: [],
      material: [],
      materiais: [],
      materialSelecionado: [],
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
        responsavel: [],
      },
      materialDto: {
        materialId: "",
        quantidadeUtilizada: "",
      },
      quantidadeUtilizadaDto: [],
    } 
  }, 
  methods: {
    verificarTodosCampos(){

      if(this.agenda.descricao == ""){
        alert('O campo Descrição é obrigatório !')
        return false;
      } else if(this.agenda.data == ""){
        alert('O campo Data é obrigatório !')
        return false;
      } else if(this.agenda.escola == ""){
        alert('O campo Nome da Escola é obrigatório !')
        return false;
      } else if(this.agenda.criancas == ""){
        alert('O campo Numero de Crianças é obrigatório !')
        return false;
      } else if(this.agenda.tipoEnsino == ""){
        alert('O campo Tipo Ensino é obrigatório !')
        return false;
      } else if(this.agenda.coordenator == null){
        alert('O campo Coordenador é obrigatório !')
        return false;
      } else if(this.agenda.professor == null){
        alert('O campo professor é obrigatório !')
        return false;
      } else if(this.agenda.monitor == null){
        alert('O campo Monitor é obrigatório !')
        return false;
      } else if(this.novosResponsaveis.length == 0){
        alert('O campo Responsável é obrigatório !')
        return false;
      }
    },
    addMaterial(){
      if(this.quantidadeUtilizada > this.materialSelecionado.quantidade){
        alert('A quantidade a ser utilizada deve ser menor que a disponível !');
      } else {

        this.materiaisParaAtividade.push(this.materialSelecionado);
        //this.agenda.material.push(this.materialSelecionado);

        this.materialDto.materialId = this.materialSelecionado.id;
        this.materialDto.quantidadeUtilizada = this.quantidadeUtilizada;

        this.quantidadeUtilizadaDto.push(this.materialDto);

        this.hideMaterial();

        var index = this.materiais.indexOf(this.material);

        this.materiais.splice(index, 1);


      }
      
       
      
    },
    salvarAgenda(){

      if(this.verificarTodosCampos() == false){
        return
      }

      var date = Date.parse(this.agenda.data)

      let agenda = {
        descricao: this.agenda.descricao,
        status: this.status,
        coordenator: this.agenda.coordenator,
        monitor: this.agenda.monitor,
        professor: this.agenda.professor,
        escola: this.agenda.escola,
        criancas: this.agenda.criancas,
        tipoEnsino: this.agenda.tipoEnsino,
        data: date,
        resposaveis: this.novosResponsaveis,
        materiais: this.materiaisParaAtividade,
        quantidadeMaterialUtilizadoDto: this.quantidadeUtilizadaDto,
        
      }

      this.$http
        .post("http://localhost:8080/api/v1/agenda", agenda)
        .then(function() {
          alert("Nova agenda Cadastrada");
          this.resetFields();
          localStorage.setItem('novaAgenda', 1);
        }, error => {
          alert(error.data.message);
          console.log(error.data);
        });
    },
    remResponsavel(index) {
      this.responsaveis.push(this.novosResponsaveis[index]);
      this.novosResponsaveis.splice(index, 1);
    },
    remMaterial(index){
      this.materiais.push(this.materiaisParaAtividade[index]);

      this.materiaisParaAtividade.splice(index, 1);
      this.quantidadeUtilizadaDto.splice(index, 1);
      this.agenda.material.splice(index, 1);
    },
    addResponsavel() {

      if(this.responsavelSelect == null){
        alert('Selecione um Responsável !')
        return
      }

      if(this.novosResponsaveis.length >= 3){
        alert('Cada atividade pode conter no máximo 3 responsáveis.')
        return
      } else {
        this.novosResponsaveis.push(this.responsavelSelect)

        var index = this.responsaveis.indexOf(this.responsavelSelect);
        this.responsaveis.splice(index, 1);

        
      }
    },
    clearModal(){
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      (this.novoResponsavel.email = "")
    },
    saveOne(){
      
      let responsavel = this.novoResponsavel
      
      if(this.novoResponsavel.nome == "" || this.novoResponsavel.rg == "" ||  this.novoResponsavel.email == "") {
        alert('Todos os campos são obrigatórios.');
        return
      } else if(this.novoResponsavel.rg.length < 12){
        alert('Preencher o campo rg corretamente.')
        return
      } else if(this.reg.test(this.novoResponsavel.email) == false){
        alert('Email invalido !');
        return
      } else {

        this.$http
        .post("http://localhost:8080/api/v1/responsavel", this.novoResponsavel)
        .then(function() {
          alert("Novo Responsável Cadastrado !");
          this.novosResponsaveis = [];
          this.procurarResponsaveis();
          this.clearModal();
          this.hide();
        },error => {
          console.log(error.data);
          alert('RG para responsável já cadastrado no sistema !');
        });

      }
    },
    showModalMaterial() {
 
      if(this.material.descricao != ""){
        this.quantidadeUtilizada = 0
        this.materialSelecionado = this.material

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
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess/coordenador/active")
      .then(function(data) {
        this.coordenadores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarProfessores(){
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess/PROFESSOR/ACTIVE")
      .then(function(data) {
        this.professores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarMonitores(){
      this.$http.get("http://localhost:8080/api/v1/usuario/byAccess/MONITOR/ACTIVE")
      .then(function(data) {
        this.monitores = data.body;
      },error => {
        console.log(error.data);
      });
    },
    procurarMateriais(){
      this.$http.get("http://localhost:8080/api/v1/material/getAll/ativo")
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
  width: 400px;
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
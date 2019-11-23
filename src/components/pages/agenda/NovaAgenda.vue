<template>
 <div>
    <div>
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
            <select
              class="custom-select my-1 mr-sm-2"
              v-model="agenda.tipoEnsino"
            >
              <option disabled selected>Selecione uma opção...</option>
              <option value="CIENCIA">Ciência</option>
              <option value="CONSUMO">Consumo</option>
              <option value="DESENVOLVIMENTO_COGNITIVO">Desenvolvimento Cognitivo</option>
              <option value="EDUCACAO_FISICA">Educação Física</option>
              <option value="LINGUA_PORTUGUESA">Língua Portuguesa</option>
              <option value="MATEMATICA">Matemática</option>
              <option value="NATUREZA_E_SOCIEDADE">Natureza e Sociedade</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>    
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Coordenador:</span>
            <cool-select
              class="camposDropDown"
              v-model="agenda.selectedCoordenador"
              :items="itemsCoordenator"
              placeholder="Pesquisa o Nome do Coordenador"
            />
            <button type="button" class="plus_someone" @click="showNewUser(coordenador)" >+</button>
        </div>
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Professor:</span>
            <cool-select
              class="camposDropDown"
              v-model="agenda.selectedProfessor"
              :items="itemsTeacher"
              placeholder="Pesquise o Nome do Professor"
            />
            <button type="button" class="plus_someone" @click="showNewUser(professor)" >+</button>
        </div>  
        <div class="input-group mb-4">
            <span class="subTitulo">Nome do Monitor:</span>
            <cool-select
              class="camposDropDown"
              v-model="agenda.selectedMonitor"
              :items="itemsMonitor"
              placeholder="Pesquise o Nome do Monitor"
            />
            <button type="button" class="plus_someone" @click="showNewUser(monitor)" >+</button>
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
                        <select class="form-control form-align " id="source" v-model="this.responsavelSelect">
                          <option v-for="(responsavel, i) in responsavelParaAtividade" :key="i">{{responsavel}}</option>
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
            <input type="text" class="form-control" v-model="materialSelecionado.quantidade" v-mask="'######'" placeholder="Digite a quantidade que utilizará "  />
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
            <span class="input-group-text">Nome</span>
          </div>
          <input type="text" class="form-control" placeholder="Digite o Nome" v-model="novoResponsavel.nome" />
        </div >
        <div class="input-group mb-3 space_up">
          <div class="input-group-prepend">
            <span class="input-group-text">RG</span>
          </div>
          <input type="text" class="form-control" v-mask="'##.###.###-X'" placeholder="Digite o RG" v-model="novoResponsavel.rg" />
        </div >
        <div align="center">
          <button type="button" class="btn btn-link fullLine"  @click="clearModal()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveOne()">Salvar</button>
        </div> 
      </div> 
    </modal>
    <!-- PopUp -->
    <!-- Cadastro Usuário -->
    <modal name="novoUsuario" height="auto">
      <div class="container borda">
        <form>
          <div class="row">
            <div class="form-group col-md">
              <label for="campo1">Nome </label>
              <input type="text" class="form-control" v-model="user.nome" placeholder="Digite o Nome do Usuario"  />
            </div>
            <div class="form-group col-md">
              <label for="campo1">Cargo </label>
              <select
                disabled
                class="custom-select my-1 mr-sm-2"
                v-model="user.acesso"
              >
                <option value="COORDENADOR">Coordenador</option>
                <option value="PROFESSOR">Professor</option>
                <option value="MONITOR">Monitor</option>
              </select>
            </div>
            <div class="form-group col-md-12">
              <label for="campo1">E-mail </label>
              <input type="text" class="form-control" v-model="user.email" placeholder="Digite o E-mail do Usuario"  />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="campo1">Senha </label>
              <input type="password" class="form-control" v-model="user.senha" placeholder="A senha deve Conter: Caracteres Especiais, Maiusculos e numeros "  />
            </div>
          
            <div class="form-group col-md-6">
              <label for="campo1">Repetir Senha </label>
              <input type="password" class="form-control" v-model="confirmaSenha" placeholder="Digite a senha digitada anteriormente"  />
            </div>    
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="campo1">RGM </label>
              <input type="text" class="form-control" v-mask="'###########'" v-model="user.rgm" placeholder="Digite o RGM do Novo Usuario"  />
            </div>   
          </div>
        </form>
        <container >
          <button type="button" class="btn btn-primary" v-on:click="saveUser()">Salvar</button>
          <button type="button" class="btn btn-link" v-on:click="resetNewUser()" >Limpar</button>
        </container>
      </div>
    </modal>
    <!-- Cadastro Usuário -->
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import { Datetime } from "vue-datetime";
  

export default {
  data() {
    return {
      //Varieavies Referente a Material
      index: "",
      quantidadeUtilizada: 0,
      materiaisParaAtividade: [],
      materiais: [{
         descricao: "Lapis",
         quantidade: "10"
      },{
        descricao: "Borracha",
        quantidade: "15"
      }],
      materialSelecionado: {
        descricao: "",
        quantidade: 0
      },

      //Variaveis Responsáveis pelo Cadastro de Usuario
      confirmaSenha: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      user: {
        nome: "",
        acesso: "",
        email: "",
        rgm: "",
        senha: "",
        status: "ACTIVE",
      },
      professor: "PROFESSOR",
      coordenador: "COORDENADOR",
      monitor: "MONITOR",
      //Variaveis Responsáveis pelo Cadastro de Usuario

      //Variavel de Mock para select de Monitores, Professores e Coordenadores.
      itemsCoordenator: ["joao"],
      itemsTeacher: ["monica","Marco"],
      itemsMonitor: ["catarina","rodrigo"],
      //Lista de Responsáveis para a atividade
      responsaveis: [],
      //Variavel da Modal para cadastro de responsável
      novoResponsavel: {
        nome: "",
        rg: ""
      },
      //Responsavel localizado dentro do input Select, para incluir na lista de responsáveis
      responsavelSelect: [],
      //Lista de Responsaveis associados a atividade
      responsavelParaAtividade: [],
      novoResponsaveis: [],
      selectedMonitor: null,
      selectedCoordenador: null,
      selectedProfessor: null,
      agenda: {
        selectedCoordenator: "",
        selectedMonitor: "",
        selectedProfessor: "",
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
    saveUser() {
      if(this.user.senha != this.confirmaSenha){
        alert('Confirmação de Senha Invalida ! \n A senha nos dois campos devem ser iguais !');
        return
      } else {
        // Validar Senha
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if(this.user.senha.match(lowerCaseLetters) && this.user.senha.match(upperCaseLetters) && this.user.senha.match(numbers) && this.user.senha.length >= 8) {   
          if(this.reg.test(this.user.email) == false){
            alert('Email invalido !');
            return
          }else{
            this.$http.post("http://localhost:8080/api/v1/usuario/saveOrUpdate", this.user).then(
              () => {
                if(this.user.acesso == "COORDENADOR"){
                  this.itemsCoordenator.push(this.user.nome);
                  this.agenda.selectedCoordenador =  this.user.nome;
                } else if (this.user.acesso == "PROFESSOR") {
                  this.itemsTeacher.push(this.user.nome);
                  this.agenda.selectedProfessor =  this.user.nome;
                } else {
                  this.itemsMonitor.push(this.user.nome);
                  this.agenda.selectedMonitor =  this.user.nome;
                }
                this.resetNewUser();
                this.hideUser();
              },
              error => {
                console.error(error.data);
              }
            );
          }
        } else {
          alert('Sua senha deve conter pelo menos: \n - Um Caracter Maiusculo \n - Um Caracter Minusculo \n - Um Caracter Especial Ex: @ \n - Um Numero \n - Maior que 8 digitos ');
          return
        }
      }
    },
    resetNewUser() {
      (this.user.nome = ""),
      (this.user.email = ""),
      (this.user.acesso = ""),
      (this.user.senha = ""),
      (this.user.rgm = ""),
      (this.user.numeroTelefone = ""),
      (this.confirmaSenha = "");
    },
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
    remMaterial(index){
      this.materiaisParaAtividade.splice(index, 1);
    },
    addResponsavel() {
      if(this.novoResponsaveis != null && this.novoResponsaveis.length <= 2 ){
        this.novoResponsaveis.push(
          this.responsavelSelect
        );
        this.responsavelSelect = "";
      } else {
        alert('Poderá haver no máximo 3 Responsávies por atividade')
      }
    },
    clearModal(){
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = "")
    },
    saveOne(){
      if(this.novoResponsavel.nome == "" || this.novoResponsavel.rg == "") {
        alert('Todos os campos são obrigatórios.');
      } else{
        this.responsavelParaAtividade.push(
            {
              nome: this.novoResponsavel.nome,
              rg: this.novoResponsavel.rg 
            }
          )
        this.responsavelSelect = this.novoResponsavel.nome,
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
    showNewUser (cargo){
      this.user.acesso = cargo;
      this.$modal.show('novoUsuario');
    },
    show () {
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      this.$modal.show('novoResponsavel');
    },
    hide () {
      this.$modal.hide('novoResponsavel');
    },
    hideUser () {
      this.$modal.hide('novoUsuario');
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
.materialDrop {
  width: 380px;
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
</style>
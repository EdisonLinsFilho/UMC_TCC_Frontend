<template>
  <div class="container-fluid">
    <!-- SearchBar -->
    <div class="row">
      <div class="form-group col-md-5">
        <input type="text" class="form-control" v-model="nomeParaPesquisa" placeholder="Digite o Nome do Usuario"  />
      </div> 
      <div class="form-group col-md-5">
        <cool-select
          v-model="cargoParaPesuisa"
          :items="entidade"
          placeholder="Pesquise o Cargo do Usuario"
        /> 
      </div>
      <div class="form-group col-md-2">
        <button type="button" class="btn btn-primary " v-on:click="searchUser()">Pesquisar</button>
      </div>
    </div>
    <!-- Template Output da busca -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>RGM</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user ,i) in users" :key="i">
            <td>{{user.rgm}}</td>
            <td>{{user.email}}</td>
            <td width="10%" align="right">
              <button type="button" class="btnTable open" @click="show()" ></button>
              <button type="button" class="btnTable edit" @click="showEdit()" ></button>
              <button type="button" class="btnTable delete" @click="confirmDelete()" ></button>
            </td>
          </tr>


    

        </tbody>
      </table>
    </div>
    <!-- PopUp -->
        <modal name="allPageDisbled" height="auto"	>
          <div class="borda">
            <br/>
           <div class="input-group mb-3">
              <input type="text" v-model="user.status" class="form-control" disabled/>
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="user.email" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="user.cargo" class="form-control" disabled/>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="user.rgm" class="form-control"  disabled/>
            </div >
          </div>
        </modal>

        <modal name="allPageEdit" height="auto"	>
          <div class="borda">
            <br/>
            <div class="input-group mb-3">
              <input type="text" v-model="user.status" class="form-control"  placeholder="Nome do Usuario" />
            </div >
            <div class="input-group mb-3">
              <input type="text" v-model="user.email" class="form-control" placeholder="Email do Usuario" />
            </div>
            <div class="input-group mb-3">
              <cool-select
                class="fullCool"
                v-model="user.cargo"
                :items="entidade"
                placeholder="Pesquise o Cargo do Usuario"
              /> 
            </div>
            <div class="input-group mb-3">
              <input type="text" v-mask="'###########'" v-model="user.rgm" class="form-control" placeholder="RGM do Usuario" />
            </div >
            <div class="input-group mb-3">
              <input type="password" v-model="user.senha" class="form-control" placeholder="Senha do Usuario" />
            </div>
             <div class="input-group mb-3">
              <input type="password" v-model="confirmaSenha" placeholder="Digite a Senha novamente" class="form-control"  />
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
import { CoolSelect } from 'vue-cool-select'
export default {
  data() {
    return {
      nomeParaPesquisa: "",
      cargoParaPesuisa: "",
      entidade: ['Professor-Coordenador','Professor', 'Coordenador', 'Monitor'],
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      uName: "",
      users: [
      ],
      confirmaSenha: "",
      user: {
        acesso: "",
        status: "",
        email: "",
        senha: "",
        rgm: "",
      },
      userNull: {
        acesso: "",
        status: "",
        email: "",
        senha: "",
        rgm: "",
      }
    };
  },
  
  components: {  
      CoolSelect,  
  },

  methods: {

    show () {
      this.isEdit = "true";
      this.$modal.show('allPageDisbled');
    },
    showEdit () {
      this.isEdit = "false";
      this.$modal.show('allPageEdit');
      this.confirmaSenha = this.user.senha;
    //Recebendo os campos do BE
      
     
    },
    confirmDelete() {
      this.$modal.show('confirmDelete');
      this.id = id;
    },
    hideDelete(){
      this.$modal.hide('confirmDelete');
    },
    clearModalEdit(){
      (this.user.status = ""),
      (this.user.email = ""),
      (this.user.cargo = ""),
      (this.user.senha = ""),
      (this.user.rgm = ""),
      (this.user.numeroTelefone = ""),
      (this.confirmaSenha = "");
    },
    saveEdit(){
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
             this.$modal.hide('allPageEdit');
          }
        } else {
          alert('Sua senha deve conter pelo menos: \n - Um Caracter Maiusculo \n - Um Caracter Minusculo \n - Um Caracter Especial Ex: @ \n - Um Numero \n - Maior que 8 digitos ');
          return
        }
      } 
    },
    searchUser(){
       this.$http.get("http://localhost:8080/api/v1/usuario/getAll").then
        (function(data) {
          alert("Usuario Pesquisado");
          this.users = data.body;
        },
        error => {
          alert("Usuario não procurado");
          console.error(error.data);
        });
    }
  },
  
};
</script>

<style>
.material-icons:hover{
  color: #fa4c05;
}
.material-icons{
  color: #365c7b;
}
.align-c {
  margin-left: 15%;
}
.spaceUp {
  padding-top: 20px;
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
.fullCool{
  width: 100%;
}
</style>

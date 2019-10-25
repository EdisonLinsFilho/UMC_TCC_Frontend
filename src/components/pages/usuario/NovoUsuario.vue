<template>
    <div class="container">
      <form>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="campo1">Status </label>
            <select
              type="text"
              class="form-control"
              v-model="user.status"
              aria-selected="Selecione uma opção..."
            >
              <option disabled selected>Selecione uma opção...</option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
             
            </select>
          </div> 
          <div class="form-group col-md-6">
            <label for="campo1">Cargo </label>
            <cool-select
              v-model="user.acesso"
              :items="entidade"
              placeholder="Pesquise o Cargo do Usuario"
            /> 
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
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      </container>
    </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import { log } from "util";
export default {
  data() {
    return {
      entidade: ['COORDENADOR', 'PROFESSOR', 'MONITOR'],
      selectedProfessor: "",
      confirmaSenha: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      user: {
        status: "",
        email: "",
        acesso: "",
        senha: "",
        rgm: "",
      }
    };
  },
  methods: {
    
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
            this.$http.post("http://localhost:8080/api/v1/umc/user", this.user).then(
              () => {
                alert("Novo usuario Registrado");
                this.resetFields();
              },
              error => {
                alert("Usuario não foi salvo");
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
    resetFields() {
      (this.user.status = ""),
      (this.user.email = ""),
      (this.user.acesso = ""),
      (this.user.senha = ""),
      (this.user.rgm = ""),
      (this.user.numeroTelefone = ""),
      (this.confirmaSenha = "");
    },
 
  },
  components: {  
      CoolSelect,
      
  }
  
};

</script>

<style scoped>
.input-align {
  margin-top: 5.5%;
}
.container {
  padding: 15px;
}
.sour-tar {
  background-color: #e9ecef;
  color: #6b757d;
  height: 20px;
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
}
.rightalign {
  margin-top: 3%;
}

.form-align {
  margin-bottom: -20px;
}
</style>
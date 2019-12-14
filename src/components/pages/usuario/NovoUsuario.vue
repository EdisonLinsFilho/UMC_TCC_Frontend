<template>
    <div class="container">
      <form>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="campo1">Nome </label>
            <font color="red">*</font>
            <input type="text" maxlength="30" class="form-control" v-model="user.nome" placeholder="Digite o Nome do Usuario"  />
          </div>
          <div class="form-group col-md-12">
            <label for="campo1">Cargo </label>
            <font color="red">*</font>
            <select
              class="custom-select my-1 mr-sm-2"
              v-model="user.acesso"
            >
              <option disabled selected>Selecione uma opção...</option>
              <option value="COORDENADOR">Coordenador</option>
              <option value="PROFESSOR">Professor</option>
              <option value="MONITOR">Monitor</option>
            </select>
          </div>
          <div class="form-group col-md-12">
            <label for="campo1">E-mail </label>
            <font color="red">*</font>
            <input type="text" maxlength="30" class="form-control" v-model="user.email" placeholder="Digite o E-mail do Usuario"  />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="campo1">Senha </label>
            <font color="red">*</font>
            <input type="password" maxlength="20" class="form-control" v-model="user.senha" placeholder="A senha deve Conter: Caracteres Especiais, Maiusculos e numeros "  />
          </div>
        
          <div class="form-group col-md-6">
            <label for="campo1">Repetir Senha </label>
            <font color="red">*</font>
            <input type="password" maxlength="20" class="form-control" v-model="confirmaSenha" placeholder="Digite a senha digitada anteriormente"  />
          </div>    
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="campo1">RGM </label>
            <font color="red">*</font>
            <input type="text" maxlength="11" class="form-control" v-mask="'###########'" v-model="user.rgm" placeholder="Digite o RGM do Novo Usuario"  />
          </div>   
        </div>
      </form>
      <div>
        <button type="button" class="btn btn-primary btn-umc" v-on:click="saveUser()">Salvar</button>
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      </div>
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
        nome: "",
        acesso: "",
        email: "",
        rgm: "",
        senha: "",
        status: "ACTIVE",
      }
    };
  },
  methods: {
    
    saveUser() {
      if (this.user.nome == "") {
        alert("Preenchimento do nome é obrigatorio");
        return;
      }
      if (this.user.acesso == "") {
        alert("Preenchimento do cargo é obrigatorio");
        return;
      }
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
                this.resetFields();
                alert('Usuário Cadastrado !')
              },
              error => {
                console.error(error.data);
                alert('Dados Duplicados, favor verificar todos os campos !')
              }
            );

            localStorage.setItem('usuarioNovo', 1);
          }
        } else {
          alert('Sua senha deve conter pelo menos: \n - Um Caracter Maiusculo \n - Um Caracter Minusculo \n - Um Caracter Especial Ex: @ \n - Um Numero \n - Maior que 8 digitos ');
          return
        }
      } 
      if (this.user.rgm == "") {
        alert("Preenchimento do Rgm é obrigatorio");
        return;
      }
      

    },
    resetFields() {
      (this.user.nome = ""),
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
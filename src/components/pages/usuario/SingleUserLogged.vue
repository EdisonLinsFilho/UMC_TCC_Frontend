<template>
  <div class="main"> 
    <div class="row">
      <div class="form-group col-md-6">
        <label for="user-Skype">Nome</label>
        <input
        type="text"
        class="form-control"
        placeholder="Digite seu nome"
        v-model="user.nome ">
      </div>
      <div class="form-group col-md-6">
        <label for="user-cell">RGM</label>
        <input
          v-model="user.rgm"
          type="txt"
          class="form-control item"
          v-mask="'###########'"
          id="user-rgm"
          placeholder="Digite seu Registro de matricula"> 
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="user-password">Senha</label>
        <input 
          v-model="user.senha" 
          type="password" 
          class="form-control" 
          id="user-password"
          placeholder="Digite sua senha">
      </div>
      <div class="form-group col-md-6">
        <label >Confirmar senha</label>
        <input 
          v-model="confirmaSenha"
          class="form-control"
          type="password"
          placeholder="Digite sua senha novamente"> 
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="user-email">Email</label>
        <input
          v-model="user.email"
          type="text"
          class="form-control"
          placeholder="nome@exemplo.com"
          >
      </div>
      <div class="form-group col-md-6">
        <label for="user-slack">Cargo</label>
        <select class="custom-select my-1 mr-sm-2" disabled v-model="user.acesso">
            <option value="COORDENADOR">Coordenador</option>
            <option value="PROFESSOR">Professor</option>
            <option value="MONITOR">Monitor</option>
          </select>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <button class="btn blue-button" @click.prevent="saveEdits()">
          Salvar
          <i class="material-icons">done</i>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmaSenha: "",
      id: this.$route.params.id,
      sourLang: "",
      tarLang: "",
      user: {
        nome: "",
        acesso: "",
        status: "ACTIVE",
        email: "",
        senha: "",
        rgm: ""
        },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  methods: {
    saveEdits() {
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
           
            this.$http.post("http://localhost:8080/api/v1/usuario/saveOrUpdate",this.user).then( () => {
              alert('Usuario Atualizado !');
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
   
    addLangPair() {
      this.user.language_pairs.push({
        source: this.sourLang,
        target: this.tarLang
      });
      this.sourLang = "";
      this.tarLang = "";
    },
    remLangPair(index) {
      this.user.language_pairs.splice(index, 1);
    },
  },

  mounted() {
    this.user.rgm = localStorage.getItem('logInid');
    this.user.acesso = localStorage.getItem('loggedAccess');
    this.user.nome = localStorage.getItem('usuarioNome');
    this.user.email = localStorage.getItem('usuarioEmail');
    this.user.id = localStorage.getItem('usuarioId');
    this.user.senha = localStorage.getItem('usuarioSenha');
    this.confirmaSenha = this.user.senha;

  }
};
</script>

<style scoped>
.user-skype {
  margin-top: 15px;
}

.material-icons {
  cursor: pointer;
}
.sour-tar {
  margin-top: 0;
  background-color: #e9ecef;
  color: #6b757d;
  height: 101px;
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
}
.coin {
  width: 195%;
  margin-top: 0px;
  margin-left: -14px;
}
.email {
  margin-top: 2%;
}
.img-thumbnail {
  max-width: 110%;
  max-height: 110%;
}
.main h1 {
  display: inline-block;
  margin-left: 2%;
}
.header {
  text-align: initial;
}
.user-data {
  margin-top: 10%;
  margin-left: 1%;
}
.user-password {
  margin-top: 2%;
}
.edit-single-user {
  vertical-align: middle;
  color: transparent;
}
.edit {
  margin-top: 48%;
  width: 70%;
  height: 40px;
}

.edit:hover i {
  color: #2871be;
}
.col-align {
  height: 100px;
}
.trash {
  margin-top: 8px;
}
</style>


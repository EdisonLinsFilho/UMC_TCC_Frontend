<template>
  <div class="main">
    <div class="row">
      <div class="col-10 col-align">
        <h1>{{ user.name }}</h1>
      </div>
      <div class="col-2">
        <button class="btn blue-button" @click.prevent="saveEdits()">
          Salvar
          <i class="material-icons">done</i>
        </button>
      </div>
    </div>

    <hr>
    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <label for="user-email">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="user-email"
            placeholder="name@example.com"
          >
        </div>
      </div>
      <div class="col-5">
        <div class="form-group">
          <label for="user-password">Senha</label>
          <input 
          v-model="user.senha" 
          type="password" 
          class="form-control" 
          id="user-password"
          placeholder="Digite sua senha"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <label for="user-cell">RGM</label>
          <input
            v-model="user.phone_number"
            type="txt"
            class="form-control item"
            v-mask="'###########'"
            id="user-rgm"
            placeholder="Registro de matricula"
          >
        </div>
      </div>

      <div class="col-5">
        <div class="form-group ">
          <label >Confirmar senha</label>
          <input 
          v-model="user.confirmaSenha"
          class="form-control"
          type="password"
          placeholder="Digite sua senha novamente">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="user-slack">
          <label for="user-slack">Cargo</label>
          <input
            type="text"
            class="form-control"
            id="user-cargo"
            v-model="user.slack_id "
            disabled
          >
        </div>
        <div class="user-skype">
          <label for="user-Skype">Nome</label>
          <input
            type="text"
            class="form-control"
            id="user-nome"
            placeholder="Digite seu nome"
            v-model="user.skype_id "
          >
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      sourLang: "",
      tarLang: "",
      user: {},
      languages: ["PT-BR", "ENG-US", "ESP", "RUSS", "GER", "JP", "KOR"]
    };
  },
  methods: {
    saveEdits() {
      if(this.user.senha != this.user.confirmaSenha){
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
    saveEdits() {
      this.$http
        .put("http://localhost:8080/miniworks/user", this.user)
        .then(function() {
          alert("Changes were saved");
        });
    }
  },

  mounted() {
    this.$http
      .get("http://localhost:8080/miniworks/user/" + this.id)
      .then(function(data) {
        this.user = data.body;
      });
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
  color: #fa4c05;
}
.col-align {
  height: 100px;
}
.trash {
  margin-top: 8px;
}
</style>


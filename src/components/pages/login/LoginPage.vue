<template>
  <div class="container-fluid loginscreen">
    <!-- Just a basic login screen -->
    <div class="img-logo">
      <img src="../../../assets/landing-logo.png">
    </div>
    <hr>
    <form>
      <h5>Bem Vindo!</h5>
      <div class="form-group">
        <label>E-mail:</label>
        <input
          required
          class="form-control"
          type="text"
          name="user-mail"
          v-model="inputMail"
          placeholder="usuario@email.com"
        >
      </div>
      <div class="form-group">
        <label>Senha:</label>
        <input
          required
          class="form-control"
          type="password"
          name="user-pass"
          v-model="inputSenha"
          placeholder="Senha"
        >
      </div>

      <div class="row">
        <div class="col">
          <button class="btn blue-button" @click.prevent="login()">
            <template v-if="loading">
              Entrando...
            </template>
            <template v-else>
              Enviar
              <i class="material-icons">input</i>  
            </template>
          </button>


        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props:{
    logon: "",
  },
  data() {
    return {
      interval: null,
      loading: false,
      inputMail: "",
      inputSenha: "",
      user: [],
    };
  },

  methods: {
    login() {
      this.loading = true;

      if(this.inputSenha != "" && this.inputMail != "" ){

        let login = {
          email : this.inputMail,
          senha : this.inputSenha
        }

        this.$http.post("http://localhost:8080/api/v1/usuario/authenticate", login).then(
          function(data) {
            if(data.body == null){
              alert('Usuario não encontrado !');
            } else {
              alert('Usuario logado !');
              this.user = data.body;
              
              localStorage.setItem('logIn', 1);
              localStorage.setItem('logInid', this.user.rgm);
              localStorage.setItem('loggedAccess', this.user.acesso);
              
              this.$emit('logIn', 1)

            }

           
          },
          error => {
            console.error(error.data);
            alert('Usuário Inválido !');
          }
        ); 

      } else {
        alert("Todos os campos são obrigatórios.");
      }

      this.loading = false;

    },

  },
  created(){
    //this.verificarLogin();
  },
  beforeDestroy(){
    //clearInterval(this.interval)
  }
  
};
</script>

<style scoped>
.loginscreen {
  display: inline-block;
}

.img-logo {
  margin: 0 auto;
  text-align: center;
}

img {
  width: 200px;
}

.right button {
  float: right;
}

.remempass {
  margin-top: 16px;
}
</style>

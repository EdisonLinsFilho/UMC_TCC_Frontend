<template>
  <div class="container-fluid loginscreen">
    <!-- Just a basic login screen -->
    <div class="img-logo">
      <img src="../../../assets/landing-logo.png">
    </div>
    <hr>
    <form>
      <div align="center"><h5>Bem Vindo!</h5>
    </div>
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
        <button type="button" class="esqueciSenha" @click="showSendMail()">Esqueci Minha Senha</button>

        </div>
        
      </div>
      
    <modal name="mandaEmail" height="auto">
      <div class="borda">
        <div class="row spaceLeft">
          <div class="form-group col-md-12">
            <label>Email</label>
          <input type="text" v-model="emailRecuperacao" class="form-control"/>
          </div>
        </div>
        <br />
        <div align="center">
          <button type="button" class="btn blue-button" @click="sendMail()">Enviar</button>
        </div>
      </div>
    </modal>
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
      user: {},
      emailRecuperacao: "",
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
            this.user = data.body;
            
            localStorage.setItem('logIn', 1);
            localStorage.setItem('logInid', this.user.rgm);
            localStorage.setItem('loggedAccess', this.user.acesso);
            localStorage.setItem('usuarioNome', this.user.nome);
            localStorage.setItem('usuarioEmail', this.inputMail);
            localStorage.setItem('usuarioId', this.user.id);
            localStorage.setItem('usuarioSenha', this.inputSenha);
            this.$emit('logIn', 1);

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
    showSendMail(){
      this.$modal.show("mandaEmail");
    },
    sendMail(){
      

      var envio = new FormData(); 
      envio.append('email', this.emailRecuperacao);
      this.$http.post("http://localhost:8080/api/v1/usuario/sendMail", envio).then(
        function(data) {
          this.$modal.hide("mandaEmail");
          alert("Email enviado!");
        },
        error => {
          console.error(error.data);
        });
    }

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

.esqueciSenha{
  color: blue;
  border: 0ch;
  background-color: transparent;
  cursor: pointer;
  font-size: 10pt;
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

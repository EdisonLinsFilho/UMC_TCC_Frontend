<template>
  <div class="container-fluid loginscreen">
    <!-- Just a basic login screen -->
    <div class="img-logo">
      <img src="../../../assets/landing-logo.png">
    </div>
    <hr>
    <form>
      <h5>Welcome! Please log-in!</h5>
      <div class="form-group">
        <label>E-mail:</label>
        <input
          class="form-control"
          type="email"
          name="user-mail"
          v-model="inputMail"
          placeholder="email@provider.com"
        >
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          class="form-control"
          type="password"
          name="user-pass"
          v-model="inputPass"
          placeholder="Password"
        >
      </div>

      <div class="row">
        <div class="col left">
          <button class="btn blue-button" @click.prevent="login()">Send</button>
          <div class="form-group remempass">
            <input type="checkbox" name="rememberPass" id="remPass">
            <label for="checkbox">Remember password?</label>
          </div>
        </div>
        <div class="col right">
          <div class="form-group">
            <button class="btn blue-button" @click.prevent="alertForgot()">Forgot my password</button>
          </div>
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
      inputMail: "",
      inputPass: "",

      users: [],
    };
  },

  methods: {
    login() {
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.inputMail == this.users[i].email &&
          this.inputPass == this.users[i].password
        ) {
          this.logon = 1;
          this.$emit("logIn", this.logon);
          this.$emit("logInid", this.users[i].id);
          this.$emit("loggedAccess", this.users[i].access);
        }
      }
      if (this.logon == 0) {
        alert("Invalid mail or password");
      }
    },
    alertForgot() {
      alert("Please contact an adm at vendors@bureautranslations.com");
    },

    
  },
  created() {
    this.$http
      .get("http://localhost:8080/miniworks/users")
      .then(function(data) {
        this.users = data.body;
        console.log(data);
      });
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

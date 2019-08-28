<template>
  <div>
    <div class="container">
      <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Nome:</span>
          </div>
          <input type="text" class="form-control" placeholder="Nome do usuario" v-model="user.name" />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Email:&nbsp;</span>
          </div>
          <input type="text" class="form-control" placeholder="Email do usuario" v-model="user.email" />
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Senha:</span>
          </div>
          <input type="text" class="form-control" placeholder="Senha do usuario" v-model="user.password" />
        </div>
        <!-- TODO validação de senha -->

      </form>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        role: "",
        password: "",
        rgm: "",
        phoneNumber: ""
      }
    };
  },
  methods: {
    resetFields() {
      (this.user.name = ""),
        (this.user.email = ""),
        (this.user.role = ""),
        (this.user.password = ""),
        (this.user.rgm = ""),
        (this.user.phoneNumber = "");
    },

    newUser() {
      this.$http.post("http://localhost:8080/api/v1/umc/user", this.user).then(
        () => {
          alert("New user registred");
          this.resetFields();
        },
        error => {
          alert("User can't be saved");
          console.error(error.data);
        }
      );
    }
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
<template>
  <div class="container-fluid">
    <!-- SearchBar -->
    <div class="row">
      <div class="form-group col-md-10">
        <input
          v-on:keyup="searchUserByName()"
          type="text"
          class="form-control"
          v-model="nomeParaPesquisa"
          placeholder="Digite o Nome do Usuario"
        />
      </div>
      <div class="form-group col-md-2">
        <button type="button" class="btn btn-primary btn-umc" @click="clearAll(); ">Limpar</button>
      </div>
    </div>
    <!-- Template Output da busca -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user ,i) in users" :key="i">
            <td>{{user.nome}}</td>
            <td>{{user.acesso}}</td>
            <td width="14%" align="right">
              <div class="material-icons" @click="show(user.id)">
                <i class="material-icons">search</i>
              </div>
              <Div class="material-icons" @click="showEdit(user.id)">
                edit
              <span></span>
              <i></i>
              </div>
              <span class="trash" @click="confirmDelete(user.id)">
                <span></span>
                <i></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- PopUp -->
    <modal name="allPageDisbled" height="auto">
      <div class="modal-header">
        <h4>Resumo Usuario</h4>
      </div>
      <div class="borda">
        <br />
        <div class="form-group col-md-12">
          <label>Nome</label>
          <input type="text" v-model="usuario.nome" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>RGM</label>
          <input type="text" v-model="usuario.rgm" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>E-mail</label>
          <input type="text" v-model="usuario.email" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Cargo</label>
          <select class="custom-select my-1 mr-sm-2" v-model="usuario.acesso">
            <option disabled value="COORDENADOR">Coordenador</option>
            <option disabled value="PROFESSOR">Professor</option>
            <option disabled value="MONITOR">Monitor</option>
          </select>
        </div>
      </div>
    </modal>

    <modal name="allPageEdit" height="auto">
      <div class="modal-header">
        <h4>Usuario</h4>
      </div>
      <div class="borda">
        <br />
        <div class="form-group col-md-12">
          <label>Nome</label>
          <input
            type="text"
            v-model="usuario.nome"
            class="form-control"
            placeholder="Nome do Usuario"
          />
        </div>
        <div class="form-group col-md-12">
          <label>RGM</label>
          <input
            type="text"
            v-mask="'###########'"
            v-model="usuario.rgm"
            class="form-control"
            placeholder="RGM do Usuario"
          />
        </div>
        <div class="form-group col-md-12">
          <label>E-mail</label>
          <input
            type="text"
            v-model="usuario.email"
            class="form-control"
            placeholder="Email do Usuario"
          />
        </div>
        <div class="form-group col-md-12">
          <label>Cargo</label>
          <select class="custom-select my-1 mr-sm-2" v-model="usuario.acesso">
            <option disabled selected>Selecione uma opção...</option>
            <option value="COORDENADOR">Coordenador</option>
            <option value="PROFESSOR">Professor</option>
            <option value="MONITOR">Monitor</option>
          </select>
        </div>
        <div align="center">
          <button type="button" class="btn btn-link fullLine" @click="clearModalEdit()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveEdit()">Salvar</button>
        </div>
      </div>
    </modal>

    <modal name="confirmDelete" height="auto">
      <div class="borda">
        <br />
        <p class="size" align="center">Deseja realmente excluir ?</p>
        <div align="center">
          <button type="button" class="btn btn-link fullLine" @click="hideDelete()">Cancelar</button>
          <button type="button" class="btn btn-primary fullLine" @click="saveDelete()">Sim</button>
        </div>
      </div>
    </modal>
    <!-- PopUp -->
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
export default {
  data() {
    return {
      interval: null,
      nomeParaPesquisa: "",
      rgmParaPesuisa: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      uName: "",
      confirmaSenha: "",
      users: [],
      usuario: [
        {
          nome: "",
          acesso: "",
          status: "",
          email: "",
          senha: "",
          rgm: ""
        }
      ],
      userNull: {
        nome: "",
        acesso: "",
        status: "ACTIVE",
        email: "",
        senha: "",
        rgm: ""
      }
    };
  },
  beforeResolve() {
    alert("mounted");
  },
  components: {
    CoolSelect
  },
  methods: {
    clearAll() {
      this.nomeParaPesquisa = "";
      this.searchUser();
    },
    show(userBD) {
      this.$http.get("http://localhost:8080/api/v1/usuario/" + userBD).then(
        function(data) {
          this.usuario = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
      this.isEdit = "true";
      this.$modal.show("allPageDisbled");
    },
    showEdit(userBD) {
      this.$http.get("http://localhost:8080/api/v1/usuario/" + userBD).then(
        function(data) {
          this.usuario = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
      this.isEdit = "false";
      this.$modal.show("allPageEdit");
      //Recebendo os campos do BE
    },
    confirmDelete(userBD) {
      this.$http.get("http://localhost:8080/api/v1/usuario/" + userBD).then(
        function(data) {
          this.usuario = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
      this.$modal.show("confirmDelete");
    },
    hideDelete() {
      this.$modal.hide("confirmDelete");
    },
    clearModalEdit() {
      (this.usuario.nome = ""),
        (this.usuario.email = ""),
        (this.usuario.acesso = ""),
        (this.usuario.senha = ""),
        (this.usuario.rgm = ""),
        (this.confirmaSenha = "");
    },
    saveEdit() {
      // Validar Senha
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;

      if (this.reg.test(this.usuario.email) == false) {
        alert("Email invalido !");
        return;
      } else {
        this.$http
          .post(
            "http://localhost:8080/api/v1/usuario/saveOrUpdate",
            this.usuario
          )
          .then(
            () => {
              this.$modal.hide("allPageEdit");
              this.searchUser();
            },
            error => {
              console.error(error.data);
            }
          );
      }
    },
    searchUser() {
      this.$http.get("http://localhost:8080/api/v1/usuario/getAll/active").then(
        function(data) {
          this.users = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
    },
    saveDelete() {
      this.$http
        .post("http://localhost:8080/api/v1/usuario/delete", this.usuario)
        .then(
          () => {
            this.hideDelete();
            this.searchUser();
          },
          error => {
            console.error(error.data);
          }
        );
    },
    searchUserByName() {
      if (this.nomeParaPesquisa != "" && this.nomeParaPesquisa.length > 2) {
        this.$http
          .get(
            "http://localhost:8080/api/v1/usuario/getByName/" +
              this.nomeParaPesquisa
          )
          .then(
            function(data) {
              this.users = data.body;
            },
            error => {
              console.error(error.data);
            }
          );
      } else {
        this.searchUser();
      }
    },
    verificarNovoUsuario() {
      this.interval = setInterval(
        function() {
          var check = localStorage.getItem("usuarioNovo");
          if (check == 1) {
            this.searchUser();
            localStorage.setItem("usuarioNovo", 0);
          }
        }.bind(this),
        1500
      );
    }
  },
  created() {
    this.searchUser();
    this.verificarNovoUsuario();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style>
.material-icons:hover {
  cursor: pointer;
  color: #2871be;
}
.material-icons {
  color: #365c7b;
}
.align-c {
  margin-left: 15%;
}
.spaceUp {
  padding-top: 20px;
}
.openn {
  background-color: transparent;
  border-radius: 0px;
  padding: 0;
  border: none;
}
.editt {
  background-color: transparent;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.deletee {
  background-color: transparent;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.borda {
  border: 1px solid black;
}
.size {
  font-size: 25px;
}
.fullCool {
  width: 100%;
}
</style>

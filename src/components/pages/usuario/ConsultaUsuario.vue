<template>
  <div class="container-fluid">
    <!-- SearchBar -->
    <div class="row">
      <div class="form-group col-md-5">
        <input
          type="text"
          class="form-control"
          v-model="nomeParaPesquisa"
          placeholder="Digite o Nome do Usuario"
        />
      </div>
      <div class="form-group col-md-5">
        <cool-select
          v-model="cargoParaPesuisa"
          :items="entidade"
          placeholder="Pesquise o Cargo do Usuario"
        />
      </div>
      <div class="form-group col-md-2">
        <button type="button" class="btn btn-primary" v-on:click="searchUser()">Pesquisar</button>
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
              <button type="button" class="btnTable open" @click="show(user.id)">
                <i class="material-icons">search</i>
              </button>
              <button type="button" class="btnTable edit" @click="showEdit(user.id)">Editar</button>
              <button type="button" class="btnTable delete" @click="confirmDelete(user.id)">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- PopUp -->
    <modal name="allPageDisbled" height="auto">
      <div class="borda">
        <br />
        <div class="input-group mb-3">
          <input type="text" v-model="usuario.nome" class="form-control" disabled />
        </div>
        <div class="input-group mb-3">
          <input type="text" v-model="usuario.email" class="form-control" disabled />
        </div>
        <div class="input-group mb-3">
          <select class="custom-select my-1 mr-sm-2" v-model="usuario.acesso">
            <option disabled value="COORDENADOR">Coordenador</option>
            <option disabled value="PROFESSOR">Professor</option>
            <option disabled value="MONITOR">Monitor</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <input type="text" v-model="usuario.rgm" class="form-control" disabled />
        </div>
      </div>
    </modal>

    <modal name="allPageEdit" height="auto">
      <div class="borda">
        <br />
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="usuario.nome"
            class="form-control"
            placeholder="Nome do Usuario"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="usuario.email"
            class="form-control"
            placeholder="Email do Usuario"
          />
        </div>
        <div class="input-group mb-3">
          <select class="custom-select my-1 mr-sm-2" v-model="usuario.acesso">
            <option disabled selected>Selecione uma opção...</option>
            <option value="COORDENADOR">Coordenador</option>
            <option value="PROFESSOR">Professor</option>
            <option value="MONITOR">Monitor</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            v-mask="'###########'"
            v-model="usuario.rgm"
            class="form-control"
            placeholder="RGM do Usuario"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            v-model="usuario.senha"
            class="form-control"
            placeholder="Senha do Usuario"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            v-model="confirmaSenha"
            placeholder="Digite a Senha novamente"
            class="form-control"
          />
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
          <button type="button" class="btn btn-primary fullLine" @click="saveDelete(usuario.id)">Sim</button>
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
      nomeParaPesquisa: "",
      cargoParaPesuisa: "",
      entidade: ["Professor", "Coordenador", "Monitor"],
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
        rgm: "",
        cargo: ""
      }
    };
  },

  components: {
    CoolSelect
  },

  created() {
    this.searchUser();
  },

  methods: {
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
      this.confirmaSenha = this.user.senha;
      //Recebendo os campos do BE
    },
    confirmDelete(userBD) {
      // Provavel erro
      this.$http.get("http://localhost:8080/api/v1/usuario/" + userBD).then(
        function(data) {
          this.usuario = data.body;
        },
        error => {
          console.error(error.data);
        }
      );
      this.$modal.show("confirmDelete");
      this.id = id;
      this.usuario = userBD;
    },
    hideDelete() {
      this.$modal.hide("confirmDelete");
    },
    clearModalEdit() {
      (this.user.nome = ""),
        (this.user.email = ""),
        (this.user.cargo = ""),
        (this.user.senha = ""),
        (this.user.rgm = ""),
        (this.user.numeroTelefone = ""),
        (this.confirmaSenha = "");
    },
    saveEdit() {
      if (this.usuario.senha != this.confirmaSenha) {
        alert(
          "Confirmação de Senha Invalida ! \n A senha nos dois campos devem ser iguais !"
        );
        return;
      } else {
        // Validar Senha
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if (
          this.usuario.senha.match(lowerCaseLetters) &&
          this.usuario.senha.match(upperCaseLetters) &&
          this.usuario.senha.match(numbers) &&
          this.usuario.senha.length >= 8
        ) {
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
                  alert("Salvado");
                  this.$modal.hide("allPageEdit");
                },
                error => {
                  console.error(error.data);
                }
              );
          }
        } else {
          alert(
            "Sua senha deve conter pelo menos: \n - Um Caracter Maiusculo \n - Um Caracter Minusculo \n - Um Caracter Especial Ex: @ \n - Um Numero \n - Maior que 8 digitos "
          );
          return;
        }
      }
    },
    searchUser() {
      this.$http.get("http://localhost:8080/api/v1/usuario/getAll").then(
        function(data) {
          this.users = data.body;
        },
        error => {
          alert("Usuario não procurado");
          console.error(error.data);
        }
      );
    },
    saveDelete() {
      this.$http
        .post("http://localhost:8080/api/v1/usuario/delete", usuario)
        .then(
          () => {
            alert("Passou");
          },
          error => {
            console.error(error.data);
          }
        );
    }
  }
};
</script>

<style>
.material-icons:hover {
  color: #fa4c05;
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
.open {
  background-color: greenyellow;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.edit {
  background-color: blue;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.delete {
  background-color: red;
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

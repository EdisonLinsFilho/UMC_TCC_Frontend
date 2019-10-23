<template>
  <div class="main">
    <!-- User page header, contains the image and the name of an user. -->
    <div class="header">
      <div class="row">
        <div class="col-10 col-align">
          <img class="img-thumbnail" src="#" alt="imagem do usuario">
          <h1>{{ user.name }}</h1>
        </div>
        <div class="col-2">
          <button
            class="btn blue-button"
            @click="disabled = (disabled + 1) % 2; toggleDisable(); saveEdits();"
          >
            {{disText}}
            <i class="material-icons edit-single-user">{{disIcon}}</i>
          </button>
        </div>
      </div>
    </div>
    <hr>

    <!-- Input part of the page. -->
    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <label for="user-email">Email address</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="user-email"
            placeholder="name@example.com"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>
      <div class="col-5">
        <div class="form-group">
          <label for="user-password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="user-password"
            placeholder="Password"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="form-group">
          <label for="user-cell">Phone:</label>
          <input
            v-model="user.phone_number"
            type="text"
            class="form-control item"
            id="phone-number"
            placeholder="Numbers only, exemple: +1 305 555-1234"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>

      <div class="col-5">
        <div class="form-group col-md-3">
          <label for="user-currency" class="coin">Currency</label>
          <select
            v-model="user.currency"
            id="inputState"
            class="form-control coin"
            placeholder="Currency"
            :disabled="disabled == 1 ? true : false"
          >
            <option>BRL</option>
            <option>EUR</option>
            <option>DOLL</option>
            <option>LIBR</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="form-group user-slack">
          <label for="user-slack">Slack Handle</label>
          <input
            v-model="user.slack_id"
            type="text"
            class="form-control"
            id="user-slack"
            placeholder="Slack name"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
        <div class="form-group user-skype">
          <label for="user-Skype">Skype Id</label>
          <input
            v-model="user.skype_id"
            type="text"
            class="form-control"
            id="user-Skype"
            placeholder="Skype account"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>

      <!-- Table that outputs, adds and removes the source and target languages from the user langP array. -->
      <div class="col-5">
        <label for="langTable">Languages table</label>
        <table class="table table-hover sour-tar">
          <thead>
            <tr>
              <th>Source</th>
              <th></th>
              <th>Target</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pair, i) in user.language_pairs" :key="i">
              <td>{{pair.source}}</td>
              <td>></td>
              <td>{{pair.target}}</td>
              <td>
                <span class="trash" @click="remLangPair(user.language_pairs.indexOf(pair))">
                  <span></span>
                  <i></i>
                </span>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr class="add-new-p">
              <th>
                <div class="form-group">
                  <select
                    class="form-control"
                    id="source"
                    v-model="sourLang"
                    :disabled="disabled == 1 ? true : false"
                  >
                    <option v-for="language in languages" :key="language">{{language}}</option>
                  </select>
                </div>
              </th>
              <th></th>
              <th>
                <div class="form-group">
                  <select
                    class="form-control"
                    id="target"
                    v-model="tarLang"
                    :disabled="disabled == 1 ? true : false"
                  >
                    <option v-for="lang2 in languages" :key="lang2">{{lang2}}</option>
                  </select>
                </div>
              </th>
              <th class="align-icon">
                <button
                  class="add-button"
                  @click="addLangPair()"
                  :disabled="disabled == 1 ? true : false"
                >
                  <i class="material-icons add-icon">add_circle</i>
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: 1,
      disText: "Edit",
      disIcon: "edit",
      id: this.$route.params.id,

      sourLang: "",
      tarLang: "",

      user: {},

      languages: ["PT-BR", "ENG-US", "ESP", "RUSS", "GER", "JP", "KOR"]
    };
  },
  methods: {
    // Asthetic change
    toggleDisable() {
      if (this.disabled == 0) {
        this.disText = "Save";
        this.disIcon = "done";
      } else {
        this.disText = "Edit";
        this.disIcon = "edit";
      }
    },

    // Add and remove a src and tgt language to the langP array, linked to user.
    addLangPair() {
      this.user.language_pairs.push({
        source: this.sourLang,
        target: this.tarLang
      });
      this.sourLang = "";
      this.tarLang = "";
    },
    remLangPair(index) {
      if (this.disabled == 0) {
        this.user.language_pairs.splice(index, 1);
      }
    },
    saveEdits() {
      if (this.disabled == 1) {
        this.$http
          .put("http://localhost:8080/miniworks/user", this.user)
          .then(function() {
            alert("Changes were saved");
          });
      }
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
.blue-button:disabled {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #495057;
}
.blue-button:disabled:hover .edit-single-user {
  color: #e9ecef;
}
.col-align {
  height: 100px;
}
.trash {
  margin-top: 8px;
  margin-left: 15%;
}
</style>


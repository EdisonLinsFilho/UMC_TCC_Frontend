<template>
  <div class="container-fluid">
    <div class="header">
      <div class="row">
        <div class="col">
          <h1>{{client.name}}</h1>
        </div>
        <div class="col">
          <button
            class="btn blue-button"
            @click="disabled = (disabled + 1) % 2; toggleDisable(); saveEdits()"
          >
            {{disText}}
            <i class="material-icons edit-single-user">{{disIcon}}</i>
          </button>
        </div>
      </div>
    </div>
    <hr>
    <div class="container body">
      <div class="row">
        <div class="col-5">
          <div class="form-group">
            <label for="clientmails">E-mail (s)</label>
            <table class="table table-hover sour-tar">
              <thead>
                <th v-if="0==1"></th>
              </thead>
              <tbody>
                <tr v-for="(email, i) in client.contact_person" :key="i">
                  <td>{{email.email}}</td>
                  <td>
                    <span
                      class="trash"
                      style="vertical-align: middle;"
                      @click="deleteMail(client.contact_person.indexOf(email))"
                    >
                      <span></span>
                      <i></i>
                    </span>
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr class="add-new-p">
                  <th>
                    <select class="form-control" v-model="newmail">
                      <option
                        v-for="(contact, i) in users"
                        :key="i"
                        v-show="contact.access == 'contact'"
                      >{{contact.name}}</option>
                    </select>
                  </th>
                  <th class="buttone">
                    <button
                      class="add-button"
                      @click.prevent="newMail()"
                      :disabled="disabled == 1 ? true : false"
                    >
                      <i class="material-icons add-icon">add_circle</i>
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="form-group">
            <label for="tax">Memo</label>
            <textarea
              type="text"
              class="form-control"
              v-model="client.memo"
              placeholder="Memo"
              :disabled="disabled == 1 ? true : false"
            />
          </div>
        </div>
        <div class="col-5">
          <div class="form-group">
            <label for="currency">Currency</label>
            <select
              class="form-control"
              v-model="client.currency"
              :disabled="disabled == 1 ? true : false"
            >
              <option v-for="option in currencies" :key="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tax">Taxpayer Id</label>
            <input
              type="text"
              v-model="client.taxpayer_id"
              class="form-control"
              placeholder="Tax id"
              :disabled="disabled == 1 ? true : false"
            >
          </div>
          <div class="form-group">
            <label for="tax">Country</label>
            <input
              type="text"
              v-model="client.country"
              class="form-control"
              placeholder="Country"
              :disabled="disabled == 1 ? true : false"
            >
          </div>
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

      newmail: "",
      disText: "Edit",
      disIcon: "edit",
      disabled: 1,

      currencies: ["BRL", "DOL", "LIB", "EUR"],

      client: {},
      users: {}
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
    newMail() {
      this.client.contact_person.push({
        email: this.newmail
      });
      this.newmail = "";
    },
    deleteMail(index) {
      if (this.disabled == 0) {
        this.client.contact_person.splice(index, 1);
      }
    },
    saveEdits() {
      if (this.disabled == 1) {
        this.$http
          .put("http://localhost:8080/miniworks/client", this.client)
          .then(function() {
            alert("Changes were saved");
          });
      }
    }
  },

  mounted() {
    this.$http
      .get("http://localhost:8080/miniworks/client/" + this.id)
      .then(function(data) {
        this.client = data.body;
      });
    this.$http.get("http://localhost:8080/miniworks/users").then(data => {
      this.user = data.body;
    });
  }
};
</script>

<style scoped>
.table-inpote {
  margin-top: 0;
}
.edit {
  float: right;
}
.sour-tar {
  background-color: #e9ecef;
  color: #6b757d;
  border: solid 1px #ced4da;
}
.add-button {
  background-color: transparent;
  border: none;
  cursor: copy;
}
.blue-button {
  float: right;
}
.buttone {
  padding: 0;
  vertical-align: middle;
}
.add-button:disabled {
  cursor: not-allowed;
}
.add-button i {
  color: #53bb2a;
  cursor: copy;
}
.add-button:disabled i {
  color: #6b757d;
  cursor: not-allowed;
}
.add-new-p {
  border: none;
}
</style>

<template>
  <div class="container-fluid">
    <!-- This page just add a new client to the base -->
    <form>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" v-model="client.name">
          </div>
          <div class="form-group">
            <label for="clientmails">E-mail (s)</label>
            <table class="table table-hover sour-tar">
              <thead>
                <th v-if="0==1"></th>
              </thead>
              <tbody>
                <tr v-for="(email,i) in client.contact_person" :key="i">
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
                    <select class="form-control" v-model="contact">
                      <option
                        v-for="(cli_contact, i) in users"
                        :key="i"
                        v-show="cli_contact.access == 'Contact'"
                      >
                      {{cli_contact.email}}</option>
                    </select>
                  </th>
                  <th class="buttone">
                    <button class="add-button" @click.prevent="newMail()">
                      <i class="material-icons add-icon">add_circle</i>
                    </button>
                  </th>
                  <th>
                    <router-link :to="'/users/new'">
                      <button class="btn blue-button ">
                          New User
                      </button>
                    </router-link>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="form-group">
            <label for="pais-origem">Country</label>
            <input type="text" class="form-control" v-model="client.country">
          </div>
          <div class="form-group">
            <label for="cnpj">Taxpayer ID:</label>
            <input type="text" class="form-control" v-model="client.taxpayer_id">
          </div>
          <div class="form-group">
            <label for="sobrenos">Memo:</label>
            <textarea type="text" class="form-control" v-model="client.memo"/>
          </div>
          <div class="form-group">
            <label for="currency">Currency:</label>
            <select class="form-control" v-model="client.currency">
              <option v-for="option in currencies" :key="option">{{ option }}</option>
            </select>
          </div>
          <button class="btn blue-button" @click.prevent="newCli()">Send</button>
          <router-link to="/clients">
            <button class="btn blue-button" @click="resetFields()">Cancel</button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact:{
      newmail: "",
      newname: "",
      },
      currencies: ["BRL", "DOL", "LIB", "EUR"],
      client: {
        name: "",
        contact_person: [],
        currency: "",
        taxpayer_id: "",
        country: "",
        memo: ""
      },
      users:{

      }
    };
  },
  methods: {
    newMail() {
      this.client.contact_person.push({
        email: this.contact.newmail,
        name: this.contact.newname,
        password: "1234",
      });
      // this.contact.newmail = "";
      // this.contact.newname = "";
    },
    deleteMail(index) {
      this.client.contact_person.splice(index, 1);
    },
    resetFields() {
      this.client.name = "";
      this.client.contact_person = [];
      this.client.currency = "";
      this.client.taxpayer_id = "";
      this.client.country = "";
      this.client.memo = "";
    },
    newCli() {
      this.$http
        .post("http://localhost:8080/miniworks/client", this.client)
        .then(function() {
          alert("New client registered");
          console.log(this.client);
          this.resetFields();
        });
    },
  },
  mounted(){
      this.$http.get("http://localhost:8080/miniworks/users").then(apiUsers => {
      this.users = apiUsers.body;
      });
        
      
    }
};
</script>
<style>

.sour-tar {
  background-color: #e9ecef;
  color: #6b757d;
  border: solid 1px #ced4da;
}
</style>

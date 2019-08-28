<template>
  <div>
    <div class="container">
      <form>
        <div class="row">
          <div class="col">
            <div class="client">
              <div class="form-group">
                <label for="client">Client</label>
                <select class="form-control clientRow" v-model="project.client">
                  <option v-for="(client, i) in clients" :key="i">{{client.name}}</option>
                </select>
              </div>
            </div>

            <div class="newClient">
              <router-link to="/clients/new">
                <button class="btn blue-button">
                  <i class="material-icons add-client">add</i>
                </button>
              </router-link>
            </div>

            <div class="form-group">
              <label for="contact">Contact Person</label>
              <div
                class="nested-mails"
                v-for="(client, i) in clients"
                :key="i"
                v-show="project.client == client.name"
              >
                <select class="form-control" v-model="project.contact_email">
                  <option v-for="(contact, i) in client.contact_person" :key="i">{{contact.email}}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="manager">Project Manager</label>
              <select class="form-control" v-model="project.project_manager">
                <option
                  v-for="(project_manager, i) in users"
                  :key="i"
                  v-show="project_manager.access == 'project_manager' "
                >{{project_manager.name}}</option>
              </select>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="radio">
                  <input type="radio" value="US" v-model="project.type_of_bureau">
                  <label>Bureau US</label>
                  <br>
                  <input type="radio" value="BR" v-model="project.type_of_bureau">
                  <label>Bureau BR</label>
                  <br>
                </div>

                <div class="time_zone">
                  <div class="form-group">
                    <label for="time_zone">Time_Zone</label>
                    <select class="form-control" v-model="project.time_zone">
                      <option v-for="(time,i) in time_zone" :key="i">{{time}}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-4">
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
                    <tr v-for="(pair, i) in project.language_pairs" :key="i">
                      <td>{{pair.source}}</td>
                      <td>></td>
                      <td>{{pair.target}}</td>
                      <td>
                        <span
                          class="trash"
                          @click="remLangPair(project.language_pairs.indexOf(pair))"
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
                        <div class="form-group">
                          <select class="form-control form-align" id="source" v-model="sourLang">
                            <option v-for="(language, i) in languages" :key="i">{{language}}</option>
                          </select>
                        </div>
                      </th>
                      <th></th>
                      <th>
                        <div class="form-group">
                          <select class="form-control form-align" id="target" v-model="tarLang">
                            <option v-for="(language, j) in languages" :key="j">{{language}}</option>
                          </select>
                        </div>
                      </th>
                      <th class="align-icon">
                        <button class="add-button" @click.prevent="addLangPair()">
                          <i class="material-icons add-icon">add_circle</i>
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div></div>
              </div>

              <div class="col-4">
                <label for="Linguist table">Linguists table</label>
                <table class="table table-hover ling-table">
                  <thead>
                    <th v-if="0==1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(linguist, y) in project.linguists" :key="y">
                      <td>{{linguist.name}}</td>
                      <td>
                        <span
                          class="trash"
                          style="vertical-align: middle;"
                          @click.prevent="deleteLinguist(project.linguists.indexOf(linguist))"
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
                        <select class="form-control" v-model="newlinguist">
                          <option
                            v-for="(linguist, i) in users"
                            :key="i"
                            v-show="linguist.access == 'linguist'"
                          >{{linguist.name}}</option>
                        </select>
                      </th>
                      <th class="buttone">
                        <button class="add-button" @click.prevent="addLings()">
                          <i class="material-icons add-icon">add_circle</i>
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div class="projstatus">
              <div class="form-group proj-status">
                <label for="status">Project Status</label>
                <select class="form-control" v-model="project.status">
                  <option selected>Preparing</option>
                  <option>Deleted</option>
                  <option>Cancelled</option>

                  <option>Approved</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <label for="check1">Services:</label>

                <div class="form-group" v-for="(service, i) in services1" :key="i">
                  <input type="checkbox" id="pettitservices" v-model="service.value">
                  <label>{{service.name}}</label>
                </div>
              </div>

              <div class="col-4">
                <label>Worflows:</label>

                <div class="form-group" v-for="(workflow, o) in workflows1" :key="o">
                  <input type="checkbox" id="pettitworkflow" v-model="workflow.value">
                  <label>{{workflow.name}}</label>
                </div>
              </div>
            </div>

            <div class="blue-button-new-project">
              <router-link :to="'/project/' ">
                <button class="btn blue-button" @click.prevent="newProject()">Create</button>
              </router-link>
              <router-link to="/projects">
                <button class="btn blue-button">Cancel</button>
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.container {
  padding: 15px;
  display: inline-block;
}
.pricelist {
  margin-right: 10px;
  width: 300px;
}
.time_zone {
  width: 300px;
}
.blue-button-new-project {
  display: block;
}
.projstatus {
  width: 250px;
}
.source {
  margin-right: 10px;
  width: 300px;
}
.target {
  width: 300px;
}

.clientRow {
  width: 970px;
}
.newClient {
  display: inline-block;
  margin-top: -3px;
  margin-left: 10px;
  width: 50px;
}
.client {
  display: inline-block;
}
.newClient i {
  vertical-align: middle;
}
.templateRow {
  width: 970px;
}
.buttone {
  padding: 0;
  vertical-align: middle;
}
.projectTitle {
  color: rgb(96, 125, 139);
}
.evento {
  margin-top: 20px;
}
.sour-tar {
  background-color: #f3f3f3;
  color: #6e6e6e;
  height: 20px;
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
}
.coin {
  margin-left: -14px;
}
.img-thumbnail {
  max-width: 13%;
  max-height: 13%;
}
.main h1 {
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
.trash {
  margin-top: 8px;
}

.allocation {
  width: 150px;
  height: 40px;
}

.vdatetime-input {
  border-style: double;
  background: white;
  display: inline-block;
  border-color: rgb(177, 177, 177);
  border-radius: 20px;
  margin-left: 10px;
  text-align: center;
}
.time {
  margin-left: 0px;
  display: inline-block;
}
.material-icons {
  color: #a3a4a5;
}
.cancelButton {
  background: rgb(165, 43, 43);
}
.cancelButton:hover {
  background: rgb(231, 118, 118);
}
.form-align {
  margin-bottom: -20px;
}
.apv {
  margin-left: 380px;
}
.srtg {
  margin-left: 25%;
}
.tempo1 {
  margin-left: 15%;
}
.projstatus {
  width: 200px;
  margin-left: 3%;
}
.edit-single-user {
  vertical-align: middle;
  color: transparent;
}
.blue-button:hover .edit-single-user {
  color: #fa4c05;
}
.total-cost {
  width: 42%;
  text-align: center;
}
.words {
  text-align: center;
}
.wordsTable {
  width: 20%;
  margin-left: 1.5%;
}

.botoes {
  margin-left: 30%;
}
.ediit {
  margin-right: 27%;
}
.wordsInput {
  height: 38px;
}
.cost-text {
  text-align: end;
}
.add-client {
  color: white;
}
.add-icon {
  color: rgb(0, 197, 26);
}
.proj-status {
  width: 300px;
  margin-left: -30px;
}
.ling-table {
  background-color: #f3f3f3;
  color: #6e6e6e;
  height: 20px;
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
  width: 100%;
}
</style>
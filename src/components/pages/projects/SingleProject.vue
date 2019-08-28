<template>
  <div class="main">
    <div class="row">
      <div class="col-10">
        <div class="projectTitle">
          <h4>
            Project
            <b>{{ project.name }}</b>
          </h4>
        </div>
      </div>
      <div class="col-2">
        <button
          class="btn blue-button editone"
          @click="disabled = (disabled + 1) % 2; toggleDisable(); saveState()"
          style="float: right;"
          v-if="project.status != 'Delivered' "
        >
          {{disText}}
          <i class="material-icons edit-single-user">{{disIcon}}</i>
        </button>
      </div>
    </div>
    <br>
    <br>
    <div class="row botoes">
      <div class="col-2">
        <div class="delivered">
          <input
            v-if="project.status == 'Approved' "
            type="button"
            class="btn blue-button delivered"
            @click="delivered()"
            value="Mark as delivered"
          >
        </div>
      </div>

      <div class="col-2 apv">
        <div class="approved">
          <input
            v-if="project.status != 'Approved' && project.status != 'Delivered' "
            type="button"
            class="btn blue-button approved"
            @click="approveProject() ;disabled = 1"
            value="Approve"
          >
        </div>
      </div>

      <div class="col-2 cncl">
        <div class="cancel">
          <router-link to="/projects">
            <input
              v-if="project.status != 'Approved' && project.status != 'Delivered' "
              type="button"
              class="btn blue-button cancelButton"
              value="Cancel"
              @click="cancel(); aprove = !aprove"
            >
          </router-link>
        </div>
      </div>
    </div>
    <hr>
    <br>

    <div class="row">
      <div class="col-3">
        <div class="form-group formNames">
          <input
            v-model="project.client"
            type="name"
            class="form-control"
            id="client-name"
            placeholder="Client name here"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>
      <div class="col-3">
        <div class="form-group formNames">
          <input
            v-model="project.contact_email"
            type="email"
            class="form-control"
            id="client-email"
            placeholder="Contact email here"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
        <br>
      </div>

      <div class="col-2 tempo1">
        <div class="datediv" style="float: left;">
          <datetime
            class="date"
            type="datetime"
            v-model="project.due_date"
            use12-hour
            :placeholder="project.due_date"
            :disabled="disabled == 1 ? true : false"
          ></datetime>
        </div>
      </div>
      <div class="col-2 tempo2">
        <div class="time">
          <i class="material-icons">date_range</i>
        </div>
      </div>
      <div class="col-4">
        <div class="form-group formNames">
          <input
            v-model="project.project_manager"
            type="manager"
            class="form-control"
            id="project-manager"
            placeholder="PM name here"
            :disabled="disabled == 1 ? true : false"
          >
        </div>
      </div>
    </div>

    <div class="row">
  <div class="col-4">
    <label> Services:</label>
    <div class="form-group">
      <div v-for="(service, i) in project.services" :key="i">
          <input type="checkbox" id="serviceHere" v-model="service.value" :disabled="disabled == 1 ? true : false">
          <label>{{project.services[i].name}}</label>
      </div>
    </div>
  </div>
  <div class="col-4">
    <label> Workflows: </label>
    <div class="form-group">
      <div v-for="(workflow , i) in project.workflows" :key="i">
        <input type="checkbox" id="workflowHere" v-model="workflow.value" :disabled="disabled == 1 ? true : false" >
        <label>{{project.workflows[i].name}} </label>
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
                <span class="trash" @click="remLangPair(project.language_pairs.indexOf(pair))">
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
                    class="form-control form-align"
                    id="source"
                    v-model="sourLang"
                    :disabled="disabled == 1 ? true : false"
                  >
                    <option v-for="(language, i) in languages" :key="i">{{language}}</option>
                  </select>
                </div>
              </th>
              <th></th>
              <th>
                <div class="form-group">
                  <select
                    class="form-control form-align"
                    id="target"
                    v-model="tarLang"
                    :disabled="disabled == 1 ? true : false"
                  >
                    <option v-for="(language, j) in languages" :key="j">{{language}}</option>
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
        <div class="col">
          <label for="Linguist table">Linguists table</label>
          <table class="table table-hover sour-tar">
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
                    @click="deleteLinguist(project.linguists.indexOf(linguist))"
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
                  <select class="form-control" v-model="newlinguist"  :disabled="disabled == 1 ? true : false">
                          <option
                            v-for="(linguist, i) in users"
                            :key="i"
                            v-show="linguist.access == 'Linguist'"
                          >{{linguist.name}}</option>
                        </select>
                </th>
                <th class="buttone">
                  <button
                    class="add-button"
                    @click.prevent="newLinguist()"
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
    <div class="row"></div>
    <div class="row">
      <div class="input-group mb-3 wordsTable">
        <div class="input-group-prepend">
          <span class="input-group-text wordsInput">Words:</span>
        </div>
        <input
          type="text"
          class="form-control words"
          aria-label="Small"
          id="words"
          placeholder="00"
          v-model.lazy="project.words"
          :disabled="disabled == 1 ? true : false"
        >
      </div>

      <input
        class="btn blue-button words-button"
        @click.prevent="calcCost()"
        value="Update price"
        :disabled="disabled == 1 ? true : false"
      >

      <div class="projstatus">
        <div class="form-group">
          <select
            class="form-control"
            v-model="project.status"
            :disabled="disabled == 1 ? true : false"
          >
            <option selected>{{project.status}}</option>
            <option v-if="project.status != 'Preparing' ">Preparing</option>
            <option v-if="project.status != 'Approved' ">Approved</option>
            <option v-if="project.status != 'Cancelled' ">Cancelled</option>
          </select>
        </div>
      </div>
    </div>

    <div class="input-group total-cost">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg">Cost</span>
      </div>
      <input type="price" v-model="project.price" class="form-control cost-text" disabled>
    </div>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";

export default {
  components: {
    datetime: Datetime
  },
  data() {
    return {
      services: [
        {
          name: "Translation",
          value: ""
        },
        {
          name: "Transcription",
          value: ""
        },
        {
          name: "Formatting and design",
          value: ""
        },
        {
          name: "Interpretation",
          value: ""
        },
        {
          name: "Video QA",
          value: ""
        },
        {
          name: "Subtitling",
          value: ""
        },
        {
          name: "File engeneering",
          value: ""
        },
        {
          name: "Voice Over",
          value: ""
        }
      ],
      workflows: [
        {
          name: "Translation",
          value: ""
        },
        {
          name: "Review",
          value: ""
        },
        {
          name: "Review 2",
          value: ""
        },
        {
          name: "Client Validation",
          value: ""
        }
      ],

      newlinguist: "",

      datetime12: "",

      disabled: 1,

      disText: "Edit",

      disIcon: "edit",

      sourLang: "",

      tarLang: "",

      id: this.$route.params.id,

      finalPrice: "",
      project: {

      },

      users:{},

      languages: ["PT-BR", "ENG-US", "ESP", "RUSS", "GER", "JP", "KOR"]
    };
  },
  methods: {
    approveProject() {
      this.project.status = "Approved";
      this.$http.put("http://localhost:8080/miniworks/project", this.project);
    },
    newLinguist() {
      this.project.linguists.push({
        name: this.newlinguist
      });
      this.newlinguist = "";
    },
    deleteLinguist(index) {
      if (this.disabled == 0) {
        this.project.linguists.splice(index, 1);
      }
    },
    delivered() {
      this.project.status = "Delivered";
      this.$http
        .put("http://localhost:8080/miniworks/project", this.project)
        .then(function(data) {
          alert(" O projeto foi entregue! ");
          
        });
    },
    calcCost() {
      this.project.price = (this.project.words * 0.35).toFixed(2);
    },
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
      this.project.language_pairs.push({
        source: this.sourLang,
        target: this.tarLang
      });
      this.sourLang = "";
      this.tarLang = "";
    },
    remLangPair(index) {
      if (this.disabled == 0) {
        this.project.language_pairs.splice(index, 1);
      }
    },

    saveState() {
      if (this.disabled == 1) {
        this.$http
          .put("http://localhost:8080/miniworks/project", this.project)
          .then(function() {
            alert("Successfully saved");
            throw new Error("Não foi possível remover a foto");
          });
      }
    }
  },
  cancel() {
    this.$http
      .delete("http://localhost:8080/miniworks/project", this.project)
      .then(function(data) {
        data.body = this.project;
      });
  },

  created() {
    this.$http
      .get("http://localhost:8080/miniworks/project/" + this.id)
      .then(function(data) {
        this.project = data.body;
      });
    this.$http.get("http://localhost:8080/miniworks/users").then(data =>{
      this.users = data.body;
    });
  }
};
</script>

<style>
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
  background-color: #e9ecef;
  color: #6b757d;
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
.formNames :disabled {
  border-style: dashed;
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0%;
  background: white;
  display: inline-block;
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
  margin-left: 8%;
}
.edit-single-user {
  vertical-align: middle;
  color: transparent;
}
.blue-button:hover .edit-single-user {
  color: #fa4c05;
}
.total-cost {
  width: 67%;
  text-align: center;
}
.words {
  text-align: center;
}
.wordsTable {
  width: 20%;
  margin-left: 1.5%;
}
.priceName :disabled {
  background: rgb(241, 240, 240);
}
.botoes {
  margin-left: 30%;
}
.ed {
  margin-right: 27%;
}
.wordsInput {
  height: 38px;
}
.cost-text {
  text-align: end;
}
.words-button {
  width: 15%;
  height: 37px;
  margin-left: 10px;
}
.editone{
  margin-right: 27%;
}
.delivered{
  margin-left: -110%;
}
</style>
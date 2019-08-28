<template>
  <div>
    <form>
      <div class="form-row">
        <div class="form-group col-5">
          <input
            type="text"
            class="form-control"
            id="inputText4"
            placeholder="Filter by project number"
            v-model="uProject.projectNumber"
          >
        </div>
        <div class="form-group col-5">
          <input
            type="text"
            class="form-control"
            id="inputText4"
            placeholder="Filter by client"
            v-model="uProject.clientName"
          >
        </div>
      </div>
      <button type="submit" class="btn blue-button">Search</button>
    </form>
    <br>
    <hr>
    <br>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Status</th>
          <th>Project</th>
          <th>Client</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, i) in filteredProjects" :key="i">
          <td>{{project.status}}</td>
          <td>
            <router-link :to="'/project/' + project.id">{{project.name}}</router-link>
          </td>
          <td>{{project.client}}</td>
          <td>{{project.due_date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uProject: {
        stage: "",
        projectNumber: "",
        clientName: "",
        deliveryDate: "",
        sourceLanguage: "",
        targetLanguage: "",
        pm: []
      },
      projects: [
        
      ]
    };
  },

  methods: {
    },
      created() {
        this.$http
          .get("http://localhost:8080/miniworks/projects/")
          .then(apiProjects => {
            this.projects = apiProjects.body;
          });
      },

  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        if (
          project.name.match(this.uProject.projectNumber) &&
          project.client.match(this.uProject.clientName)
        ) {
          return true;
        }
      });
    }
  },
  mounted() {
    this.$http.get("http://localhost:8080/miniworks/projects")
      .then(function(data) {
        this.projects = data.body;
        console.log(data);
      });
  }
};
</script>

<style>
.sproject {
  width: 175px;
}
.table-hover {
  border: none;
}
</style>
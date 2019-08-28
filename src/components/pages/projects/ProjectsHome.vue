<template>
  <div class="container main">
    <table class="table table-hover">
      <thead class="head-border">
        <tr>
          <th>Status</th>
          <th>Project</th>
          <th>Client</th>
          <th>Deadline</th>
          <th>Pm</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project , i ) in projects" :key="i">
          <td>{{project.status}}</td>
          <td>
            <router-link :to="'/project/' + project.id">{{project.name}}</router-link>
          </td>
          <td>{{project.client}}</td>
          <td>{{project.due_date}}</td>
          <td>{{project.project_manager}}</td>
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
      projects: []
    };
  },

  methods: {},
  created() {
    this.$http
      .get("http://localhost:8080/miniworks/projects/")
      .then(apiProjects => {
        this.projects = apiProjects.body;
      });
  }
};
</script>

<style scoped>
.more {
  color: #365c7b;
  margin-left: 20px;
}
.more:hover {
  color: #fa4c05;
}
.more:focus {
  color: #fa4c05;
}
</style>

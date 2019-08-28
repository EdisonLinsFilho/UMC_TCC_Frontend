<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Client name</span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        v-model="name"
      >
    </div>
    <!-- Search results -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Client name</th>
            <th>Taxpayer id</th>
            <th>Favorite currency</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clt, i) in filteredClis" :key="i">
            <td>{{clt.name}}</td>
            <td>{{clt.taxpayer_id}}</td>
            <td>{{clt.currency}}</td>
            <td>{{clt.country}}</td>
            <td>
              <router-link :to="'/client/' + clt.client_id">
                <i class="material-icons">arrow_forward</i>
              </router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      client: {
        name: "",
        email: "",
        currency: "",
        country: ""
      },
      clis: [
      ]
    };
  },
  computed: {
    // This function filters the clients by its name
    filteredClis() {
      return this.clis.filter(clt => {
        return clt.name.match(this.name);
      });
    }
  },

  mounted() {
    this.$http.get("http://localhost:8080/miniworks/clients")
      .then(function(data) {
        this.clis = data.body;
      });
  }
};
</script>

<style scoped>
i{
  color:#365c7b;
}
i:hover{
  color: var(--birorange);
}
</style>

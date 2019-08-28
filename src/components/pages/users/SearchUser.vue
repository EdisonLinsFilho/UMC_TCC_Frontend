<template>
  <div class="container-fluid">
    <!-- SearchBar -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">User name</span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        v-model="uName"
      >
    </div>
    <!-- Template Output da busca -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>RGM</th>
            <th>Name</th>
            <th>E-mail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user ,i) in filteredUsers" :key="i">
            <td>{{user.rgm}}</td>
            <td>{{user.name}}</td>
            <td class="align-c">{{user.email}}</td>
            <td>
              <router-link :to="'/user/' + user.id">
                <i class="material-icons">arrow_forward</i>
              </router-link>
            </td>
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
      uName: "",
      users: [
      ]
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.name.match(this.uName);
      });
    }
  },
  mounted() {
    this.$http.get("http://localhost:8080/miniworks/users")
      .then(function(data) {
        this.users = data.body;
      });
  }
};
</script>

<style>
.material-icons:hover{
  color: #fa4c05;
}
.material-icons{
  color: #365c7b;
}
.align-c {
  margin-left: 15%;
}
</style>

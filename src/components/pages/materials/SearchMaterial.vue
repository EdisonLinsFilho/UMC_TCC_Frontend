<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Material: </span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      >
    </div>
    <!-- Search results -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },

  mounted() {

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

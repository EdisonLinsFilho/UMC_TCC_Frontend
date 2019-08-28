<template>
  <div>
    <!-- Tabs -->
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#search-client">Search Client</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#new-client">New Client</a>
      </li>
    </ul>
    <!-- Panels -->
    <div class="tab-content">
      <div id="search-client" class="container tab-pane active">
        <br />
        <my-search-client></my-search-client>
      </div>
      <div id="new-client" class="container tab-pane fade">
        <br />
        <my-new-client></my-new-client>
      </div>
    </div>
  </div>
</template>

<script>
import NewClient from "./NewClient.vue";
import SearchClient from "./SearchClient.vue";
export default {
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      item: "nav-item",
      active: "active"
    };
  },
  components: {
    "my-new-client": NewClient,
    "my-search-client": SearchClient
  }
};
</script>

<style>
.clientinput {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  background: none;
  vertical-align: middle;
  float: right;
}
</style>

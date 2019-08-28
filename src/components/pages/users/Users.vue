<template>
  <div class="row">
    <div class="col-12">
      <!-- Pilss -->
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link item-mod active" data-toggle="pill" href="#search-user">Search User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link item-mod" data-toggle="pill" href="#new-user">New User</a>
        </li>
      </ul>
      <!-- conteudo dos pills -->
      <div class="tab-content">
        
        <div id="search-user" class="container tab-pane active">
          <br>
            <my-search-user></my-search-user>
        </div>

        <div id="new-user" class="container tab-pane fade">
          <br>
            <my-new-user></my-new-user>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SearchUser from "./SearchUser.vue";
import NewUser from "./NewUser.vue";
export default {
  components: {
    'my-new-user' : NewUser,
    'my-search-user' : SearchUser,
  }
};
</script>

<style>
</style>

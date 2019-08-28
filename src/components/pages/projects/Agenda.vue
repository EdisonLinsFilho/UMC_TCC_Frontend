<template>
  <div>
    <!-- TABS -->
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#search-project">Search Project</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#new-project">New Project</a>
      </li>
    </ul>
    <!-- CONTEUDO TABS -->
    <div class="tab-content">
      <div id="search-project" class="container tab-pane active">
        <br>
        <my-search-project></my-search-project>
      </div>
      <div id="new-project" class="container tab-pane fade">
        <br>
        <my-new-project></my-new-project>
      </div>
    </div>
  </div>
</template>

<script>
import NewProject from './NewProject.vue';
import SearchProject from './SearchProject.vue';
export default {
    components:{
       
        'my-new-project': NewProject,
        'my-search-project': SearchProject
    },

}
</script>

<style>

</style>

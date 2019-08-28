<template>
  <div class="row">
    <div class="col-12">
      <!-- Tabs -->
      <div class="align-filter">
        <ul class="nav nav-pills" role="tablist">
          <li class="nav-item">
            <a class="nav-link item-mod active" data-toggle="pill" href="#projects">Projects</a>
          </li>
          <li class="align-li"></li>
        </ul>
      </div>
      <!-- Panels -->
      <div class="tab-content">
        <div id="projects" class="container tab-pane active">
          <br />
          <my-projects-home></my-projects-home>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectsHome from "../projects/ProjectsHome.vue";

export default {
  components: {
    "my-projects-home": ProjectsHome
  }
};
</script>
<style scoped>
.check-mod {
  color: aliceblue;
}
.form-check {
  margin-left: 15px;
  text-align: left;
}
.multiselect {
  width: 200px;
}

.selectBox {
  position: relative;
}

.dropdown-menu {
  background-image: url(../../../assets/dark-triangles.png);
  background-color: #365c7b;
}

.dropdown-toggle {
  background-color: #365c7b;
}
.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkboxes {
  display: none;
  border: 1px #dadada solid;
}

#checkboxes label {
  display: block;
}

#checkboxes label:hover {
  background-color: #1e90ff;
}
.align-li {
  margin-top: 4px;
  margin-left: 75%;
}
.i-align {
  vertical-align: -webkit-baseline-middle;
  text-align: center;
  text-align-last: center;
  text-anchor: middle;
}
</style>

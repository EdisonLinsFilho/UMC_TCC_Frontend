<template>
  <div class="row">
  </div>
</template>

<script>

export default {
  components: {
    
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

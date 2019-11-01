<template>
  <div class="container-fluid">
    <div align="center">
      <h3>Agendas: Laboratório De Pedagogia</h3>
    </div>
    <table class="table" selectable :select-mode="selectMode">
      <thead>
        <tr>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Data Do Agendamento</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Escola</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Disciplina</a>
          </th>
          <th scope="col">
            <a
              style="color: black"
              class="link-table"
              data-toggle="collapse"
              role="text"
              aria-expanded="false"
              aria-controls="collapseExample"
            >Professor</a>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10/10/1010 10:10</td>
          <td>Universidade Mogi</td>
          <td>Matematica</td>
          <td>Gilmar Souza</td>
        </tr>
      </tbody>
    </table>
    <!-- PopUp -->

    <!-- PopUp -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      agenda: [],
      id: "",
      data: "",
      professor: "",
      descricao: "",
      material: "",
      escola: "",
      coordenator: "",
      tipoEnsino: "",
      criancas: "",
      monitor: "",
      responsavel: "",
      professorToSearch: "",
      dataToSearch: ""
    };
  },
  methods: {
    procurarAgenda() {
      if (
        (this.professorToSearch == null && this.dataToSearch == null) ||
        (this.professorToSearch == "" && this.dataToSearch == "")
      ) {
        //Search All
        this.$http
          .get("http://localhost:8080/api/v1/agenda/getAll")
          .then(function(data) {
            this.agenda = data.body;
          });
      }
    },
    saveEdit() {
      this.$modal.hide("allPageEdit");
    }
  },
  computed: {},
  
};

/*export default {
  components: {
    
  }
};*/
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

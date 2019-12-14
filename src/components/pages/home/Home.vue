<template>
  <div class="container-fluid">
    <div class="center2">
      <h4>Proximas Atividades</h4>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Descrição Atividade</th>
          <th>Numero de Alunos</th>
          <th>Escola</th>
          <th>Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(atividade, i) in allAgendas" :key="i" >  
          <td class="tdSize">
            <i class="material-icons yellow" title="Atividades Seguintes">error</i>
          </td>
          <td>{{atividade.descricao}}</td>
          <td>{{atividade.criancas}}</td>
          <td>{{atividade.escola}}</td>
          <td>{{atividade.data}}</td>
          <td>
            <div class="material-icons" style="cursor: pointer" @click="show(atividade)">
              search&ensp;
              <span></span>
              <i></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <br />
    <div class="center">
      <h4>Lista de materiais com quantidade abaixo de quantidade minima</h4>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Nome Material</th>
          <th>Descrição Material</th>
          <th>Quantidade</th>
          <th>Quantidade Minima</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(material ,i) in materiaisSeparados" :key="i">
          <td class="tdSize">
            <i
              class="material-icons red"
              title="Material com Quantidade abaixo de Quantidade Minima"
            >error</i>
          </td>
          <td>{{material.nome}}</td>
          <td>{{material.descricao}}</td>
          <td>{{material.quantidade}}</td>
          <td>{{material.quantidadeMinima}}</td>
        </tr>
      </tbody>
    </table>
    <!-- PopUp -->
    <modal name="allPageDisbled" height="auto">
      <div class="modal-header">
        <h4>Resumo Atividade</h4>
      </div>
      <div class="borda">
        <br />
        <div class="form-group col-md-12">
          <label>Escola</label>
          <input type="text" v-model="agenda.escola" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Tipo de Ensino</label>
          <select class="custom-select my-1 mr-sm-2" v-model="agenda.tipoEnsino" disabled>
            <option value="FUNDAMENTAL">Fundamental</option>
            <option value="PRIMARIO">Primário</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label>Coordenador</label>
          <input type="text" v-model="coordenador.nome" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Professor</label>
          <input type="text" v-model="professor.nome" class="form-control" disabled />
        </div>
        <div class="form-group col-md-12">
          <label>Monitor</label>
          <input type="text" v-model="monitor.nome" class="form-control" disabled />
        </div>
      </div>
    </modal>
    <!-- PopUp -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      allMaterials: [],
      materiaisSeparados: [],
      materialParaVerificacao: [],
      allAgendas: [],
      atividade: [],
      coordenador: [],
      professor: [],
      monitor: [],
      agenda: [],
    };
  },
  methods: {
    dataConvert(data) {
      var a = new Date(data);
      var months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var time = date + " " + month + " " + year + " " + hour + ":" + min;
      return time;
    },
    show(agenda) {
      this.agenda = agenda;

      this.coordenador = this.agenda.coordenator;
      this.professor = this.agenda.professor;
      this.monitor = this.agenda.monitor;

      this.$modal.show("allPageDisbled");
    },
    converterTodasDatas(element, index) {
      element.data = this.dataConvert(element.data);
    },
    procurarAtividades(){
      this.$http.get("http://localhost:8080/api/v1/agenda/get-next").then((data) =>{
        this.allAgendas = data.body;
        console.log(data);
        this.allAgendas.forEach(this.converterTodasDatas);
      },
      error =>{
        console.log(error.message);
      })
    },

    procurarMateriais() {
      this.$http.get("http://localhost:8080/api/v1/material/getAll").then(
        function(data) {
          this.allMaterials = data.body;
          console.log(this.allMaterials);
          
          this.separarMateriais();
          console.log(this.materiaisSeparados);
          
        },
        error => {
          console.error(error.data);
        }
      );
    },
    separarMateriais() {
      for (var i = 0; i < this.allMaterials.length; i++) {
        this.materialParaVerificacao = this.allMaterials[i];
        if (
          this.materialParaVerificacao.quantidade <
          this.materialParaVerificacao.quantidadeMinima
        ) {
          this.materiaisSeparados.push(this.materialParaVerificacao);
        }
      }
      if (
        this.materiaisSeparados.length <= 0 ||
        this.materiaisSeparados == null
      ) {
        console.log(this.materiaisSeparados);
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.procurarMateriais();
    this.procurarAtividades();
  }
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
.yellow {
  color: yellow;
}
.red {
  color: red;
}
.tdSize {
  width: 10px;
}
.materiais-empty {
  width: 100%;
}
.center {
  padding-left: 200px;
}
.center2 {
  padding-left:450px;
}
</style>

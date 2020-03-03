<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8" v-if="filtroPorData">
        <datetime
          class="date"
          type="Date"
          v-model="dataToSearch"
          :placeholder="'Selecione uma Data'"
          :close="procurarAgendaPorData()"
        ></datetime>
      </div>
      <div class="col-8" v-if="!filtroPorData">
        <cool-select
          @select="procurarAgendaPorProfessor()"
          item-text="nome"
          class="camposDropDown"
          v-model="professorToSearch"
          :items="professores"
          placeholder="Pesquise o Nome do Professor"
        />
      </div>
      <div class="col-4">
        <select type="text" class="btn bordaAzul" @change="changeFiltro()" v-model="filtro">
          <option value="Data">Data</option>
          <option value="Professor">Professor</option>
        </select>
        <button type="button" class="btn btn-primary btn-umc" @click="limparFiltros()">Limpar</button>
      </div>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Data/Hora</th>
          <th scope="col">Descrição</th>
          <th scope="col">Numero de Crianças</th>
          <th scope="col">Materiais e Responsaveis</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(agenda ,i) in agendas" :key="i">
          <td>{{agenda.data}}</td>
          <td>{{agenda.descricao}}</td>
          <td>{{agenda.criancas}}</td>
          <td width="10%" class="alinhamento">
            <div
              class="material-icons"
              style="cursor: pointer"
              @click="showMateriaisEResponsaveis(agenda)"
            >
              search&ensp;
              <span></span>
              <i></i>
            </div>
          </td>
          <td width="14%" align="right">
            <div class="material-icons" style="cursor: pointer" @click="show(agenda)">
              search&ensp;
              <span></span>
              <i></i>
            </div>
            <div v-if="!acessoMonitor" class="material-icons" style="cursor: pointer" @click="showEdit(agenda)">
              edit&ensp;
              <span></span>
              <i></i>
            </div>
            <span v-if="!acessoMonitor" class="trash" @click="confirmDelete(agenda)">
              <span></span>
              <i></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- PopUp -->
    <modal name="materiaisEResponsaveis" height="auto">
      <div class="modal-header">
        <h4>Materiais & Responsáveis</h4>
      </div>
      <div class="borda">
        <br />
        <div class="form-group col-md-12">
          <label>Responsaveis</label>
          <tr v-for="(responsavel, i) in agenda.resposaveis" :key="i">
            <td class="spaceLeft">{{responsavel.nome}}</td>
          </tr>
        </div>
        <hr />
        <div class="form-group col-md-12">
          <label>Materiais</label>
          <tr v-for="(material, i) in agenda.materiais" :key="i">
            <td class="spaceLeft">{{material.nome}}</td>
          </tr>
        </div>
      </div>
    </modal>

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

    <modal name="allPageEdit" height="auto">
      <div class="modal-header">
        <h4>Atividade</h4>
      </div>
      <div class="borda">
        <br />
        <div class="row">
          <div class="leftSpace form-group col-md-5">
            <label>Data da Atividade</label>
            <datetime type="datetime" v-model="date" :placeholder="'Selecione uma Data'"></datetime>
          </div>
          <div class="form-group col-md-6">
            <label>Numero de Crianças</label>
            <input
              type="text"
              v-model="agendaAlterada.criancas"
              v-mask="'###'"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group col-md-12">
          <label>Descrição</label>
          <input type="text" v-model="agendaAlterada.descricao" maxlength="50" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>Escola</label>
          <input type="text" v-model="agendaAlterada.escola" maxlength="50" class="form-control" />
        </div>
        <div class="form-group col-md-12">
          <label>Tipo de Ensino</label>
          <select class="custom-select my-1 mr-sm-2" v-model="agendaAlterada.tipoEnsino">
            <option value="FUNDAMENTAL">Fundamental</option>
            <option value="PRIMARIO">Primário</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label>Coordenador</label>
          <cool-select
            item-text="nome"
            class="camposDropDown"
            v-model="agendaAlterada.coordenator"
            :items="coordenadores"
            placeholder="Pesquisa o Nome do Coordenador"
          />
        </div>
        <div class="form-group col-md-12">
          <label>Professor</label>
          <cool-select
            item-text="nome"
            class="camposDropDown"
            v-model="agendaAlterada.professor"
            :items="professores"
            placeholder="Pesquise o Nome do Professor"
          />
        </div>
        <div class="form-group col-md-12">
          <label>Monitor</label>
          <cool-select
            item-text="nome"
            class="camposDropDown"
            v-model="agendaAlterada.monitor"
            :items="monitores"
            placeholder="Pesquise o Nome do Monitor"
          />
        </div>
        <div align="center">
          <button type="button" class="btn btn-link fullLine" @click="clearModalEdit()">Limpar</button>
          <button type="button" class="btn btn-primary fullLine btn-umc" @click="saveEdit()">Salvar</button>
        </div>
      </div>
    </modal>

    <modal name="confirmDelete" height="auto">
      <div class="borda">
        <br />
        <p class="size" align="center">Deseja realmente excluir ?</p>
        <div align="center">
          <button type="button" class="btn fullLine btn-cancelar" @click="hideDelete()">Cancelar</button>
          <button type="button" class="btn btn-success fullLine" @click="saveDelete()">Sim</button>
        </div>
      </div>
    </modal>
    <!-- PopUp -->
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
import { Datetime } from "vue-datetime";

export default {
  data() {
    return {
      filtroPorData: true,
      filtro: [],
      agendas: [],
      agenda: [],
      agendaAlterada: [],
      professores: [],
      coordenadores: [],
      monitores: [],
      professorToSearch: "",
      dataToSearch: "",
      interval: "",
      professor: [],
      monitor: [],
      coordenador: [],
      date: "",
      statusA: "ACTIVE",
      statusI: "INACTIVE",
      listNull: [],
      acessoMonitor: false,
    };
  },
  methods: {
    confereCampos() {
      if (this.agendaAlterada.descricao == "") {
        alert("Campo Descrição Obrigatório !");
        return false;
      } else if (this.agendaAlterada.criancas == "") {
        alert("Campo Numero de Crianças Obrigatório !");
        return false;
      } else if (this.date == "") {
        alert("Campo Data Obrigatório !");
        return false;
      } else if (this.agendaAlterada.tipoEnsino == "") {
        alert("Campo Tipo Ensino Obrigatório !");
        return false;
      } else if (this.agendaAlterada.coordenator == null) {
        alert("Campo Coordenador Obrigatório !");
        return false;
      } else if (this.agendaAlterada.professor == null) {
        alert("Campo Professor Obrigatório !");
        return false;
      } else if (this.agendaAlterada.Monitor == "") {
        alert("Campo Monitor Obrigatório !");
        return false;
      }
    },
    saveEdit() {
      if (this.confereCampos == false) {
        return;
      } else {
        var date = Date.parse(this.date);

        let agenda = {
          id: this.agendaAlterada.id,
          descricao: this.agendaAlterada.descricao,
          status: this.statusA,
          coordenator: this.agendaAlterada.coordenator,
          monitor: this.agendaAlterada.monitor,
          professor: this.agendaAlterada.professor,
          escola: this.agendaAlterada.escola,
          criancas: this.agendaAlterada.criancas,
          tipoEnsino: this.agendaAlterada.tipoEnsino,
          data: date,
          resposaveis: this.agendaAlterada.resposaveis,
          materiais: this.agendaAlterada.materiais
        };

        this.$http.post("http://localhost:8080/api/v1/agenda", agenda).then(
          function() {
            alert("Agenda Alterada");
            this.procurarTodasAgendas();
            this.$modal.hide("allPageEdit");
          },
          error => {
            console.log(error.data);
          }
        );
      }
    },
    converterTodasDatas(element, index) {
      element.timeStamp = element.data
      element.data = this.dataConvert(element.data);
    },
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
    procurarAgendaPorData() {
      
      if (!this.dataToSearch == "") {

        var date = Date.parse(this.dataToSearch);

        this.$http
          .get("http://localhost:8080/api/v1/agenda/get-by-day/" + date)
          .then(
            function(data) {
              this.agendas = data.body;
              this.agendas.forEach(this.converterTodasDatas);
            },
            error => {
              console.log(error.data);
              alert(error.data.message);
              this.limparFiltros();
            }
          );
      }
    },
    procurarAgendaPorProfessor() {
      this.$http
        .get(
          "http://localhost:8080/api/v1/agenda/getByProfessor/" +
            this.professorToSearch.nome
        )
        .then(
          function(data) {
            this.agendas = data.body;
            this.agendas.forEach(this.converterTodasDatas);
          },
          error => {
            console.log(error.data);
            alert(error.data.message);
            this.limparFiltros();
          }
        );
    },
    procurarTodasAgendas() {
      var status = "ACTIVE";

      this.$http
        .get("http://localhost:8080/api/v1/agenda/getAll/" + status)
        .then(
          function(data) {
            this.agendas = data.body;
            this.agendas.forEach(this.converterTodasDatas);
            
          },
          error => {
            console.log(error.data);
          }
        );
    },
    limparFiltros() {
      (this.professorToSearch = ""),
        (this.dataToSearch = ""),
        this.procurarTodasAgendas();
    },
    procurarMonitores() {
      this.$http
        .get("http://localhost:8080/api/v1/usuario/byAccess/MONITOR/ACTIVE")
        .then(
          function(data) {
            this.monitores = data.body;
          },
          error => {
            console.log(error.data);
          }
        );
    },
    procurarCoordenadores() {
      this.$http
        .get("http://localhost:8080/api/v1/usuario/byAccess/COORDENADOR/ACTIVE")
        .then(
          function(data) {
            this.coordenadores = data.body;
          },
          error => {
            console.log(error.data);
          }
        );
    },
    procurarProfessores() {
      this.$http
        .get("http://localhost:8080/api/v1/usuario/byAccess/PROFESSOR/ACTIVE")
        .then(
          function(data) {
            this.professores = data.body;
          },
          error => {
            console.log(error.data);
          }
        );
    },
    changeFiltro() {
      if (this.filtro == "Data") {
        this.filtroPorData = true;
        this.professorToSearch = "";
      } else {
        this.filtroPorData = false;
        this.dataToSearch = "";
      }
    },
    clearModalEdit() {
      this.data = "";
      this.descricao = "";
      this.material = "";
      this.professor = "";
      this.escola = "";
      this.coordenator = "";
      this.tipoEnsino = "";
      this.criancas = "";
      this.monitor = "";
      this.responsavel = "";
    },
    hideDelete() {
      this.$modal.hide("confirmDelete");
    },
    saveDelete() {

      let agenda = {
        id: this.agenda.id,
        descricao: this.agenda.descricao,
        status: "INACTIVE",
        coordenator: this.agenda.coordenator,
        monitor: this.agenda.monitor,
        professor: this.agenda.professor,
        escola: this.agenda.escola,
        criancas: this.agenda.criancas,
        tipoEnsino: this.agenda.tipoEnsino,
        data: this.agenda.timeStamp,
        resposaveis: this.agenda.resposaveis,
        materiais: this.agenda.materiais,
      };

      this.$http.post("http://localhost:8080/api/v1/agenda", agenda)
      .then(function() {
          alert("Agenda Deletada");
          this.procurarTodasAgendas();
          this.hideDelete();
        },
        error => {
          console.log(error.data);
        }
      );
    },
    confirmDelete(agenda) {
      this.$modal.show("confirmDelete");
      this.agenda = agenda;
    },
    showMateriaisEResponsaveis(agenda) {
      this.agenda = agenda;
      this.responsaveis = agenda.resposaveis;
      this.$modal.show("materiaisEResponsaveis");
    },
    show(agenda) {
      this.agenda = agenda;

      this.coordenador = this.agenda.coordenator;
      this.professor = this.agenda.professor;
      this.monitor = this.agenda.monitor;

      this.$modal.show("allPageDisbled");
    },
    showEdit(agenda) {
      this.agenda = agenda;
      this.agendaAlterada = agenda;
      this.$modal.show("allPageEdit");
    },
    verificaNovaAgenda() {
      this.interval = setInterval(
        function() {
          var check = localStorage.getItem("novaAgenda");
          if (check == 1) {
            this.procurarTodasAgendas();
            localStorage.setItem("novaAgenda", 0);
          }
        }.bind(this),
        1500
      );
    },
    verificaUsuarioLogado(){
      var acesso = localStorage.getItem('loggedAccess');

      if(acesso == "MONITOR"){
        this.acessoMonitor = true;
      } else {
        this.acessoMonitor = false;
      }

    }
  },
  created() {
    this.filtro = "Data";
    this.verificaUsuarioLogado();
    this.procurarProfessores();
    this.procurarMonitores();
    this.procurarCoordenadores();
    this.procurarTodasAgendas();
    this.verificaNovaAgenda();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {},
  components: {
    CoolSelect,
    datetime: Datetime
  }
};
</script>

<style >
/* TODO - Não Consegui Utilizar */
.link-table {
  color: black;
}
.fullLineProf {
  width: 600px;
}
.fullLine {
  align-self: center;
  width: 297px;
}
.btnLess {
  height: 33px;
}
.checkBox {
  padding-top: 10px;
}
.btnTable {
  height: 20px;
  width: 20px;
}
.open {
  background-color: greenyellow;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.edit {
  background-color: blue;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.delete {
  background-color: red;
  border-radius: 2px;
  padding: 0;
  border: none;
}
.borda {
  border: 1px solid black;
}
.size {
  font-size: 25px;
}
.spaceLeft {
  padding-left: 15px;
}
.alinhamento {
  text-align: center;
}
.bordaAzul {
  border-color: deepskyblue;
}
.leftSpace {
  padding-left: 30px;
}
</style>
<template>
  <div class="container-fluid">
    <!-- Search bar -->
    <div align="center">
      <h3>Relatórios: Laboratório De Pedagogia</h3>
    </div>
    <br />
    <div class="row">
      <div class="form-group col-md-4">
        <label for="tiporelatorio">Tipo do Relatório</label>
        <font color="red">*</font>
        <select class="custom-select my-1 mr-sm-2" v-model="tiporelatorio" id="tiporelatorio">
          <option disabled selected>Selecione uma opção...</option>
          <option value="material">Material</option>
          <option value="usuario">Usuário</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>

      <div class="input-field col-md-3" v-if="tiporelatorio == 'agenda'">
        <label class="spaceTitle" for="datainicial">Data Inicial</label>
        <font color="red">*</font>
        <div class="input-group date">
          <input
            type="date"
            v-model="dataInicial"            
            class="form-control"
            id="dateInicial"
          />
          <div class="input-group-addon">
            <span class="glyphicon glyphicon-th"></span>
          </div>
        </div>
      </div>
      <div class="form-group col-md-3" v-if="tiporelatorio == 'agenda'">
        <label class="spaceTitle" for>Data Final</label>
        <font color="red">*</font>
        <div class="input-group date">
          <input type="date" id="dateFinal" class="form-control" v-model="dataFinal" />
          <div class="input-group-addon">
            <span class="glyphicon glyphicon-th"></span>
          </div>
        </div>
      </div>

      <div class="form-group col-md-2">
        <label for="campos">
          <br />
        </label>
        <br />
        <button type="submit" class="btn btn-success btn-xs" @click="procurarRelatorio()">Exportar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {

    verificaCampos(){
      if(this.tiporelatorio == 'agenda'){
          
          if(this.dataInicial == null || this.dataFinal == null ||
            this.dataInicial == '' || this.dataFinal == '') {
            alert("Todos os campos devem ser preenchidos");
            return false
          }
        }

        return true;
    },

    validaDataFinal() {
      if (
        this.dataInicial != null &&
        this.dataInicial != "" &&
        this.dataFinal != ""
      ) {
        if (this.dataFinal < this.dataInicial) {
          alert("Data Final deve ser maior que a data inicial");
          return;
        }
      }
    },

    validaDataInicial() {
      if (
        this.dataFinal != null &&
        this.dataFinal != "" &&
        this.dataInicial != ""
      ) {
        if (
          document.getElementById("dateInicial").value >
          document.getElementById("dateFinal").value
        ) {
          alert("Data Inicial deve ser menor que a data final");
          document.getElementById("dateInicial").value = "";
          this.dataInicial = "";
          return;
        }
      }
    },

    procurarRelatorio() {

      if(!this.verificaCampos()){
        return
      }

      if(this.tiporelatorio == 'agenda'){
        this.validaDataInicial();
        this.validaDataFinal();
      }

      let url;

      if (this.tiporelatorio != "agenda") {

        url = "?type=" + this.tiporelatorio;
      
      } else {
          var dateStart = Date.parse(this.dataInicial);
          var dateFinal = Date.parse(this.dataFinal);
          url =
            "?startDate=" +
            dateStart +
            "&endDate=" +
            dateFinal +
            "&type=" +
            this.tiporelatorio;
        }

      //REQUEST + DOWNLOAD
      axios
        .post(
          "http://localhost:8080/api/v1/report" + url,
          {},
          {
            responseType: "blob"
          }
        )
        .then(response => {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel"
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.tiporelatorio + "_report.xlsx");
          document.body.appendChild(link);
          link.click();
        });
    }
  },
  data() {
    return {      
      dataInicial: '',
      dataFinal: '',
      tiporelatorio: "agenda"
    };
  },
};
</script>

<style scoped>
i {
  color: #365c7b;
}
i:hover {
  color: var(--birorange);
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
.btnTable {
  height: 20px;
  width: 20px;
}
.fullLine {
  align-self: center;
  width: 297px;
}
.spaceTitle {
  padding-bottom: 5px;
}
</style>
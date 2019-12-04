<template>
  <div class="container-fluid">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Descrição Atividade</th>
            <th>Numero de Alunos</th>
            <th>Disciplina</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tdSize"><i class="material-icons yellow" title="Proxima Atividade">error</i></td>
            <td>Descrição Atividade</td>
            <td>20</td>
            <td>Matematica</td>
            <td>01/01/2010 10:10</td>
            <td><i class="material-icons">search</i></td>
          </tr>
        </tbody>
      </table>
    <br/>
      <hr/>
    <br/>
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
          <td class="tdSize"><i class="material-icons red" title="Material com Quantidade abaixo de Quantidade Minima">error</i></td>
          <td>{{material.nome}}</td>
          <td>{{material.descricao}}</td>
          <td>{{material.quantidade}}</td>
          <td>{{material.quantidadeMinima}}</td>
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
      allMaterials: [],
      materiaisSeparados: [],
      materialParaVerificacao: [],
    };
  },
  methods: {
    procurarMateriais(){
      this.$http.get("http://localhost:8080/api/v1/material/getAll").then(
        function(data) {
          this.allMaterials = data.body;
          this.separarMateriais();
        },
        error => {
          console.error(error.data);
        }
      )
    },
    separarMateriais(){
      for(var i = 0; i < this.allMaterials.length; i++){
        this.materialParaVerificacao = this.allMaterials[i];
        if(this.materialParaVerificacao.quantidade < this.materialParaVerificacao.quantidadeMinima){
          this.materiaisSeparados.push(this.materialParaVerificacao);
        }
      }

      
    },
  },
  mounted() {
    this.procurarMateriais();
  },
  
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
  color: yellow
}
.red {
  color: red
}
.tdSize {
  width: 10px
}
</style>

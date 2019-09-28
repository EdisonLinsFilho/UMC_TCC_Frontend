<template>
 <div>
    <div class="container">
      <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Nome da Escola</span>
          </div>
          <input type="text" v-model="agenda.escola" class="form-control" placeholder="Digite o nome da Escola que virá para realizar a atividade"  />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Coordenador Responsável</span>
          </div>
          <input type="text" v-model="agenda.coordenador" class="form-control" placeholder="Digite o nome do Coordenador responsável"  />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Professor Responsável</span>
          </div>
          <input type="text" v-model="agenda.professor" class="form-control" placeholder="Digite o nome do Professor responsável"  />
        </div >
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.descricao" class="form-control" placeholder="Digite uma descrição da Atividade"/>
        </div >
      </form>
      <b-container class="bv-example-row">
        <b-row>
          <b-col> <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button></b-col>
          <b-col> <button type="button" class="btn btn-primary">Salvar</button></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  
  methods: {
    resetFields() {
      (this.agenda.descricao = ""),
      (this.agenda.professor = ""),
      (this.agenda.coordenador = ""),
      (this.agenda.escola = "")
    }
  },
  components: {
    
  },
  data() {
    return {
      agenda: {
        descricao: "",
        professor: "",
        coordenador: "",
        escola: ""
      }
    } 
  }
  
}
</script>

<style scoped>

</style>
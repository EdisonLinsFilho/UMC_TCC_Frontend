<template>
 <div>
    <div class="container">
      <form> 
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.escola" class="form-control" placeholder="Digite o nome da Escola"  />
        </div>
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.coordenador" class="form-control" placeholder="Digite o nome do Coordenador responsável"  />
        </div>
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.professor" class="form-control" placeholder="Digite o nome do Professor responsável"  />
        </div >
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.descricao" class="form-control" placeholder="Digite uma descrição da Atividade"/>
        </div >
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.ensino" class="form-control" placeholder="Digite o Ensino Exemplo: Ensino Fundamental"/>
        </div >
        <div class="input-group mb-3">
          <input type="text" v-mask="'##'" v-model="agenda.criancas" class="form-control" placeholder="Digite o numero de crianças"/>
        </div >
        <div class="input-group mb-3">
          <input type="text" v-model="agenda.monitor" class="form-control" placeholder="Digite o nome do Monitor"/>
        </div >
        <div class="input-group mb-3">
          <cool-select
          v-model="selected"
          :items="responsavel"
          placeholder="Responsável da Escola"
          />
          <div class="input-group-prepend">
            <button type="button" class="plus_someone" @click="show()">+</button>
          </div>
        </div >
      </form>
      <b-container >
        <button type="button" class="btn btn-primary">Salvar</button>
        <button type="button" class="btn btn-link" v-on:click="resetFields()" >Limpar</button>
      
      </b-container>
    </div>
    <!-- PopUp -->
    <modal name="hello-world" height="auto"	>
      <br>
      <div class="input-group mb-3 space_up">
        <div class="input-group-prepend">
          <span class="input-group-text">RG</span>
        </div>
        <input type="text" class="form-control" v-mask="'##.###.###-N'" @keypress="onKeydown" placeholder="Digite apenas numeros" v-model="novoResponsavel.rg"/>
      </div >
      <div class="input-group mb-3 space_up">
        <div class="input-group-prepend">
          <span class="input-group-text">Nome</span>
        </div>
        <input type="text" class="form-control" placeholder="Digite o nome do Responsável" v-model="novoResponsavel.nome" />
      </div >
      <div align="center">
        <button type="button" class="btn btn-link fullLine"  @click="clearModal()">Limpar</button>
        <button type="button" class="btn btn-primary fullLine" @click="saveOne()">Salvar</button>
      </div>  
    </modal>
    <!-- PopUp -->
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import { Datetime } from "vue-datetime";
  

export default {
   
  methods: {
    onKeydown (event) {
      const char = String.fromCharCode(event.keyCode)
      if(this.responsavel.rg.length != 12){
        if (!/[0-9]/.test(char)) {
          event.preventDefault()
        } 
      }  
    },
    clearModal(){
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = "")
    },
    saveOne(){
      if(this.novoResponsavel.rg == "" || this.novoResponsavel.rg.length < 12){ 
        alert('O RG é obrigatório.');
      } else if(this.responsavel.nome == "") {
        alert('O nome é obrigatório');
      } else{
        this.responsavel.push({nome: this.novoResponsavel.nome })
        this.selected = this.novoResponsavel.nome,
        this.hide();
      }
    },
    show () {
      (this.novoResponsavel.rg = ""),
      (this.novoResponsavel.nome = ""),
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },

    close () {
      this.$router.back()
    },
    resetFields() {
      (this.agenda.monitor = ""),
      (this.agenda.descricao = ""),
      (this.agenda.professor = ""),
      (this.agenda.coordenador = ""),
      (this.agenda.escola = ""),
      (this.agenda.ensino = ""),
      (this.agenda.criancas = ""),
      (this.agenda.escola = ""),
      (this.selected = "")
    }
  },

  components: {  
    CoolSelect,
    datetime: Datetime,


  },
  data() {
    return {
      // simple example of items
      items: ['Roberto', 'Ricardo', 'Rivaldo', 'Emily', 'Isabella ', 'Breno', 'Leonor', 'Carolina ', 'Rivaldo', 'Roberto', 'Carla ', 'Beatrice ', 'Giovana ', 'Lavinia ', 'Alex ', 'Carlos ', 'Clara ', 'Eduarda '],
      // there will be a selected item
      selected: null,
      novoResponsavel: {
        nome: "",
        rg: ""
      },
      responsavel: [
      ],
      agenda: {
        monitor: "",
        descricao: "",
        professor: "",
        coordenador: "",
        escola: "",
        ensino: "",
        criancas: "",
        responsável: {
          nome: "",
          rg: "",
        },
        material: "",
        data: "",

      }
    } 
  }
  
}

</script>

<style scoped>
.plus_someone{
  height: 30px,
}
.fullLine{
  width: 250px,
}
</style>
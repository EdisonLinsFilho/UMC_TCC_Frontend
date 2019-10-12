<template>
  <div class="container-fluid">
    <!-- Search bar -->
 <div class="row">
      <div class="form-group col-md-2">
         <label for="material">Codigo Material</label>
        <input type="text"
          v-model="material"
          required="required"
          class="form-control"
          placeholder="Digitando........."
          id="material" />
      </div>
      <div class="form-group col-md-6" >
         <label for="material">Nome Material</label>
        <input type="text"
          v-model="material"
          required="required"
          class="form-control"
          placeholder="Digite  Material"
          id="material"  />
          
      </div>
    <div class="form-group col-md-4" >
       <label for="material">
         <br/>
       </label>
      <br/>
        <button type="button" class="btn btn-primary md-4" @click="procurarmaterial()">Pesquisar</button>
 </div>
 </div>
    <br/>
    <table class="table" selectable :select-mode="selectMode">
      <thead>
        <tr>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Data/Hora
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Nome Material
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Classe Material
            </a>
          </th>
    <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Categoria Material
            </a>
          </th>
          <th scope="col">
            <a style="color: black" class="link-table" data-toggle="collapse" role="text" aria-expanded="false" aria-controls="collapseExample">
              Quantidade Estoque
            </a>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(agenda ,i) in filtrandoAgenda" :key="i">
          <td>{{agenda.data}}</td>
          <td>{{agenda.descricao}}</td>
          <td>{{agenda.material}}</td>
          <td>{{agenda.professor}}</td>
          <td width="9%" align="right">
            <button type="button" class="btnTable open" @click="show(agenda.id)" ></button>
            <button type="button" class="btnTable edit" @click="showEdit(agenda.id)" ></button>
            <button type="button" class="btnTable delete" @click="confirmDelete(agenda.id)" ></button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Search results -->
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
  

</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},

  mounted() {}
};
</script>

<style scoped>
i {
  color: #365c7b;
}
i:hover {
  color: var(--birorange);
}
</style>

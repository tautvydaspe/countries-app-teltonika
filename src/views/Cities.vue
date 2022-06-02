<template>
  <div id="cities">
        <div id="list">
            <h1>MIESTAI</h1>
            <div class="adding-form-wrap">
              <form class="adding-form" @submit.prevent="addCity">
            <h3>Įterpkite naują miestą:</h3>
            <input type="text" name="name" placeholder="Miesto pavadinimas">
            <input type="text" name="area" placeholder="Miesto kodas">
            <input type="text" name="population" placeholder="Miesto populiacija">
            <input type="text" name="postal_code" placeholder="Miesto pašto kodas">
            <input type="text" name="id" placeholder="Šalies ID">
            <button type="submit" id="submit-new">Įterpti</button>
        </form>
            </div>
        <TableContent :countries="this.cities" :tableHeader="this.tableHeader" :isCountry="false" @updated="getData(cities.meta.current_page)" ></TableContent>
        </div>
        <PagingNav :countries="this.cities" @paged="getData"></PagingNav>
  </div>
</template>

<script>

import PagingNav from '../components/PagingNav.vue'
import AddingCity from '../components/AddingCountry.vue'
import TableContent from '../components/TableContent.vue'

export default {
  name: 'cities',
  components:{
    PagingNav,
    AddingCity,
    TableContent
  },
  data(){
    return{
      cities:[],
      editable: false,
      isFirstGet:true,
      countryid:0,
      tableHeader:['Miestas','Miesto kodas','Populiacija','Pašto kodas','Redaguoti','Trinti']
    }
  },

  methods: {
    async getData(page) {
      if(this.isFirstGet){
        try {
          const response = await this.$http.get(
            "https://akademija.teltonika.lt/countries_api/api/countries/cities?page=" + page
          );
          this.cities = response.data;
          this.isFirstGet=false
        } catch (error) {
          console.log(error);
        }
      } else{
        if(page<=this.cities.meta.last_page && page>=1){
          try {
          const response = await this.$http.get(
            "https://akademija.teltonika.lt/countries_api/api/countries/cities?page=" + page
          );
          this.cities = response.data;
        } catch (error) {
          console.log(error);
        }
        }
      }
      
    },
   
   
   async addCity(submitEvent) {
     console.log(submitEvent.target.elements.name.value)
      try {
        const response = await this.$http.post(
          "https://akademija.teltonika.lt/countries_api/api/countries/"+submitEvent.target.elements.id.value+"/cities",
          {
            "data": {
              "attributes": {
                "name": submitEvent.target.elements.name.value,
                "area": submitEvent.target.elements.area.value,
                "population" : submitEvent.target.elements.population.value,
                "postal_code" : submitEvent.target.elements.postal_code.value
              }
            }
          }
        );
        let current_page=this.cities.meta.current_page
        this.getData(current_page)
      } catch (error) {
        console.log(error);
      }
  },
  newIDAssign(id){
    this.countryid=id
  }

  },

  created() {
    this.getData(1);
  },
};
</script>
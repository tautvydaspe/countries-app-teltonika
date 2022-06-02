<template>
  <div id="cities">

        <div id="list">
            <h1>MIESTAI</h1>
            
            <button class="adding-btn" @click="addCountry=true">+</button>
            <AddingCity :isCountry="false" :countryid="countryID" @submitted="onSubmitted" @close="addCountry=false" v-show="addCountry"></AddingCity>
            <input class="search-input" type="text" v-model="search" @keydown="searchCities" placeholder="Paieška">
        <TableContent :countries="this.cities" :tableHeader="this.tableHeader" :isCountry="false" @updated="getData(cities.meta.current_page)"></TableContent>

        </div>
        
        
        <PagingNav :countries="this.cities" @paged="getData"></PagingNav>
  </div>
</template>

<script>

import AddingCity from '../components/AddingCountry.vue'
import PagingNav from '../components/PagingNav.vue'
import TableContent from '../components/TableContent.vue'

export default {
  name: 'citiesNormal',
  components:{
    AddingCity,
    PagingNav,
    TableContent
  },
  data(){
    return{
        countryID:this.$route.params.id,
      cities:[],
      editable: false,
      isFirstGet:true,
      addCountry:false,
      countryid:0,
      search:'',
      tableHeader:['Miestas','Miesto kodas','Populiacija','Pašto kodas','Redaguoti','Trinti']
    }
  },

  methods: {
    async getData(page) {
      if(this.isFirstGet){
        try {
          const response = await this.$http.get(
            "https://akademija.teltonika.lt/countries_api/api/countries/"+ this.countryID +"/cities?page=" + page
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
            "https://akademija.teltonika.lt/countries_api/api/countries/"+ this.countryID +"/cities?page=" + page
          );
          this.cities = response.data;
        } catch (error) {
          console.log(error);
        }
        }
      }
      
    },
   
   
  onSubmitted(){
    this.getData(this.cities.meta.last_page)
    this.addCountry=false
  },

  async searchCities () {
    try {
        const response = await this.$http.get(
          "https://akademija.teltonika.lt/countries_api/api/countries/cities?search=" + this.search
        );
        this.cities = response.data;
        this.isFirstGet=false;
        } catch (error) {
          console.log(error);
        }
  }

  },

  created() {
    this.getData(1);
  },
};
</script>
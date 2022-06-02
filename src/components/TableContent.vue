<template>

<div>
  <h3>{{action}}</h3>
  <router-view></router-view>
  <table class="table">
  <thead>
    <tr>
      <th v-for="item in tableHeader" v-bind:key="item">{{item}}</th>
    </tr>
  </thead>
  <tbody >
    <tr v-for="country in countries.data" v-bind:key="country.id">
      <td v-for="(element,index) in country.attributes" v-bind:key="element._id"><router-link v-if="index=='name' && isCountry==true" @click="$emit('newID',country.id)" :to="{path: '/' + country.id}">{{element}}</router-link><p v-else>{{element}}</p></td>
      <td v-if="isCountry"><button class="del-edit" @click="onEditClickCountry(country.id)"><img src="../assets/edit.png" alt="Edit"></button></td>
      <td v-else><button class="del-edit" @click="onEditClick(country.id,country.relationships.country.data.id)"><img src="../assets/edit.png" alt="Edit"></button></td>
      <td v-if="isCountry"><button class="del-edit" @click="deleteCountry(country.id)"><img src="../assets/trash.png" alt="Delete"></button></td>
      <td v-else><button class="del-edit" @click="deleteCity(country.id,country.relationships.country.data.id)"><img src="../assets/trash.png" alt="Delete"></button></td>
    </tr> 

  </tbody>
            
            
            
</table>
<modal :editableCountryID="editableCountryID" :editableCityID="editableCityID" :isCountry="isCountry" @edited="onEdited" @close="editCountry=false" v-show="editCountry" ></modal>
</div>



 
    

    
</template>

<script>

import modal from './ModalEdit.vue'

export default {
    props:['countries','tableHeader','isCountry'],
    name: 'UpdateCountry',
    components:{
      modal
    },
    data() {
    return {
      search: '',
      editCountry: false,
      action:'',
      editableCityID:0,
      editableCountryID:0
    }
  },
    methods:{
  async deleteCountry(id) {
        try {
        const response = await this.$http.delete(
          "https://akademija.teltonika.lt/countries_api/api/countries/" + id,{}
        );
        this.$emit('updated');
        this.action='Trinimas atliktas'
      } catch (error) {
        console.log(error);
        this.action='Trinimas nepavyko'
      }
  },
  onEdited(){
    this.$emit('updated');
    this.editCountry=false;

  },
  onEditClickCountry(id){
    this.editCountry=true;
    this.editableCountryID=id;
  },
  onEditClick(cityid,countryid){
    this.editCountry=true;
    this.editableCityID=cityid;
    this.editableCountryID=countryid;
  },
  async deleteCity(cityID, countryID) {
       console.log(countryID)
        try {
        const response = await this.$http.delete(
          "https://akademija.teltonika.lt/countries_api/api/countries/"+ countryID +"/cities/" + cityID,{}
        );
        this.$emit('updated');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
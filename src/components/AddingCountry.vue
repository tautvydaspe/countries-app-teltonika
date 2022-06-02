<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper" >
            <div class="modal-container" >

              <div class="modal-header">
                  Pridėjimas
                  <button id="close-btn" @click="$emit('close')">x</button>
              </div>

              <div class="modal-body">
                  <form class="adding-form" @submit.prevent="addCountry">
                    <input type="text" name="name" placeholder="Pavadinimas">
                    <input type="text" name="area" placeholder="Area kodas">
                    <input type="text" name="population" placeholder="Populiacija">
                    <input v-if="isCountry" type="text" name="phone_code" placeholder="Kodas">
                    <input v-else type="text" name="postal_code" placeholder="Kodas">
                    <button type="submit" id="submit-new">Įterpti</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
    name: 'AddingCountry',
    props:['isCountry','countryid'],
    methods:{
    async addCountry(submitEvent) {
     if(this.isCountry){
       try {
        const response = await this.$http.post(
          "https://akademija.teltonika.lt/countries_api/api/countries",
          {
            "data": {
              "attributes": {
                "name": submitEvent.target.elements.name.value,
                "area": submitEvent.target.elements.area.value,
                "population" : submitEvent.target.elements.population.value,
                "phone_code" : submitEvent.target.elements.phone_code.value
              }
            }
          }
        );
        this.onSubmitted()
      } catch (error) {
        console.log(error);
        this.$emit('submitted','Nepavyko sukurti naujo įrašo');
      }
     }else{
       try {
        const response = await this.$http.post(
          "https://akademija.teltonika.lt/countries_api/api/countries/"+this.countryid+"/cities",
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
        this.onSubmitted()
      } catch (error) {
        console.log(error);
          this.$emit('submitted','Nepavyko sukurti naujo įrašo');
      }
     }
      
  },
  onSubmitted() {
      this.$emit('submitted','Sėkmingai sukurtas įrašas.');
  }
    }
}
</script>
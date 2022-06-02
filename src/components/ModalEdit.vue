<template>
        <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper" >
            <div class="modal-container" >

              <div class="modal-header">
                  Redagavimas
                  <button id="close-btn" @click="$emit('close')">x</button>
              </div>

              <div class="modal-body">
                <form class="update-form"  @submit.prevent="updateCountry">
                    <input type="text" name="name" placeholder="Pavadinimas">
                    <input type="text" name="area" placeholder="Area kodas">
                    <input type="text" name="population" placeholder="Populiacija">
                    <input v-if="isCountry" type="text" name="phone_code" placeholder="Kodas">
                    <input v-else type="text" name="postal_code" placeholder="Kodas">
                    <button type="submit" id="update-btn">Redaguoti</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
    name: 'modal',
    props:['editableCountryID','editableCityID','isCountry'],
    methods:{
        async updateCountry(submitEvent) {
            console.log(this.isCountry)
            if(this.isCountry){
                try {
            const response = await this.$http.put(
            "https://akademija.teltonika.lt/countries_api/api/countries/" + this.editableCountryID,
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
            this.onEdited()
            this.action='Redagavimas atliktas';
        } catch (error) {
            console.log(error);
            this.action='Redagavimas nepavyko';
        }
            } else{
                try {
        const response = await this.$http.put(
          "https://akademija.teltonika.lt/countries_api/api/countries/" + this.editableCountryID + "/cities/" + this.editableCityID,
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
        this.onEdited()
      } catch (error) {
        console.log(error);
      }
            }
            
        },
        onEdited() {
            this.$emit('edited');
        }
    }
}
</script>
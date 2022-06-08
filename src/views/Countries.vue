<template>
  <div id="countries">
    <div id="list">
      <h1>ŠALYS</h1>
      <button class="adding-btn" @click="addCountry = true">+</button>
      <h3>{{ action }}</h3>
      <AddingForm
        :isCountry="true"
        @submitted="onSubmitted"
        @close="addCountry = false"
        v-show="addCountry"
      ></AddingForm>
      <input
        class="search-input"
        type="text"
        v-model="search"
        @keydown="searchCountries"
        placeholder="Paieška"
      />
      <TableContent
        :countries="this.countries"
        :tableHeader="this.tableHeader"
        :isCountry="true"
        @updated="onUpdated"
      ></TableContent>
    </div>
    <PagingNav :countries="this.countries" @paged="getData"></PagingNav>
  </div>
</template>

<script>
import AddingForm from "../components/AddingForm.vue";
import TableContent from "../components/TableContent.vue";
import PagingNav from "../components/PagingNav.vue";

export default {
  name: "countries",
  components: {
    AddingForm,
    TableContent,
    PagingNav
  },
  data() {
    return {
      countries: [],
      cities: [],
      tableHeader: [
        "Šalis",
        "Šalies kodas",
        "Populiacija",
        "Telefono kodas",
        "Redaguoti",
        "Trinti"
      ],
      editable: false,
      search: "",
      isFirstGet: true,
      showModal: false,
      addCountry: false,
      action: ""
    };
  },

  methods: {
    async getData(page) {
      if (this.isFirstGet) {
        try {
          const response = await this.$http.get(
            "https://akademija.teltonika.lt/countries_api/api/countries?page=" +
              page
          );
          this.countries = response.data;
          this.isFirstGet = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        if (page <= this.countries.meta.last_page && page >= 1) {
          try {
            const response = await this.$http.get(
              "https://akademija.teltonika.lt/countries_api/api/countries?page=" +
                page
            );
            this.countries = response.data;
            this.isFirstGet = false;
          } catch (error) {
            console.log(error);
          }
        }
      }
    },

    onSubmitted(action) {
      this.getData(this.countries.meta.last_page);
      this.addCountry = false;
      this.action = action;
    },

    onUpdated(action) {
      this.getData(this.countries.meta.current_page);
      this.action = action;
    },

    async searchCountries() {
      try {
        const response = await this.$http.get(
          "https://akademija.teltonika.lt/countries_api/api/countries?search=" +
            this.search
        );
        this.countries = response.data;
        this.isFirstGet = false;
      } catch (error) {
        console.log(error);
      }
    }
  },

  created() {
    this.getData(1);
  }
};
</script>

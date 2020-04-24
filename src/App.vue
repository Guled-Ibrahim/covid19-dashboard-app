<template>
  <div id="app" class="container mx-auto h-screen">
    <div class="text-center mt-32">
      <h1 class="text-3xl font-bold tracking-wide">COVID-19 TRACKER</h1>
      <h1 class="text-gray-500">Track the spread of the Covid-19 outbreak</h1>
    </div>
    <div class="grid gap-8 row-gap-8 grid-cols-2 mt-12 m-16">
      <Card
        cardTitle="total cases"
        :cardNumber="today.all.cases"
        cardIcon="https://img.icons8.com/color/48/000000/coronavirus.png"
        :yesterTotal="yesterday.all.cases"
      />
      <Card
        cardTitle="total deaths"
        :cardNumber="today.all.deaths"
        cardIcon="https://img.icons8.com/color/48/000000/headstone.png"
        :yesterTotal="yesterday.all.deaths"
      />
      <Card
        cardTitle="total recoveries"
        :cardNumber="today.all.recovered"
        cardIcon="https://img.icons8.com/color/48/000000/walking.png"
        :yesterTotal="yesterday.all.recovered"
      />
      <Card
        cardTitle="total active"
        :cardNumber="today.all.active"
        cardIcon="https://img.icons8.com/color/48/000000/hospital-room--v1.png"
        :yesterTotal="yesterday.all.active"
      />
    </div>
    <div class="flex justify-center ml-16 mr-16">
      <input
        v-model="input"
        type="text"
        placeholder="search by country"
        class="w-full rounded shadow p-5"
        v-on:keyup.enter="searchCountry()"
      />
    </div>
    <div class="flex justify-center mt-5 mb-5">
      <Table
        :data="country.data"
        :showAllData="showAllData"
        :showFilteredData="showFilteredData"
        :filteredData="filteredData"
      />
    </div>
  </div>
</template>

<script>
import "../node_modules/@fortawesome//fontawesome-free/css/all.css";
import axios from "axios";

import Card from "../src/components/Card";
import Table from "./components/Table";

export default {
  data() {
    return {
      input: "",
      showAllData: true,
      showFilteredData: false,
      filteredData: {},
      country: {
        data: []
      },
      today: {
        all: {
          cases: 0,
          deaths: 0,
          recovered: 0,
          active: 0
        }
      },
      yesterday: {
        all: {
          cases: 0,
          deaths: 0,
          recovered: 0,
          active: 0
        }
      }
    };
  },
  components: {
    Card,
    Table
  },
  methods: {
    searchCountry() {
      axios
        .get(
          "https://corona.lmao.ninja/v2/countries/" +
            this.input +
            "?yesterday=false"
        )
        .then(res => {
          this.filteredData = res;
        });
      (this.showAllData = false), (this.showFilteredData = true);
    }
  },
  mounted() {
    axios.get("https://corona.lmao.ninja/v2/all").then(res => {
      this.today.all.cases = res.data.cases;
      this.today.all.deaths = res.data.deaths;
      this.today.all.recovered = res.data.recovered;
      this.today.all.active = res.data.active;
    });
    axios
      .get("https://corona.lmao.ninja/v2/historical/all?lastdays=1")
      .then(res => {
        let key = Object.keys(res.data.cases).toString();
        this.yesterday.all.cases = res.data.cases[key];
        this.yesterday.all.deaths = res.data.deaths[key];
        this.yesterday.all.recovered = res.data.recovered[key];
      });
    axios
      .get("https://corona.lmao.ninja/v2/continents?yesterday=true&sort=active")
      .then(res => {
        let total = 0;
        for (let key in res.data) {
          total += res.data[key].active;
        }
        this.yesterday.all.active = total;
      });
    axios
      .get("https://corona.lmao.ninja/v2/countries?yesterday=false")
      .then(res => {
        for (let country of res.data) {
          this.country.data.push(country);
        }
        this.showAllData = true;
      });
  }
};
</script>

<style lang="stylus" scoped></style>

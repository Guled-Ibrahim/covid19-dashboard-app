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
    <div class="ml-16">
      <h1 class="text-3xl font-semibold mb-5">Country Breakdown</h1>
      <input
        type="text"
        placeholder="search"
        class="mb-5 appearance-none bg-transparent border-b-2 border-gray-700 focus:border-blue-500 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      <Table />
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
  methods: {},
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
        console.log(res.data.recovered[key]);
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
  },
  computed: {}
};
</script>

<style lang="stylus" scoped></style>

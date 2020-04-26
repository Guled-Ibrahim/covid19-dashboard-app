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
        class="w-full rounded shadow p-5 capitalize"
      />
    </div>
    <div class="flex justify-center mt-5 mb-5">
      <table class="table-auto border-collapse flex-grow ml-16 mr-16 bg-white shadow">
        <thead>
          <tr>
            <th class="px-4 py-2">Rank</th>
            <th class="px-4 py-2">
              <div class="flex">
                Country
                <div class="flex p-0 m-0">
                  <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortCountryByDesc(country.data)"></i>
                  <i
                    class="fas fa-arrow-down mt-1 ml-2"
                    v-on:click="sortCountryByAsc(country.data)"
                  ></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Cases
                <div class="flex p-0 m-0">
                  <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortCasesByDesc(country.data)"></i>
                  <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortCasesByAsc(country.data)"></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Deaths
                <div class="flex p-0 m-0">
                  <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortDeathsByDesc(country.data)"></i>
                  <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortDeathsByAsc(country.data)"></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Critical
                <div class="flex p-0 m-0">
                  <i
                    class="fas fa-arrow-up mt-1 ml-2"
                    v-on:click="sortCriticalByDesc(country.data)"
                  ></i>
                  <i
                    class="fas fa-arrow-down mt-1 ml-2"
                    v-on:click="sortCriticalByAsc(country.data)"
                  ></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Recovered
                <div class="flex p-0 m-0">
                  <i
                    class="fas fa-arrow-up mt-1 ml-2"
                    v-on:click="sortRecoveredByDesc(country.data)"
                  ></i>
                  <i
                    class="fas fa-arrow-down mt-1 ml-2"
                    v-on:click="sortRecoveredByAsc(country.data)"
                  ></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Today's Cases
                <div class="flex p-0 m-0">
                  <i
                    class="fas fa-arrow-up mt-4 ml-2"
                    v-on:click="sortTodayCasesByDesc(country.data)"
                  ></i>
                  <i
                    class="fas fa-arrow-down mt-4 ml-2"
                    v-on:click="sortTodayCasesByAsc(country.data)"
                  ></i>
                </div>
              </div>
            </th>
            <th class="px-4 py-2">
              <div class="flex">
                Today's Deaths
                <div class="flex p-0 m-0">
                  <i
                    class="fas fa-arrow-up mt-4 ml-2"
                    v-on:click="sortTodayDeathByDesc(country.data)"
                  ></i>
                  <i
                    class="fas fa-arrow-down mt-4 ml-2"
                    v-on:click="sortTodayDeathByAsc(country.data)"
                  ></i>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in filteredCountry" :key="country.countryInfo._id">
            <td class="border px-4 py-2">{{index +1}}</td>
            <td class="border px-4 py-2">
              <div class="flex">
                <img :src="country.countryInfo.flag" class="object-contain w-6 h-4 mr-4" alt />
                {{country.country}}
              </div>
            </td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.cases | numeralFormat}}</td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.deaths| numeralFormat}}</td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.critical| numeralFormat}}</td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.recovered| numeralFormat}}</td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.todayCases| numeralFormat}}</td>
            <td
              class="border px-4 py-2 tracking-wide font-hairline text-sm"
            >{{country.todayDeaths| numeralFormat}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "../node_modules/@fortawesome//fontawesome-free/css/all.css";
import axios from "axios";
import Card from "../src/components/Card";

export default {
  data() {
    return {
      input: "",
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
    Card
  },
  methods: {
    sortCasesByDesc(arr) {
      arr.sort((a, b) => {
        if (a.cases > b.cases) {
          return -1;
        }
      });
    },
    sortCasesByAsc(arr) {
      arr.sort((a, b) => {
        if (b.cases > a.cases) {
          return -1;
        }
      });
    },
    sortDeathsByDesc(arr) {
      arr.sort((a, b) => {
        if (a.deaths > b.deaths) {
          return -1;
        }
      });
    },
    sortDeathsByAsc(arr) {
      arr.sort((a, b) => {
        if (b.deaths > a.deaths) {
          return -1;
        }
      });
    },
    sortCriticalByDesc(arr) {
      arr.sort((a, b) => {
        if (a.critical > b.critical) {
          return -1;
        }
      });
    },
    sortCriticalByAsc(arr) {
      arr.sort((a, b) => {
        if (b.critical > a.critical) {
          return -1;
        }
      });
    },
    sortRecoveredByDesc(arr) {
      arr.sort((a, b) => {
        if (a.recovered > b.recovered) {
          return -1;
        }
      });
    },
    sortRecoveredByAsc(arr) {
      arr.sort((a, b) => {
        if (b.recovered > a.recovered) {
          return -1;
        }
      });
    },
    sortCountryByDesc(arr) {
      arr.sort((a, b) => {
        if (a.country > b.country) {
          return -1;
        }
      });
    },
    sortCountryByAsc(arr) {
      arr.sort((a, b) => {
        if (b.country > a.country) {
          return -1;
        }
      });
    },
    sortTodayCasesByDesc(arr) {
      arr.sort((a, b) => {
        if (a.todayCases > b.todayCases) {
          return -1;
        }
      });
    },
    sortTodayCasesByAsc(arr) {
      arr.sort((a, b) => {
        if (b.todayCases > a.todayCases) {
          return -1;
        }
      });
    },
    sortTodayDeathByDesc(arr) {
      arr.sort((a, b) => {
        if (a.todayDeaths > b.todayDeaths) {
          return -1;
        }
      });
    },
    sortTodayDeathByAsc(arr) {
      arr.sort((a, b) => {
        if (b.todayDeaths > a.todayDeaths) {
          return -1;
        }
      });
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
  },
  computed: {
    filteredCountry() {
      return this.country.data.filter(country => {
        return country.country.match(
          this.input.charAt(0).toUpperCase() + this.input.slice(1)
        );
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>

<template>
  <table class="table-auto border-collapse flex-grow ml-16 mr-16 bg-white shadow">
    <thead>
      <tr>
        <th class="px-4 py-2">Rank</th>
        <th class="px-4 py-2">
          <div class="flex">
            Country
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortCountryByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortCountryByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Cases
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortCasesByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortCasesByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Deaths
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortDeathsByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortDeathsByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Critical
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortCriticalByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortCriticalByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Recovered
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-1 ml-2" v-on:click="sortRecoveredByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-1 ml-2" v-on:click="sortRecoveredByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Today's Cases
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-4 ml-2" v-on:click="sortTodayCasesByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-4 ml-2" v-on:click="sortTodayCasesByAsc(data)"></i>
            </div>
          </div>
        </th>
        <th class="px-4 py-2">
          <div class="flex">
            Today's Deaths
            <div class="flex p-0 m-0">
              <i class="fas fa-arrow-up mt-4 ml-2" v-on:click="sortTodayDeathByDesc(data)"></i>
              <i class="fas fa-arrow-down mt-4 ml-2" v-on:click="sortTodayDeathByAsc(data)"></i>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(country, index) in data" :key="country.countryInfo._id" v-show="showAllData">
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

      <tr
        v-for="(country, index) in filteredData.data"
        :key="country.countryInfo._id"
        v-show="showFilteredDatas"
      >
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
</template>
<script>
export default {
  props: {
    data: Array,
    input: String,
    filteredData: Object,
    showAllData: Boolean,
    showFilteredData: Boolean
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
  computed: {}
};
</script>
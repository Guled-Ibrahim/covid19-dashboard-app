<template>
  <table class="table-auto border-collapse flex-grow ml-16 mr-16 bg-white shadow">
    <thead>
      <tr>
        <th class="px-4 py-2">Rank</th>
        <th class="px-4 py-2">Country</th>
        <th class="px-4 py-2">
          <div class="flex">
            Cases
            <img
              src="https://img.icons8.com/android/24/000000/sort.png"
              class="ml-2"
              v-on:click="sortByCases"
            />
          </div>
        </th>
        <th class="px-4 py-2">Deaths</th>
        <th class="px-4 py-2">Critical</th>
        <th class="px-4 py-2">Recovered</th>
        <th class="px-4 py-2">Today's Cases</th>
        <th class="px-4 py-2">Today's Deaths</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(country, index) in data" :key="country.countryInfo._id">
        <td class="border px-4 py-2">{{index +1}}</td>
        <td class="border px-4 py-2">
          <div class="flex">
            <img :src="country.countryInfo.flag" class="object-contain w-6 h-4 mr-4" alt />
            {{country.country}}
          </div>
        </td>
        <td class="border px-4 py-2">{{country.cases}}</td>
        <td class="border px-4 py-2">{{country.deaths}}</td>
        <td class="border px-4 py-2">{{country.critical}}</td>
        <td class="border px-4 py-2">{{country.recovered}}</td>
        <td class="border px-4 py-2">{{country.todayCases}}</td>
        <td class="border px-4 py-2">{{country.todayDeaths}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    data: Array
  },
  methods: {
    sortByCases() {
      this.data.console.log(this.data[0].cases);
    }
  },
  computed: {}
};
</script>
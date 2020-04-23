<template>
  <div class="bg-white col-span-1 rounded shadow-lg">
    <h1 class="text-base font-semibold text-gray-500 uppercase ml-4 mt-4">
      {{cardTitle}}
      <span class="float-right">
        <img :src="cardIcon" class="object-contain mr-4 mt-2" />
      </span>
    </h1>
    <h1 class="text-3xl font-bold tracking-wide ml-4">{{ cardNumber | numeralFormat }}</h1>
    <p></p>
    <div class="flex" v-show=" cardTitle != 'total recoveries'">
      <h1
        :class="{'bg-red-500':calcPercentageStatus === 'increase' ,'bg-green-500':calcPercentageStatus==='decrease'}"
        class="text-white font-bold text-center tracking-wide rounded w-32 ml-4 mt-4 mb-8 p-1 col-span-1 shadow"
      >{{Math.round(calcPercentage)}}% {{calcPercentageStatus}}</h1>
      <h1 class="m-5 text-gray-500 text-sm">
        from yesterday's total
        <span class="font-bold">({{yesterTotal | abbreviate }})</span>
      </h1>
    </div>
    <div v-show="cardTitle === 'total recoveries'" class="flex">
      <h1
        :class="{'bg-green-500':calcPercentageStatus == 'increase' ,'bg-red-500':calcPercentageStatus=='decrease'}"
        class="text-white font-bold text-center tracking-wide rounded w-32 ml-4 mt-4 mb-8 p-1 col-span-1 shadow"
      >{{Math.round(calcPercentage)}}% {{calcPercentageStatus}}</h1>
      <h1 class="m-5 text-gray-500 text-sm">
        from yesterday's total
        <span class="font-bold">({{yesterTotal | abbreviate }})</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: String,
    cardNumber: Number,
    cardIcon: String,
    cardPercentage: Number,
    yesterTotal: Number
  },
  data() {
    return {
      increasePercenageColor: true,
      decreasePercenageColor: false
    };
  },
  methods: {
    percentageIncrease() {
      let increase = this.cardNumber - this.yesterTotal;
      let percentage = (increase / this.yesterTotal) * 100;
      return percentage;
    },
    percentageDecrease() {
      let decrease = this.yesterTotal - this.cardNumber;
      let percentage = (decrease / this.yesterTotal) * 100;
      return percentage;
    }
  },
  computed: {
    calcPercentage() {
      if (this.cardNumber > this.yesterTotal) {
        return this.percentageIncrease();
      } else {
        return this.percentageDecrease();
      }
    },
    calcPercentageStatus() {
      if (this.cardNumber > this.yesterTotal) {
        return "increase";
      } else {
        return "decrease";
      }
    }
  }
};
</script>
import Vue from 'vue'
import App from './App.vue'
import VueNumerals from "vue-numerals";
import vueNumeralFilterInstaller from 'vue-numeral-filter';

Vue.config.productionTip = false
Vue.use(VueNumerals);
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });


new Vue({
  render: h => h(App),
}).$mount('#app')

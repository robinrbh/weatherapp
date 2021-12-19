<template>
  <div id="app">
      <div class="container">
        <div>
          <WeatherCard />
        </div>
      </div>
  </div>
</template>

<script>
import BackendService from '@/services/BackendService'
const WeatherCard = () => import('@/components/WeatherCard.vue')

export default {
  name: 'App',
  data() { 
    return {
      query: "Groningen",
      weather: "",
      forecast: [],
      error: false
    }
  },
  components: {
    WeatherCard,
  },
  methods: {
    getWeather() {
      BackendService.fetchWeather(this.query)
        .then((response) => {
          this.weather = response.data
        }, () => {
          this.error = true
            setTimeout(() => {
              this.error = false;
            }, 1000);
        })
    },
    getForecast() {
      BackendService.fetchForecast(this.query)
        .then((response) => {
          this.forecast = response.data.list
        }, () => {
          this.error = true
            setTimeout(() => {
              this.error = false;
            }, 1000);
        })
    }
  },
}
</script>

<style>

</style>
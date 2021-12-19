<template>
  <div class="weather-data" v-if="weather">
    <div class="weather-left" :class="backgroundImage">
      <h2 class="city">{{ weather.name }}, {{ weather.sys.country }}</h2>
      <p class="temp">{{ weather.main.temp | round }}&deg;C</p>
      <inline-svg class="icon" :src="require(`../assets/img/icons/${weather.weather[0].icon}.svg`)"></inline-svg> 
    </div>
    <div class="weather-right">
      <h1>Vind het weer in jouw stad</h1>
      <div class="inputContainer">
        <input 
          placeholder="Typ een stad..."
          v-model="query"
          type="text" 
          @input="getSuggestions"
          @keyup.enter="userWantsSuggestionOrWeather"
        />
        <span class="suggestion">{{suggestion}}</span>
      </div>
      <div v-if="error">
        <p>Van deze stad kon helaas het weer niet gevonden worden. </p>
      </div>
      <div v-if="!error">
        <p>Voelt aan als: {{ weather.main.feels_like | round }} graden</p>
        <p>Minimum: {{ weather.main.temp_min | round }} graden</p>
        <p>Maximum: {{ weather.main.temp_max | round }} graden</p>

        <h3>Weervoorspelling</h3>
        <div class="forecast" v-for="(day, i) in forecast" :key="i">
          <p>{{ day.dt | convertDate }}: {{ day.main.temp | round }} graden</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackendService from '@/services/BackendService'
import moment from 'moment';

export default {
  name: "WeatherCard",
  data() {
    return {
      query: "Groningen",
      weather: "",
      forecast: "",
      error: false,
      suggestion: "",
    }
  },
  mounted() {
    this.getWeather()
    this.getForecast()
  },
  methods: {
    userWantsSuggestionOrWeather(){
      if(this.suggestion !== this.query){
        this.query = this.suggestion;
      } else {
        this.getWeather();
        this.getForecast()
      }
    },
    getSuggestions() {
      const city = this.query.toLowerCase()

      const firstSuggestion = this.suggestionsFromInput(city)[0]
      const suggestionLeftOver = this.suggestionMinusInput(firstSuggestion, city) || ''

      this.suggestion = city + suggestionLeftOver
    },
    suggestionsFromInput(query) {
      const suggestions = ['Amsterdam', 'Maastricht', 'Maaskantje', 'Den Bosch']

      return suggestions.map(x => {
        const value = x.toLowerCase()
        if(value.includes(query)){
          return x
        } else {
          return null
          }
      }).filter(x => x !== null)
    },
    suggestionMinusInput(suggestion, input) {
      const leftOvertoShow = suggestion?.substring(input.length, suggestion.length)
      if(input) {
        return leftOvertoShow
      }
    },
    getWeather() {
      BackendService.fetchWeather(this.query)
        .then((response) => {
          this.weather = response.data
        }, () => {
          this.error = true
          setTimeout(() => {
            this.error = false;
          }, 5000);
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
          }, 5000);
        })
    }
  },
  computed: {
    backgroundImage() {
      let className = "normal"

      if(this.weather && this.weather.main.temp < 0) {
        className = 'cold'
      } else if (this.weather && this.weather.main.temp > 20) {
        className = 'warm'
      }

      return className
    }
  },
  filters: {
     convertDate (value) { 
      if (value) {
        return moment((value) * 1000).format('DD-MM-YYYY HH:mm')
      }
    },
    round (value) {
      if (!value) return ''
      return Math.round(value)
    },
  },
}
</script>

<style lang="" scoped>
  
</style>
<template>
  <div id="app">
      <div class="container">
        <div v-if="weather" class="weather-data">
          <div class="weather-left" :class="backgroundImage">
            <h2 class="city">{{ weather.name }}, {{ weather.sys.country }}</h2>
            <p class="temp">{{ weather.main.temp | round }}&deg;C</p>
            <inline-svg class="icon" :src="require(`./assets/img/icons/${weather.weather[0].icon}.svg`)"></inline-svg> 
          </div>
          <div class="weather-right">
            <h1>Vind het weer in jouw stad</h1>
            <div class="inputContainer">
            <input class="input"
              placeholder="Typ een stad..."
              v-model="query"
              type="text" 
              @input="getSuggestions()"
              @keyup.enter="userWantsSuggestionOrWeather()"
            />
              <span class="suggestion">{{suggestion}}</span>
            </div>
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
  </div>

</template>

<script>
import BackendService from './services/BackendService'
import moment from 'moment';

export default {
  name: 'App',
  data() { 
    return {
      query: "Groningen",
      weather: "",
      forecast: "",
      error: false,
      suggestion: '',
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
    },
    getSuggestions() {
      const firstSuggestion = this.suggestionsFromInput(this.query)[0]
      const suggestionLeftOver = this.suggestionMinusInput(firstSuggestion, this.query) || ''

      this.suggestion = this.query + suggestionLeftOver
    },
    suggestionsFromInput(query) {
      const suggestions = ['Amsterdam', 'Maastricht', 'Maaskantje', 'Den Bosch']
      
      return suggestions.map(x => {
        if(x.includes(query)){
          return x
        } else {
          return null
          }
      }).filter(x => x !== null)
    },
    suggestionMinusInput(suggestion, input) {
      const  leftOvertoShow = suggestion?.substring(input.length, suggestion.length)
      if(input){
        return leftOvertoShow
      }
    },
  },
  filters: {
    round (value) {
      if (!value) return ''
      return Math.round(value)
    },
    convertDate (value) { 
      if (value) {
        return moment((value) * 1000).format('DD-MM-YYYY HH:mm')
      }
    }
  },
  computed: {
    backgroundImage() {
      let className = "warm"

      if(this.weather && this.weather.main.temp < 16) {
        className = 'cold'
      }

      return className
    }
  }
}
 </script>

<style>

</style>

<template>
  <div id="app">
    <div class="container">
      <h1>Find your weather</h1>
      <input 
        placeholder="Typ een stad..."
        v-model="query"
        type="text" 
        @keyup.enter="getWeather"
      />
      <p v-if="error">Deze stad is niet gevonden.</p>

      <div class="weather-data" v-if="weather">
      <!-- <Icon :name="weather.weather.description" /> -->
        <h1>{{ weather.name }}</h1>
        <div class="weather-left">
          <p class="temp">{{ Math.round(weather.main.temp) }} C</p>
        </div>
        <div class="weather-right">
          <inline-svg :src="require(`./assets/img/icons/${weather.weather[0].icon}.svg`)"></inline-svg> 
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import BackendService from './services/BackendService'

export default {
  name: 'App',
  data() { 
    return {
      query: "",
      weather: "",
      error: false
    }
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
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 600px;
  justify-content: center;
  margin: 0 auto;
}

.weather-data {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
}

.weather-left {
  flex-grow: 1;
}

.weather-right {
  flex-grow: 1;
}

p.temp {
  font-size: 60px;
}

input {
  width: 100%;
  padding: 15px;
  border-radius: 15px;
}

svg {
  padding: 15px;
  position: relative;
  margin: 0 auto;
}

path {
  fill: #3A4D97;
}
</style>
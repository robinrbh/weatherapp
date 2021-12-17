<template>
  <div id="app">
    <div class="container" :class="backgroundImage">
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
  created() {
    this.getWeather()
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
html, body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.warm {
  background: url("https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  background-size: cover;
}

.cold {
  background: url("https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
}

.container {
  width: 900px;
  min-height: 650px;
  justify-content: center;
  margin: 0 auto;
  background-position: bottom;
  transition: 0.4s;
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
  width: 60%;
  padding: 15px;
  border-radius: 15px;
  margin: 0 auto;
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
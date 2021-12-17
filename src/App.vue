<template>
  <div id="app">
      <div class="container">
        <h1>Vind het weer in jouw stad</h1>
        <input 
          placeholder="Typ een stad..."
          v-model="query"
          type="text" 
          @keyup.enter="getWeather"
        />
        <p v-if="error">Deze stad is niet gevonden.</p>

        <div v-if="weather" class="weather-data">
          <div class="weather-left" :class="backgroundImage">
            <h2 class="city">{{ weather.name }}</h2>
            <p class="temp">{{ Math.round(weather.main.temp) }} C</p>
            <inline-svg class="icon" :src="require(`./assets/img/icons/${weather.weather[0].icon}.svg`)"></inline-svg> 
          </div>
          <div class="weather-right">
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
  background: #3A4D97;
  color: white;
  display: flex;
  align-items: center;
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
  min-height: 100vh;
  margin: 0 auto;
  align-items: center;
}

.weather-data {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

.weather-left {
  width: 40%;
  min-height: 400px;
  background-position: bottom;
  transition: 0.4s;
  border-radius: 25px;
  text-align: left;
  position: relative;
  -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
	box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
	-webkit-transform: scale(1.1) perspective(1500px) rotateY(10deg);
	transform: scale(1.1) perspective(1500px) rotateY(10deg);
  z-index: 9;
}

.weather-right {
  width: 60%;
  height: 300px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  border-radius: 0 15px 15px 0;
}

svg {
  filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .5));
}

h1, h2, h3, h4, p {
  padding: 0;
  margin: 0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
}

h1 {
  margin-top: 1em;
}

h2.city {
  position: absolute;
  left: 25px;
  top: 25px;
}

p.temp {
  font-size: 60px;
  position: absolute;
  left: 25px;
  bottom: 25px;
}

.icon {
  position: absolute;
  top: 40px;
}

input {
  width: 60%;
  padding: 15px;
  border-radius: 15px;
  margin: 0 auto;
}

path {
  fill: white;
}
</style>
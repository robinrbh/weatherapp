import axios from "axios"

const apiKey = "9f0c8c81dcbb5d905af5e5ef135981ab"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&`

export default {
  fetchWeather(query) {
    return axios.get(apiUrl, {
      params: {
        q: query
      }
    })
  }
}
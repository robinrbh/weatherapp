import axios from "axios"

const apiKey = process.env.VUE_APP_API_KEY
const apiUrl = `https://api.openweathermap.org/data/2.5/`

const apiClient = axios.create({
  baseURL: apiUrl,
  params: {
      appid: apiKey,
      units: "metric"
  }
});

export default {
  fetchWeather(query) {
    return apiClient.get("/weather", {
      params: {
        q: query
      }
    })
  }, 
  fetchForecast(query) {
    return apiClient.get("/forecast", {
      params: {
        q: query,
        cnt: 3
      }
    })
  }
}
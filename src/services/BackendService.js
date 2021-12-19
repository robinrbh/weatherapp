import axios from "axios"

const apiKey = "9f0c8c81dcbb5d905af5e5ef135981ab"
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
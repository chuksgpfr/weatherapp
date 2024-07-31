import axios from 'axios'

export const weatherConnect = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: 'https://api.openweathermap.org',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

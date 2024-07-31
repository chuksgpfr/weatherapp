// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cities from '../config/cities.json'
import { weatherConnect } from '@/config/axios.config'

export const useLocationStore = defineStore('location', {
  state: () => ({
    cities,
    currentLocation: '',
    city: null,
    weather: null,
    isLoading: false,
    showMore: false,
    error: null
  }),
  actions: {
    setCurrentLocation(location) {
      this.currentLocation = location
      this.city = this.cities.find(
        (x) => x.City.toLowerCase() === this.currentLocation.toLowerCase()
      )
    },
    toggleShowMore() {
      this.showMore = !this.showMore
      this.$emit('update:showMore', !this.showMore)
    },

    async setWeather() {
      if (this.city) {
        try {
          this.isLoading = true
          const { data } = await weatherConnect.get(
            `/data/2.5/weather?lat=${this.city.Latitude}&lon=${this.city.Longitude}&appid=b388e73a37b30368475026f629de13ef`
          )
          this.weather = data
        } catch (error) {
          this.error = error
        } finally {
          this.isLoading = false
        }
      }
    }
  }
})

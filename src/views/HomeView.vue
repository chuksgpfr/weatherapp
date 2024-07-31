<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="@/assets/logo.svg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Select your location
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <div class="flex items-center justify-between">
            <label for="location" class="block text-sm font-medium leading-6 text-gray-900"
              >Type location here</label
            >
          </div>
          <div class="mt-2">
            <input
              @input="handleSelect"
              id="location"
              list="browsers"
              name="location"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <datalist id="browsers" onselect="">
              <option v-for="city in cities" :key="city.ID" :value="city.City">
                {{ city.Country }}
              </option>
            </datalist>
          </div>
        </div>

        <div>
          <ButtonComponent label="View Weather" />
        </div>
      </form>
      <div v-if="!isLoading && weather">
        <WeatherComponent
          :city="city"
          :weather="weather"
          :showMore="showMore"
          :toggleShowMore="toggleShowMore"
          :buttonLabel="buttonLabel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useLocationStore } from '../stores/locationsStore.js'
import ButtonComponent from '../components/ButtonComponent.vue'
import WeatherComponent from '../components/WeatherComponent.vue'

const { cities, showMore, city, weather, isLoading } = storeToRefs(useLocationStore())
const { setCurrentLocation, toggleShowMore, setWeather } = useLocationStore()

const handleSelect = (e) => {
  // this will be handled later
  setCurrentLocation(e.target.value)
  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     // this.location = {
  //     //   latitude: position.coords.latitude,
  //     //   longitude: position.coords.longitude,
  //     // };
  //     console.log(position)
  //   },
  //   (error) => {
  //     console.log(error)
  //   }
  // )
}

const handleSubmit = async () => {
  await setWeather()
}
// import DataList from '../components/DataList.vue'
</script>
<script>
export default {
  computed: {
    buttonLabel() {
      return this.showMore ? 'less' : 'more'
    }
  }
}
</script>

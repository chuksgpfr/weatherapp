<template>
  <ul>
    <li>
      Current Location:
      <small class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ city?.City }} - {{ city?.Country }}</small
      >
    </li>
    <li>
      Weather:
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{
        weather?.weather[0].main
      }}</small>
    </li>
    <li>
      Temperature:
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ weather.main.temp }}&deg;F
      </small>
    </li>
    <li>
      Today's high temperature
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{
        weather.main.temp_max
      }}</small>
    </li>
    <li>
      Today's low temperature
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ weather.main.temp_min }}
      </small>
    </li>
  </ul>
  <div class="mt-8">
    <ButtonComponent :label="buttonLabel" :click="toggleShowMore" />
  </div>
  <ul v-if="showMore">
    <li>
      Wind Speed
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ weather.wind.speed }}
      </small>
    </li>
    <li>
      Humidity
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ weather.main.humidity }}
      </small>
    </li>
    <li>
      Pressure
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ weather.main.pressure }}
      </small>
    </li>
    <li>
      Sunrise Time
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ new Date(weather.sys.sunrise * 1000) }}
      </small>
    </li>
    <li>
      Sunset Time
      <small v-if="weather" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >{{ new Date(weather.sys.sunset * 1000) }}
      </small>
    </li>
  </ul>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue'
</script>
<script setup>
defineProps({
  weather: {
    type: Object || null
  },
  city: {
    type: Object || null
  },
  buttonLabel: {
    type: Function
  },
  showMore: {
    type: Boolean
    // required: true
  },
  toggleShowMore: {
    type: Function
    // required: true
  }
})
</script>

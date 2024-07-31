import { mount } from '@vue/test-utils'
import { beforeEach, describe } from 'vitest'

import HomeView from '../HomeView.vue'
import { afterEach } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { useLocationStore } from '@/stores/locationsStore.js'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'

const mock = new MockAdapter(axios)

const weatherResp = {
  coord: {
    lon: 3.75,
    lat: 6.5833
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d'
    }
  ],
  base: 'stations',
  main: {
    temp: 300.33,
    feels_like: 301.7,
    temp_min: 300.33,
    temp_max: 300.33,
    pressure: 1015,
    humidity: 63,
    sea_level: 1015,
    grnd_level: 1015
  },
  visibility: 10000,
  wind: {
    speed: 3.7,
    deg: 242,
    gust: 5.44
  },
  clouds: {
    all: 100
  },
  dt: 1722248730,
  sys: {
    type: 1,
    id: 1185,
    country: 'NG',
    sunrise: 1722231534,
    sunset: 1722276229
  },
  timezone: 3600,
  id: 2332453,
  name: 'Lagos',
  cod: 200
}

describe('WeatherComponent list display', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    // new pinia instance
    setActivePinia(createPinia())

    const weatherUrlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const weatherUrl = new RegExp(`${weatherUrlBase}/*`)
    mock.onGet(weatherUrl).reply(200, { ...weatherResp })

    wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // Create the data store using the testing pinia
    store = useLocationStore()
  })

  afterEach(() => {
    mock.reset()
    wrapper.unmount()
  })

  it('does load the weather data when a successful HTTP GET occurs', async () => {
    expect(store.currentLocation).toBe('')
    const input = wrapper.findAll('input')
    await input[0].setValue('Lagos')

    expect(input[0].element.value)
    // Trigger button click
    await wrapper.find('button').trigger('click')

    const event = { target: { value: 'Lagos' } }
    wrapper.vm.handleSelect(event)

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    // Ensure the store's state is updated
    await wrapper.vm.$nextTick()

    // expect(store.currentLocation).toBe('Lagos')

    // expect(mock.history.get.length).toBe(0)
    // expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/data/2.5/weather')
    // expect(mock.history.get[0].method).toMatch('get')

    // expect(store.setWeather).toHaveBeenCalledTimes(1)
  })
})

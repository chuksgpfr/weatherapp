import { mount } from '@vue/test-utils'
import { beforeEach, describe } from 'vitest'

import WeatherComponent from '../WeatherComponent.vue'
import { afterEach } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'

describe('WeatherComponent list display', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(WeatherComponent, {
      propsData: {
        weather: {
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
        },
        city: {
          ID: 7218,
          Country: 'Nigeria',
          City: 'Lagos',
          Latitude: 6.4530556,
          Longitude: 3.3958333,
          Altitude: 35
        },
        // label: '',
        buttonLabel: () => {
          return this.showMore ? 'less' : 'more'
        },
        // buttonLabel: "more",
        showMore: false,
        toggleShowMore: () => {
          this.showMore = !this.showMore
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('has correct element before show more', () => {
    expect(wrapper.findAll('ul').length).toEqual(1)
    expect(wrapper.findAll('li').length).toEqual(5)
    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('li').at(0).text()).toMatch(`Current Location: Lagos - Nigeria`)
    expect(wrapper.findAll('li').at(1).text()).toMatch(`Weather: Clouds`)
    expect(wrapper.findAll('li').at(2).text()).toMatch(`Temperature: 300.33°F`)
  })

  it('shows more info about weather', async () => {
    // check if show more is false
    expect(wrapper.props().showMore).toBe(false)

    const button = wrapper.findAll('button')[0]

    await button.trigger('click')
    await wrapper.setProps({ showMore: true })

    expect(wrapper.findAll('ul').length).toEqual(2)
    expect(wrapper.findAll('li').length).toEqual(10)
  })
})

import { fbConfig } from '../config/firebase'
import { Permissions, Location } from 'expo'

const getLocation = async () => {
  // check app permissions for location data
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') return null

  // acquire current user location
  const location = await Location.getCurrentPositionAsync({})
  return location
}

const getAddressFromLocation = async location => {
  // generate REST URL
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    location.coords.latitude
  },${location.coords.longitude}&key=${fbConfig.apiKey}`

  // generate config options
  const fetchConfig = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }

  // fetch address from Google Maps APIs
  let address = await fetch(url, fetchConfig).then(res => {
    if (!res.ok) return null
    return JSON.parse(res._bodyText).results[0].formatted_address.toString()
  })

  return address
}

const getLocationFromAddress = async address => {
  // generate REST URL
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
    fbConfig.apiKey
  }`

  // generate config options
  const fetchConfig = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }

  // fetch location from Google Maps APIs
  let location = { coords: { latitude: 0, longitude: 0 } }
  await fetch(url, fetchConfig).then(res => {
    if (!res.ok) throw new Error('getLocationFromAddress API response was not ok.')
    res = JSON.parse(res._bodyText).results[0]
    location.coords.latitude = res.geometry.location.lat
    location.coords.longitude = res.geometry.location.lng
  })

  return location
}

export { getAddressFromLocation, getLocationFromAddress, getLocation }

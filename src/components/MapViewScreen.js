import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Keyboard, StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'
import { MapView, Location, Permissions } from 'expo'
import AddressSearchBar from '../components/AddressSearchBar'
import RequestListButton from '../components/RequestListButton'
import NightMapStyle from '../config/MapStyles/NightMapStyle.json'
import { MAP_REGN_CHNG, REQS_RECEIVE } from '../actions/types'
import { fetchRequestsNearMe } from '../actions/'

// constants
const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.009
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
}

class MapViewScreen extends Component {
  static propTypes = {
    setRegion: PropTypes.func.isRequired,
    setMarkers: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      initialRegion: null,
      region: null,
      address: null,
      markers: null,
      userLocation: null,
    }
  }

  componentDidMount() {
    if (!this.state.initialRegion) {
      this._getInitialDeviceLocation()
    }

    Location.watchPositionAsync(GEOLOCATION_OPTIONS, (location) => {
      this.setState({ userLocation: location })
    })
  }

  _getInitialDeviceLocation = async () => {
    this._checkLocationPermissions()
    // get current device location then set region to initialize map
    const locationData = await Location.getCurrentPositionAsync({})
    this._setRegion('initialRegion', locationData)
  }

  _checkLocationPermissions = async () => {
    // check app permissions for location data access
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        // errorMessage: 'Permission to access location was denied',
      })
    }
  }

  _setRegion = async (stateProp, location, animate = false) => {
    // generate region object
    const region = location.coords
      ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      : location

    const address = await this._getAddressFromLocation(region)
    const markers = await fetchRequestsNearMe(region, 20000).then((items) => {
      if (!items) this.props.setMarkers([])
      else this.props.setMarkers(items)
      return items
    })

    // set the state property
    if (stateProp === 'initialRegion' && !this.state.region) {
      this.setState({
        initialRegion: region,
        region,
        address,
        markers,
      })
    } else {
      this.setState({
        [stateProp]: region,
        address,
        markers,
      })
    }

    if (animate) {
      // move the map view to the region
      this._map.animateToRegion(region)
    }
  }

  _getAddressFromLocation = async (location) => {
    let addressResult
    // acquire address from location data via google api
    try {
      addressResult = await Location.reverseGeocodeAsync(location)
    } catch (error) {
      // console.log('error: ', error)
    }
    return addressResult[0]
  }

  render() {
    const { initialRegion, address, markers } = this.state
    if (!initialRegion || initialRegion.latitude === undefined) return null
    const markerTitle = address.name || 'My location'
    const markerDescription = `${address.street} ${address.city}` || false
    return (
      <View style={StyleSheet.absoluteFill}>
        <AddressSearchBar setMapRegion={this._setRegion} />
        <RequestListButton />
        <MapView
          ref={(map) => {
            this._map = map
          }}
          customMapStyle={NightMapStyle}
          followsUserLocation
          initialRegion={initialRegion}
          onPress={Keyboard.dismiss}
          onRegionChangeComplete={newRegion => this._setRegion('region', newRegion)}
          provider={MapView.PROVIDER_GOOGLE}
          showsBuildings={false}
          showsIndoors={false}
          showsMyLocationButton
          showsUserLocation
          style={StyleSheet.absoluteFill}
        >
          {/* <MapView.Marker
            coordinate={this.state.region}
            title={markerTitle}
            description={markerDescription}
          /> */}
          {markers
            ? markers.map(marker => (
              <MapView.Marker
                key={marker.number}
                coordinate={{
                    latitude: marker.service_location.coordinates[1],
                    longitude: marker.service_location.coordinates[0],
                  }}
                title={marker.number}
                description={marker.short_description}
              />
              ))
            : null}
        </MapView>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setRegion: region =>
    dispatch({
      type: MAP_REGN_CHNG,
      payload: region,
    }),
  setMarkers: markers =>
    dispatch({
      type: REQS_RECEIVE,
      payload: markers,
    }),
})

export default connect(
  null,
  mapDispatchToProps,
)(MapViewScreen)

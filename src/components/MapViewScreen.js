import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Keyboard, StyleSheet, Dimensions, View } from 'react-native'
import { MapView, Location, Permissions } from 'expo'
import AddressSearchBar from '../components/AddressSearchBar'
import NightMapStyle from '../config/MapStyles/NightMapStyle.json'
import { MAP_REGN_CHNG } from '../actions/types'

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
  static propType = {
    setRegion: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      initialRegion: null,
      region: null,
    }
  }

  componentDidMount() {
    this._getInitialDeviceLocation()
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, (location) => {
      this._setRegion('region', location)
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

  _setRegion = (stateProp, location) => {
    // generate region object
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    // set the state property
    this.setState({
      [stateProp]: region,
    })
    this._map.animateToRegion(region)
    return region
  }

  render() {
    const { initialRegion } = this.state
    if (!initialRegion || initialRegion.latitude === undefined) return null
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          ref={(map) => {
            this._map = map
          }}
          customMapStyle={NightMapStyle}
          initialRegion={initialRegion}
          loadingEnabled
          onPress={Keyboard.dismiss}
          onRegionChangeComplete={newRegion => this.setState({ region: newRegion })}
          provider={MapView.PROVIDER_GOOGLE}
          showsBuildings={false}
          showsCompass={false}
          showsIndoors={false}
          showsMyLocationButton
          showsPointsOfInterest={false}
          showsScale={false}
          showsTraffic={false}
          style={StyleSheet.absoluteFill}
        />
        <AddressSearchBar setMapRegion={this._setRegion} />
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
})

export default connect(
  null,
  mapDispatchToProps,
)(MapViewScreen)

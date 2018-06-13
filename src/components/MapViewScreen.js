import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Keyboard, StyleSheet, Dimensions } from 'react-native'
import { MapView, Location, Permissions, Constants } from 'expo'
import { getAddressFromLocation, getLocationFromAddress } from '../utilities'
import * as Theme from '../config/theme'
import { Button, Card, Field } from './common'
import NightMapStyle from '../config/MapStyles/NightMapStyle.json'
// import SilverMapStyle from '../config/MapStyles/SilverMapStyle.json'

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

class MapViewScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      initialRegion: null,
      region: null,
      searchAddress: null,
    }
  }

  render() {
    const { initialRegion } = this.state
    return (
      <MapView
        ref={(map) => {
          this._map = map
        }}
        customMapStyle={NightMapStyle}
        initialRegion={initialRegion}
        loadingEnabled
        onPress={Keyboard.dismiss}
        onRegionChangeComplete={this._handleOnRegionChangeComplete}
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
    )
  }
}

export default MapViewScreen

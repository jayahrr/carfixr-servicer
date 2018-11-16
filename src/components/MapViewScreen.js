import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Keyboard, StyleSheet, Text } from 'react-native'
import { View } from 'native-base'
import { MapView, Location } from 'expo'
import AddressSearchBar from '../components/AddressSearchBar'
import RequestListButton from '../components/RequestListButton'
import NightMapStyle from '../config/MapStyles/NightMapStyle.json'
import {
  fetchRequestsNearby,
  setRegion,
  setAddressFromRegion,
  setServicerLocationInformation,
} from '../actions/'
import { transformToRegion } from '../utilities/'
import * as Theme from '../config/theme'

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
}

const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    backgroundColor: Theme.colors.spot3,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
})

class MapViewScreen extends Component {
  static propTypes = {
    setRegion: PropTypes.func.isRequired,
    setServicerLocationInformation: PropTypes.func.isRequired,
    fetchRequestsNearby: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    initialRegion: PropTypes.objectOf(PropTypes.any),
    markers: PropTypes.arrayOf(PropTypes.object),
    setAddressFromRegion: PropTypes.func.isRequired,
    handleSelectRequest: PropTypes.func.isRequired,
  }

  static defaultProps = {
    initialRegion: null,
    markers: [],
  }

  componentDidMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, (location) => {
      this.props.setServicerLocationInformation(location, this.props.userID)
    })
  }

  _setRegion = async (
    location,
    shouldDispatch = true,
    shouldFetch = false,
    shouldAnimate = false,
  ) => {
    const region = transformToRegion(location)

    if (shouldDispatch) {
      this.props.setRegion(region)
      this.props.setAddressFromRegion(region, 'region')
    }
    if (shouldFetch) {
      this.props.fetchRequestsNearby(region, 20000)
    }
    if (shouldAnimate) {
      // move the map view to the region
      this._map.animateToRegion(region)
    }
  }

  _openForm = (request) => {
    this.props.navigation.navigate('RequestForm', { request, userID: this.props.userID })
  }

  _listMarkers = (markers, handleSelectRequest) => {
    if (!markers) return null
    return markers.map(marker => (
      <MapView.Marker
        key={marker._id}
        identifier={marker._id}
        coordinate={{
          latitude: marker.service_location.coordinates[1],
          longitude: marker.service_location.coordinates[0],
        }}
        stopPropagation
      >
        <MapView.Callout tooltip onPress={() => handleSelectRequest(marker._id)}>
          <View style={[styles.bubble]}>
            <Text>{marker.short_description}</Text>
            <Text>{marker.number}</Text>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    ))
  }

  render() {
    const { initialRegion, markers, handleSelectRequest } = this.props
    if (!initialRegion || initialRegion.latitude === undefined) return null
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
          onRegionChangeComplete={region => this._setRegion(region)}
          provider={MapView.PROVIDER_GOOGLE}
          showsIndoors={false}
          showsMyLocationButton
          showsUserLocation
          style={StyleSheet.absoluteFillObject}
        >
          {this._listMarkers(markers, handleSelectRequest)}
        </MapView>
      </View>
    )
  }
}

export default connect(
  null,
  {
    fetchRequestsNearby,
    setRegion,
    setAddressFromRegion,
    setServicerLocationInformation,
  },
)(MapViewScreen)

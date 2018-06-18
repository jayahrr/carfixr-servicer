import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import MapViewScreen from '../components/MapViewScreen'
import DrawerMenuButton from '../components/DrawerMenuButton'

const HomeScreen = ({ navigation }) => (
  <View style={StyleSheet.absoluteFill}>
    <DrawerMenuButton navigation={navigation} />
    <MapViewScreen />
  </View>
)

HomeScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

const mapStateToProps = state => ({
  mapRegion: state.map.region,
})

export default connect(mapStateToProps)(HomeScreen)

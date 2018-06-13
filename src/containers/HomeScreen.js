import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapViewScreen from '../components/MapViewScreen'
import DraawerMenuButton from '../components/DrawerMenuButton'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  btnStyle: {
    maxHeight: Theme.DEVICE_HEIGHT / 14,
    minHeight: Theme.DEVICE_HEIGHT / 14,
    width: Theme.DEVICE_WIDTH,
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    marginBottom: 0,
    zIndex: 999,
    marginLeft: 0,
    backgroundColor: Theme.colors.spot4,
  },
})

class HomeScreen extends Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={StyleSheet.absoluteFill}>
        <MapViewScreen />
        <DraawerMenuButton navigation={navigation} />
      </View>
    )
  }
}

export default HomeScreen

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderRadius: 100,
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: Constants.statusBarHeight / 2,
    zIndex: 100,
  },
})

class DrawerMenuButton extends Component {
  _handleOnPress = () => {
    this.props.navigation.toggleDrawer()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._handleOnPress}>
          <Ionicons color={Theme.colors.spot3} name="ios-menu" size={30} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default DrawerMenuButton

import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    backgroundColor: Theme.colors.spot4,
    borderRadius: 52 / 2,
    height: 52,
    justifyContent: 'center',
    left: Constants.statusBarHeight / 2,
    top: Constants.statusBarHeight * 1.5,
    width: 52,
    zIndex: 101,
  },
})

const DrawerMenuButton = ({ navigation, style }) => (
  <View style={[styles.btnContainer, style]}>
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.toggleDrawer()
      }}
    >
      <Ionicons color={Theme.colors.spot3} name="ios-menu" size={36} />
    </TouchableWithoutFeedback>
  </View>
)

DrawerMenuButton.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
}

DrawerMenuButton.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DrawerMenuButton

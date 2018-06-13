import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Theme from '../../config/theme'

const styles = StyleSheet.create({
  container: {
    height: Theme.DEVICE_HEIGHT / 32,
    width: Theme.DEVICE_WIDTH,
  },
  text: {
    alignSelf: 'center',
    color: Theme.colors.text.white,
  },
})

const Footer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      CARFIXR All rights reserved. Authored by Julio Valdez 2018.
    </Text>
  </View>
)

export { Footer }

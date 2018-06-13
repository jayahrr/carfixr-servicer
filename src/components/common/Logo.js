import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import * as Theme from '../../config/theme'

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
})

const Logo = () => (
  <View>
    <Text style={styles.logo}>CARFIXR</Text>
  </View>
)

export { Logo }

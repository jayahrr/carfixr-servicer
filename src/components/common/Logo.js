import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../config/theme'

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.white,
  },
})

const Logo = () => (
  <View>
    <Text style={styles.logo}>Go Mech</Text>
  </View>
)

export { Logo }

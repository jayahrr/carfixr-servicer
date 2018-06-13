import React from 'react'
import { View } from 'react-native'
import * as Theme from '../../config/theme'

const CardSection = ({ style, children }) => (
  <View style={[Theme.cards.section, style]}>{children}</View>
)

export { CardSection }

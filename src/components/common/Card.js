import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as Theme from '../../config/theme'

const Card = ({ style, children }) => (
  <View style={[Theme.cards.container, style]}>{children}</View>
)

export { Card }

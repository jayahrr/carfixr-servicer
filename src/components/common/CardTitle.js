import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import * as Theme from '../../config/theme'

const CardTitle = ({ style, textStyle, children, title }) => (
  <View style={[Theme.cards.title.container, style]}>
    {children || (
      <Text style={[Theme.cards.title.text, textStyle]}>{title}</Text>
    )}
  </View>
)

CardTitle.defaultProps = {
  textStyle: {},
  children: null,
  title: '',
}

CardTitle.propTypes = {
  textStyle: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
}

export { CardTitle }

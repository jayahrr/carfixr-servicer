import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import * as Theme from '../../config/theme'

const Button = ({ onPress, children, title, visible, style, textStyle }) => {
  if (!visible) return null
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Theme.buttons.containerStyle, style]}
    >
      <Text style={[Theme.buttons.textStyle, textStyle]}>
        {children !== '' ? children : title}
      </Text>
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  children: '',
  title: 'Button title',
  visible: true,
  // style: {},
  // textStyle: {},
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.any]),
  title: PropTypes.string,
  visible: PropTypes.bool,
  // style: PropTypes.objectOf(PropTypes.any),
  // textStyle: PropTypes.objectOf(PropTypes.any),
}

export { Button }

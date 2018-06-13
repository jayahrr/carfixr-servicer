import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import * as Theme from '../../config/theme'

const Field = ({
  autoCapitalize,
  autoFocus,
  autoCorrect,
  clearButtonMode,
  clearTextOnFocus,
  editable,
  label,
  multiline,
  numberOfLines,
  onChange,
  onChangeText,
  onSubmitEditing,
  placeholder,
  secureTextEntry,
  style,
  inputStyle,
  labelStyle,
  value,
}) => (
  <View style={[Theme.fields.input.container, style]}>
    <Text style={[Theme.fields.input.labelStyle, labelStyle]}>{label}</Text>
    <TextInput
      autoCorrect={false}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      clearButtonMode={clearButtonMode}
      clearTextOnFocus={clearTextOnFocus}
      editable={editable}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChange={onChange}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[Theme.fields.input.inputStyle, inputStyle]}
      value={value}
    />
  </View>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
}

export { Field }

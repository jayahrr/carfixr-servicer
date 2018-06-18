import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import { Constants, Location } from 'expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borders.radius,
    flexDirection: 'row',
    height: 50,
    position: 'absolute',
    right: Constants.statusBarHeight / 2,
    top: Constants.statusBarHeight * 1.5,
    zIndex: 101,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: Theme.colors.spot4,
    borderRadius: 52 / 2,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  inputStyle: {
    color: Theme.colors.text.default,
    backgroundColor: Theme.colors.default,
    borderRadius: Theme.borders.radius,
    width: Theme.DEVICE_WIDTH * 0.65,
    paddingHorizontal: 10,
  },
})

class AddressSearchBar extends Component {
  static propTypes = {
    setMapRegion: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.setMapRegion = this.props.setMapRegion
    this.state = {
      expanded: false,
      searchValue: null,
    }
  }

  _toggleSearchBar = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  _changeSearchValue = (searchValue) => {
    this.setState({ searchValue })
  }

  _getAddressFromSearch = async () => {
    const coordsArr = await Location.geocodeAsync(this.state.searchValue)
    if (coordsArr.length) {
      this.setMapRegion('region', { coords: coordsArr[0] })
    }
  }

  render() {
    const { expanded, searchValue } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <TouchableWithoutFeedback onPress={this._toggleSearchBar}>
            <Ionicons name="ios-search" color={Theme.colors.spot3} size={36} />
          </TouchableWithoutFeedback>
        </View>
        {expanded ? (
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="always"
            onChangeText={this._changeSearchValue}
            onSubmitEditing={this._getAddressFromSearch}
            placeholder="Where would you like to work?"
            style={styles.inputStyle}
            value={searchValue}
          />
        ) : null}
      </View>
    )
  }
}

export default AddressSearchBar

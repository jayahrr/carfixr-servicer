import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Constants, Location } from 'expo'
import { Item, Input, View, Button, Icon } from 'native-base'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: Constants.statusBarHeight / 1.5,
    top: Constants.statusBarHeight,
    zIndex: 101,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: Theme.colors.spot2,
    borderRadius: 56 / 2,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    shadowColor: Theme.colors.shadows,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: 56,
  },
  inputStyle: {
    backgroundColor: Theme.colors.default,
    borderRadius: Theme.borders.radius,
    width: Theme.DEVICE_WIDTH * 0.6,
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

  _getRegionFromSearchAddress = async () => {
    const coordsArr = await Location.geocodeAsync(this.state.searchValue)
    if (coordsArr.length) {
      this.setMapRegion({ coords: coordsArr[0] }, true, true, true)
    }
  }

  render() {
    const { expanded, searchValue } = this.state
    return (
      <View style={styles.container}>
        <Button primary onPress={this._toggleSearchBar} style={styles.btn}>
          <Icon name="ios-search" />
        </Button>
        {expanded ? (
          <Item regular style={styles.inputStyle}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={this._changeSearchValue}
              onSubmitEditing={this._getRegionFromSearchAddress}
              placeholder="Where do you work?"
              style={styles.inputStyle}
              value={searchValue}
            />
          </Item>
        ) : null}
      </View>
    )
  }
}

export default AddressSearchBar

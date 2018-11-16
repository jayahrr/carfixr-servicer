import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { View, Button, Icon } from 'native-base'
import { Constants } from 'expo'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: Constants.statusBarHeight / 1.5,
    top: Constants.statusBarHeight + 66,
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
})

const RequestListButton = ({ navigation }) => {
  const _onPress = () => {
    navigation.navigate('RequestList')
  }

  return (
    <View style={styles.container}>
      <Button primary onPress={_onPress} style={styles.btn}>
        <Icon ios="ios-pin" name="md-pin" />
      </Button>
    </View>
  )
}

RequestListButton.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withNavigation(RequestListButton)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { Container, View, Fab, Icon } from 'native-base'
import MapViewScreen from '../components/MapViewScreen'
import * as Theme from '../config/theme'

const drawerFabStyle = { zIndex: 101, right: Constants.statusBarHeight / 1.5 }

class HomeScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: current => <Icon name="ios-home" size={30} color={current.tintColor} />,
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <View style={StyleSheet.absoluteFill}>
          <Fab
            containerStyle={drawerFabStyle}
            style={{ backgroundColor: Theme.colors.spot2 }}
            position="topRight"
            onPress={() => {
              navigation.toggleDrawer()
            }}
          >
            <Icon name="ios-menu" />
          </Fab>
          <MapViewScreen />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  mapRegion: state.map.region,
})

export default connect(mapStateToProps)(HomeScreen)

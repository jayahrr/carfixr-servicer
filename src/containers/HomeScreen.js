import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import { Container, View, Fab, Icon } from 'native-base'

import MapViewScreen from '../components/MapViewScreen'
import * as Theme from '../config/theme'
import { setRegion, fetchRequestsNearby, selectRequest } from '../actions/'
import { transformToRegion } from '../utilities/'

const drawerFabStyle = { zIndex: 101, right: Constants.statusBarHeight / 1.5 }

class HomeScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: current => <Icon name="ios-home" size={30} color={current.tintColor} />,
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    mapRegion: PropTypes.objectOf(PropTypes.any).isRequired,
    setRegion: PropTypes.func.isRequired,
    fetchRequestsNearby: PropTypes.func.isRequired,
    requestsNearby: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props)
    let initialRegion = null
    // check if map region is valid object with entries
    if (Object.entries(props.mapRegion).length) {
      // if valid object, set initial region to it
      initialRegion = props.mapRegion
    }
    this.state = { initialRegion }
  }

  componentDidMount() {
    if (!this.state.initialRegion) {
      this.getInitialDeviceLocation()
        .then((initialRegion) => {
          this.setState({
            initialRegion,
          })
          return initialRegion
        })
        .then(initialRegion => this.props.fetchRequestsNearby(initialRegion, 20000))
    } else {
      this.props.fetchRequestsNearby(this.state.initialRegion, 20000)
    }
  }

  getInitialDeviceLocation = async () => {
    // confirm app is granted permissions to check devlice location
    const permissionIsGranted = await this._checkLocationPermissions()
    if (!permissionIsGranted) return null

    // get current device location
    const locationData = await Location.getCurrentPositionAsync({})
    if (!locationData) return null

    const initialRegion = transformToRegion(locationData)
    this.props.setRegion(initialRegion)

    //  set region to initialize map
    return initialRegion
  }

  _checkLocationPermissions = async () => {
    let granted = true
    // check app permissions for location data access
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      granted = false
    }

    return granted
  }

  handleSelectRequest = (reqID) => {
    const { navigation, selectRequest } = this.props
    selectRequest(reqID)
    navigation.navigate('RequestForm')
  }

  render() {
    const { navigation, userID, requestsNearby } = this.props
    const { initialRegion } = this.state
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
          <MapViewScreen
            navigation={navigation}
            userID={userID}
            initialRegion={initialRegion}
            markers={requestsNearby}
            handleSelectRequest={this.handleSelectRequest}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  mapRegion: state.map.region,
  userID: state.user.db_data._id,
  requestsNearby: state.requests.items,
})

const mapDispatchToProps = {
  setRegion,
  fetchRequestsNearby,
  selectRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)

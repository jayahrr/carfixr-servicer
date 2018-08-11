import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { store, fbConfig, colors } from './src/config/'
import AppNavigation from './src/navigators/AppNavigation'
import { USER_LOGIN_STILL, USER_DATA } from './src/actions/types'
import { fetchUserData } from './src/actions'

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      isLoggedIn: false,
    }
  }

  componentWillMount() {
    firebase.initializeApp(fbConfig)
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loading: false,
          isLoggedIn: false,
        })
      } else {
        fetchUserData(user.email).then((response) => {
          store.dispatch({
            type: USER_LOGIN_STILL,
            payload: user,
          })
          store.dispatch({
            type: USER_DATA,
            payload: response,
          })
          this.setState({
            loading: false,
            isLoggedIn: true,
          })
        })
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.spot1} />
        </View>
      )
    }
    return (
      <Provider store={store}>
        <AppNavigation screenProps={{ isLoggedIn: this.state.isLoggedIn }} />
      </Provider>
    )
  }
}

export default App

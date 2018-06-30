import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { store, fbConfig, colors } from './src/config/'
import AppNavigation from './src/navigators/AppNavigation'

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      loading: true,
    }
  }

  componentWillMount() {
    firebase.initializeApp(fbConfig)
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        authenticated: !!user,
        loading: !this.state.loading,
      })
    })
  }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View style={styles.loading}>
    //       <ActivityIndicator size="large" color={colors.spot1} />
    //     </View>
    //   )
    // }
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}

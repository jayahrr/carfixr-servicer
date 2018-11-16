import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import Pusher from 'pusher-js/react-native'

import { store, fbConfig, colors } from './src/config/'
import AppNavigation from './src/navigators/AppNavigation'
import { USER_LOGIN_STILL, USER_DB_DATA, REQS_RECEIVE, REQS_MYWORK } from './src/actions/types'
import { fetchUserData } from './src/actions'

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true

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
            type: USER_DB_DATA,
            payload: response,
          })
          this.setState({
            loading: false,
            isLoggedIn: true,
          })
        })
      }
    })
    // this.pusher = new Pusher('cb51a4975819a45202cf', {
    //   cluster: 'us2',
    //   forceTLS: true,
    // })
    // this.channel = this.pusher.subscribe('Requests')
    // this.channel.bind('inserted', (data) => {
    //   console.log('data from App.js: ', data)
    //   this._addItemToStore(data)
    // })
    // this.channel.bind('updated', (data) => {
    //   console.log('data from App.js: ', data)
    // })
    // this.channel.bind('deleted', data => this._removeItemFromStore(data))
  }

  _addItemToStore = (data) => {
    let payload = []
    const type = REQS_RECEIVE
    const state = store.getState()
    const reqsOld = state.requests.items
    const alreadyExists = reqsOld.find(req => req._id === data.id)
    console.log('alreadyExists: ', alreadyExists)

    if (!alreadyExists) {
      if (reqsOld.length) payload = payload.concat(reqsOld)
      payload.push(data.request)
    }

    console.log('payload: ', payload)
    store.dispatch({ type, payload })
  }

  _removeItemFromStore = (data) => {
    const state = store.getState()
    const reqsOld = state.requests.items
    const workOld = state.requests.myWork

    if (workOld.length) {
      const work = workOld.filter(req => req._id !== data)
      console.log('work: ', work)

      if (workOld.length !== work.length) {
        store.dispatch({
          type: REQS_MYWORK,
          payload: work,
        })
      }
    }

    if (reqsOld.length) {
      const reqs = reqsOld.filter(req => req._id !== data)
      console.log('reqs: ', reqs)

      if (reqsOld.length !== reqs.length) {
        store.dispatch({
          type: REQS_RECEIVE,
          payload: reqs,
        })
      }
    }
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
      <Root>
        <Provider store={store}>
          <AppNavigation screenProps={{ isLoggedIn: this.state.isLoggedIn }} />
        </Provider>
      </Root>
    )
  }
}

export default App

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, Button, Accordion, View } from 'native-base'
import * as Theme from '../config/theme'
import FindWorkButton from '../components/FindWorkButton'
import AssignRequestButton from '../components/AssignRequestButton'

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export class NearbyRequestsList extends Component {
  static propTypes = {
    requests: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
  }

  _onView = (request) => {
    this.props.navigation.navigate('RequestForm', { request, userID: this.props.userID })
  }

  _renderContent = (request) => {
    console.log('request: ', request)
    return (
      <View style={styles.contentStyle}>
        <Text>{request.content.number}</Text>
        <Text>{request.content.state}</Text>
        <AssignRequestButton requestID={request.content._id} action="pickup" />
        <Button small onPress={() => this._onView(request.content)}>
          <Text>View</Text>
        </Button>
      </View>
    )
  }

  render() {
    const { requests } = this.props
    if (!requests.length) {
      return (
        <FindWorkButton
          title="Did not find any work near you."
          btnTitle="Find work in another area"
        />
      )
    }
    return (
      <Accordion
        dataArray={requests}
        headerStyle={{ backgroundColor: Theme.colors.spot2 }}
        renderContent={this._renderContent}
      />
    )
  }
}

export default NearbyRequestsList

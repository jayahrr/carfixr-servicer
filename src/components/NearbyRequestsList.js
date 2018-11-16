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
    handleSelectRequest: PropTypes.func.isRequired,
  }

  _renderContent = (request, handleSelectRequest) => (
    <View style={styles.contentStyle}>
      <Text>{request.content.number}</Text>
      <Text>{request.content.state}</Text>
      <AssignRequestButton requestID={request.content._id} action="pickup" />
      <Button small onPress={() => handleSelectRequest(request.content._id)}>
        <Text>View</Text>
      </Button>
    </View>
  )

  render() {
    const { requests, handleSelectRequest } = this.props
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
        renderContent={request => this._renderContent(request, handleSelectRequest)}
      />
    )
  }
}

export default NearbyRequestsList

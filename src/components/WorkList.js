import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, Accordion, View, Button } from 'native-base'
import * as Theme from '../config/theme'
import AssignRequestButton from './AssignRequestButton'

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default class WorkList extends Component {
  static propTypes = {
    myWork: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectRequest: PropTypes.func.isRequired,
  }

  renderItem = (request, handleSelectRequest) => (
    <View style={styles.contentStyle}>
      <Text>{request.content.number}</Text>
      <Text>{request.content.state}</Text>
      <AssignRequestButton requestID={request.content._id} action="drop" goBack={false} />
      <Button small onPress={() => handleSelectRequest(request.content._id)}>
        <Text>View</Text>
      </Button>
    </View>
  )

  render() {
    const { myWork, handleSelectRequest } = this.props
    return (
      <Accordion
        dataArray={myWork}
        headerStyle={{ backgroundColor: Theme.colors.spot4 }}
        renderContent={request => this.renderItem(request, handleSelectRequest)}
      />
    )
  }
}

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
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
  }

  _onView = (request) => {
    this.props.navigation.navigate('RequestForm', { request, userID: this.props.userID })
  }

  _renderContent = request => (
    <View style={styles.contentStyle}>
      <Text>{request.content.number}</Text>
      <Text>{request.content.state}</Text>
      <AssignRequestButton requestID={request.content._id} action="drop" goBack={false} />
      <Button small onPress={() => this._onView(request.content)}>
        <Text>View</Text>
      </Button>
    </View>
  )

  render() {
    return (
      <Accordion
        dataArray={this.props.myWork}
        headerStyle={{ backgroundColor: Theme.colors.spot4 }}
        renderContent={this._renderContent}
      />
    )
  }
}

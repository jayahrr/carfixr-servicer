import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Text, Button, Accordion, View } from 'native-base'
import * as Theme from '../config/theme'
import { servicerUpdatedRequest } from '../actions'

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
    fetchMyWork: PropTypes.func.isRequired,
  }

  _onDrop = (id) => {
    Alert.alert('Dropping a request.', 'Are you sure you want to drop this task?', [
      {
        text: 'Yes',
        onPress: () => this._onAccept(id),
      },
      {
        text: 'Cancel',
        onPress: () => false,
      },
    ])
  }

  _onAccept = (id) => {
    servicerUpdatedRequest(id, {
      servicer_id: null,
      state: 'New',
    }).then((response) => {
      if (!response.ok) {
        console.log('servicerUpdatedRequest response not ok', response)
      }
      this.props.fetchMyWork()
    })
  }

  _renderContent = content => (
    <View style={styles.contentStyle}>
      <Text>{content.number}</Text>
      <Text>{content.state}</Text>
      <Button small onPress={() => this._onDrop(content._id)}>
        <Text>Drop</Text>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Text, Card, CardItem, Button, Icon, Accordion, View } from 'native-base'
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

export class NearbyRequestsList extends Component {
  static propTypes = {
    requests: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
  }

  _onPickUp = (id) => {
    Alert.alert('Picking up a request.', 'Are you sure you want to complete this task?', [
      {
        text: 'Yes',
        onPress: () => this._onAccept(id, { servicer_id: this.props.userID, state: 'Assigned' }),
      },
      { text: 'Cancel', onPress: () => false },
    ])
  }

  _onAccept = (id, update) => {
    this.props.navigation.goBack()
    servicerUpdatedRequest(id, update)
  }

  _renderContent = content => (
    <View style={styles.contentStyle}>
      <Text>{content.number}</Text>
      <Text>{content.state}</Text>
      <Button small onPress={() => this._onPickUp(content._id)}>
        <Text>Pick up</Text>
      </Button>
    </View>
  )

  render() {
    const { requests, navigation } = this.props
    if (!requests.length) {
      return (
        <Card>
          <CardItem header>
            <Text>Did not find any work near you.</Text>
          </CardItem>
          <CardItem footer>
            <Button
              iconRight
              primary
              onPress={() => {
                navigation.navigate({ routeName: 'Home' })
              }}
            >
              <Text>Find work in another area</Text>
              <Icon name="ios-search" />
            </Button>
          </CardItem>
        </Card>
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

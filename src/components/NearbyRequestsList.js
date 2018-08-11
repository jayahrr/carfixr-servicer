import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Text, Card, CardItem, Button, Icon, Accordion, View } from 'native-base'
import * as Theme from '../config/theme'
import { servicerPickedUpRequest } from '../actions'

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export class NearbyRequestsList extends Component {
  _onPickUp = (id) => {
    console.log(id)
    Alert.alert('Picking up a request.', 'Are you sure you want to complete this task?', [
      {
        text: 'Yes',
        onPress: () => this._onAccept(id, { servicer_id: '5b6bd1c323d1d8894e35ad85' }),
      },
      { text: 'Cancel', onPress: () => false },
    ])
  }

  _onAccept = (id, update) => {
    this.props.navigation.goBack()
    servicerPickedUpRequest(id, update)
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
    console.log('requests: ', requests)

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
        expanded={0}
        headerStyle={{ backgroundColor: Theme.colors.spot2 }}
        renderContent={this._renderContent}
      />
    )
  }
}

NearbyRequestsList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default NearbyRequestsList

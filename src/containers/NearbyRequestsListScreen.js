import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, Header, Left, Button, Icon, Right, Title, Body } from 'native-base'
import { NearbyRequestsList } from '../components/NearbyRequestsList'

export const header = navigation => (
  <Header>
    <Left>
      <Button onPress={() => navigation.goBack()} transparent>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>Nearby</Title>
    </Body>
    <Right>
      <Button onPress={() => navigation.toggleDrawer()} transparent>
        <Icon name="ios-menu" />
      </Button>
    </Right>
  </Header>
)

export class NearbyRequestsListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({ header: header(navigation) })

  render() {
    return (
      <View>
        <NearbyRequestsList requests={this.props.requests} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.requests.items,
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NearbyRequestsListScreen))

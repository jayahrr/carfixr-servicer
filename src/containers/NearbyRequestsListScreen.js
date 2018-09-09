import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Header, Left, Button, Icon, Right, Title, Body, Container, Content } from 'native-base'
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
      <Container>
        <Content padder>
          <NearbyRequestsList {...this.props} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const userID = state.user.db_data._id
  const requests = []

  if (state.requests.items.length) {
    state.requests.items.forEach((item) => {
      const request = {
        title: item.short_description,
        content: { ...item },
      }
      requests.push(request)
    })
  }

  return { requests, userID }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NearbyRequestsListScreen))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import { Header, Left, Button, Icon, Right, Title, Body, Container, Content } from 'native-base'

import { selectRequest } from '../actions/'
import { NearbyRequestsList } from '../components/NearbyRequestsList'

const header = navigation => (
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

class NearbyRequestsListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({ header: header(navigation) })

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    selectRequest: PropTypes.func.isRequired,
  }

  handleSelectRequest = (reqID) => {
    const { navigation, selectRequest } = this.props
    selectRequest(reqID)
    navigation.navigate('RequestForm')
  }

  render() {
    return (
      <Container>
        <Content padder>
          <NearbyRequestsList {...this.props} handleSelectRequest={this.handleSelectRequest} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const userID = state.user.db_data._id
  const requests = []
  // reorganize the collection to work properly with the Accordian component
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

export default connect(
  mapStateToProps,
  { selectRequest },
)(withNavigation(NearbyRequestsListScreen))

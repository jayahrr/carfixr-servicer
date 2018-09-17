import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import { Header, Left, Button, Icon, Right, Title, Body, Container, Content } from 'native-base'
import { NearbyRequestsList } from '../components/NearbyRequestsList'
import RequestFormModal from '../components/RequestFormModal'

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
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  toggleModal = (modalVisible, request) => {
    this.setState({ modalVisible })
    this.modalReq = request
    this.enableReqForm = modalVisible
  }

  renderReqForm = () => {
    if (!this.enableReqForm) return null
    return (
      <RequestFormModal
        visible={this.state.modalVisible}
        userID={this.props.userID}
        toggleModal={this.toggleModal}
        request={this.modalReq}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    return (
      <Container>
        <Content padder>
          <NearbyRequestsList {...this.props} toggleModal={this.toggleModal} />
        </Content>

        {this.renderReqForm()}
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

export default connect(mapStateToProps)(withNavigation(NearbyRequestsListScreen))

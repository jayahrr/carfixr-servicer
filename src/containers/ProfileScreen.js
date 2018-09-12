import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'react-native'
import { Container, Icon, Header, Left, Body, Title, Right, Button, Content } from 'native-base'
import { updateServicerInformation, fetchFullCatalog } from '../actions'
import ProfileCard from '../components/ProfileCard'
import ServiceOfferingsCard from '../components/ServiceOfferingsCard'
import CatalogItemList from '../components/CatalogItemList'

class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    updateServicerInformation: PropTypes.func.isRequired,
    fetchFullCatalog: PropTypes.func.isRequired,
    userServices: PropTypes.arrayOf(PropTypes.any).isRequired,
    availableServices: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  constructor() {
    super()
    this.state = {
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.props.fetchFullCatalog()
  }

  _openServicesList = () => {
    this.setState({
      modalVisible: true,
    })
  }

  _closeServicesList = () => {
    this.setState({
      modalVisible: false,
    })
  }

  _removeServiceLine = (id) => {
    const serviceLines = this.props.userServices
    const updatedLines = []

    serviceLines.forEach((line) => {
      if (line._id.toString() !== id.toString()) {
        updatedLines.push(line._id)
      }
    })

    this.props.updateServicerInformation(this.props.user._id, { service_lines: updatedLines })
  }

  render() {
    const {
      user, navigation, availableServices, userServices,
    } = this.props

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Account</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <ProfileCard user={user} navigation={navigation} />
          <ServiceOfferingsCard
            userServices={userServices}
            navigation={navigation}
            removeLine={this._removeServiceLine}
            openServicesList={this._openServicesList}
            closeServicesList={this._closeServicesList}
          />
          <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
            <CatalogItemList
              closeServicesList={this._closeServicesList}
              navigation={navigation}
              availableServices={availableServices}
              userID={user._id}
              userServices={userServices}
            />
          </Modal>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const catItems = state.catalog.cat_items
  let userServices = state.user.db_data.service_lines
  const availableServices = []

  if (typeof userServices[0] === 'string') {
    userServices = []
    state.user.db_data.service_lines.forEach((lineID) => {
      const line = catItems.find(item => item._id.toString() === lineID.toString())
      userServices.push(line)
    })
  }

  if (catItems.length !== 0) {
    catItems.forEach((item) => {
      const exists = userServices.find(line => line._id.toString() === item._id.toString())
      if (!exists) {
        availableServices.push(item)
      }
    })
  }

  return {
    availableServices,
    userServices,
    user: state.user.db_data,
  }
}

const mapDispatchToProps = {
  updateServicerInformation,
  fetchFullCatalog,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen)

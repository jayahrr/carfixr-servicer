import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Left,
  Icon,
  Right,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Header,
  Button,
  Body,
  Title,
} from 'native-base'
import { updateServicerInformation } from '../actions'

const ServicesHeader = ({ closeServicesList }) => (
  <Header>
    <Left>
      <Button onPress={() => closeServicesList()} transparent>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>Services</Title>
    </Body>
    <Right />
  </Header>
)

ServicesHeader.propTypes = {
  closeServicesList: PropTypes.func.isRequired,
}

class CatalogItemList extends Component {
  static propTypes = {
    availableServices: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    updateServicerInformation: PropTypes.func.isRequired,
    closeServicesList: PropTypes.func.isRequired,
    userID: PropTypes.string.isRequired,
    userServices: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  _onAdd = async (userID, userServices, item) => {
    const serviceLines = [...userServices]
    serviceLines.push(item)
    const update = { service_lines: serviceLines }
    await this.props.updateServicerInformation(userID, update)
    this.props.closeServicesList()
  }

  render() {
    const {
      availableServices, navigation, userID, closeServicesList, userServices,
    } = this.props

    return (
      <Container>
        <ServicesHeader navigation={navigation} closeServicesList={closeServicesList} />
        <Content padder>
          <List
            dataArray={availableServices}
            renderRow={item => (
              <ListItem onPress={() => this._onAdd(userID, userServices, item)}>
                <Left>
                  <Text>{item.title}</Text>
                </Left>
                <Right>
                  <Icon ios="ios-add-outline" android="md-add" />
                </Right>
                {/* <Text>{item.description}</Text> */}
              </ListItem>
            )}
          />
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = { updateServicerInformation }

export default connect(
  null,
  mapDispatchToProps,
)(CatalogItemList)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Card, CardItem, Text, Body } from 'native-base'
import AssignRequestButton from '../components/AssignRequestButton'

export default class extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props)
    this.request = props.navigation.getParam('request', {})
    this.userID = props.navigation.getParam('userID', '')
    this.isMyWork = this.request.servicer_id === this.userID
    this.action = this.isMyWork ? 'drop' : 'pickup'
  }

  render() {
    const {
      short_description, number, state, _id,
    } = this.request
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>{short_description}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{number}</Text>
                <Text>{state}</Text>
                {/* <Text>{`For ${this.request.requester.name}`}</Text> */}
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <AssignRequestButton
                requestID={_id}
                userID={this.userID}
                action={this.action}
                goBack={this.isMyWork}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

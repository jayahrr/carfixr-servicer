import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  View,
  H1,
} from 'native-base'
import * as Theme from '../config/theme'
import RequestFormActions from '../components/RequestFormActions'

const styles = {
  subHeader: { color: Theme.colors.text.muted, marginBottom: 5, fontSize: 12 },
  flexColumn: { flexDirection: 'column' },
  showSchedule: state => ({ display: state !== 'New' ? null : 'none' }),
}

class RequestFormModal extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
    }
  }
  render() {
    const {
      request, userID, isMyWork, toggleModal,
    } = this.props
    const {
      number, state, _id, description, requester, service_date,
    } = request
    const shortDescription = request.short_description
    const serviceDate = new Date(service_date)
    let plannedStart = request.planned_start
    if (plannedStart) plannedStart = new Date(plannedStart)

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible || this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <Container>
          <Header>
            <Left>
              <Button onPress={() => toggleModal(false, null)} transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Request Form</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <Card>
              <CardItem header bordered>
                <View style={styles.flexColumn}>
                  <H1>
                    {shortDescription} for {requester.name}
                  </H1>
                  <Text style={styles.subHeader}>
                    {number} :: {state}
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.subHeader}>To be completed by</Text>
                  <Text>
                    {serviceDate
                      ? serviceDate.toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Now!'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.subHeader}>{requester.first_name} says</Text>
                  <Text>{description || 'Thanks!'}</Text>
                </Body>
              </CardItem>
              <CardItem style={styles.showSchedule(state)}>
                <Body>
                  <Text style={styles.subHeader}>Scheduled for</Text>
                  <Text>
                    {plannedStart
                      ? plannedStart.toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Not yet scheduled.'}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <RequestFormActions
                  clientName={requester.first_name}
                  reqState={state}
                  requestID={_id}
                  userID={userID}
                  goBack={isMyWork}
                  reqAppt={plannedStart}
                />
              </CardItem>
            </Card>
          </Content>
        </Container>
      </Modal>
    )
  }
}

RequestFormModal.propTypes = {
  request: PropTypes.objectOf(PropTypes.any).isRequired,
  userID: PropTypes.string.isRequired,
  isMyWork: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  // retrieve user's ID from navigation param
  const { userID } = props
  // retrieve item from a state collection
  let reqExists
  let { request } = props
  let isMyWork
  let action

  if (request) {
    const requestID = request._id
    // attempt to find in the myWork collection first
    if (state.requests.myWork.length) {
      reqExists = state.requests.myWork.find(req => req.content._id === requestID)
      reqExists = reqExists ? reqExists.content : undefined
    }
    // if still not found, attempt to find in the items collection
    if (!reqExists) {
      if (state.requests.items.length) {
        reqExists = state.requests.items.find(req => req._id === requestID)
      }
    }
    // if item was found, create a new object to return
    if (reqExists) {
      request = { ...reqExists }
    }
    // set whether to goBack or not and the action to perform
    isMyWork = request.servicer_id === userID
    action = isMyWork ? 'drop' : 'pickup'
  }

  return {
    request,
    isMyWork,
    action,
    userID,
  }
}

export default connect(mapStateToProps)(RequestFormModal)

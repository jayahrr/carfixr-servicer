import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
  Spinner,
  Toast,
} from 'native-base'
import * as Theme from '../config/theme'
import RequestFormActions from '../components/RequestFormActions'
import { receiveReqUpdate } from '../actions/'
import { findRequestData } from '../utilities'

const styles = {
  subHeader: { color: Theme.colors.text.muted, marginBottom: 5, fontSize: 12 },
  flexColumn: { flexDirection: 'column' },
  showSchedule: state => ({ display: state !== 'New' ? null : 'none' }),
}
class RequestForm extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    reqID: PropTypes.string.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    receiveReqUpdate: PropTypes.func.isRequired,
  }

  state = {
    fetching: false,
    error: '',
    reqShortDesc: '',
    requesterName: '',
    requesterFirstName: '',
    reqNumber: '',
    reqState: '',
    reqDesc: '',
    reqExists: false,
  }

  componentWillMount = async () => {
    const { request } = this.props
    await this._fetchRequest(request)
  }

  componentDidMount = () => {
    const { reqID, userID, receiveReqUpdate } = this.props
    receiveReqUpdate(reqID, userID, this.renderUpdateToast)
  }

  _fetchRequest = async (request) => {
    const { userID, reqID } = this.props
    let Request = request ? { ...request } : null
    if (!Request && reqID) {
      try {
        await this.setState({ fetching: true })
        Request = await findRequestData(reqID, userID)
      } catch (error) {
        this.setState({ error })
      }
    }
    if (Request) {
      return this.setState({
        fetching: false,
        reqExists: true,
        reqShortDesc: Request.short_description,
        requesterName: Request.requester.name,
        requesterFirstName: Request.requester.first_name,
        reqNumber: Request.number,
        reqState: Request.state,
        reqDesc: Request.description,
        reqSrvcDt: new Date(Request.service_date),
        reqPlndSt: new Date(Request.planned_start),
        isMyWork: Request.servicer_id === userID,
      })
    }
    return this.setState({ fetching: false })
  }

  renderUpdateToast = (selectedRequestUpdated) => {
    if (selectedRequestUpdated) {
      return Toast.show({
        text: 'Updates availale!',
        buttonText: 'Refresh',
        type: 'success',
        duration: 60000 * 5, // 5min
        onClose: () => this._fetchRequest(),
      })
    }
    return null
  }

  render() {
    const { userID, reqID, navigation } = this.props
    const {
      fetching,
      reqExists,
      reqShortDesc,
      requesterName,
      reqNumber,
      reqState,
      reqDesc,
      requesterFirstName,
      reqSrvcDt,
      reqPlndSt,
      isMyWork,
    } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Request Form</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {!reqExists || fetching ? (
            <Card transparent>
              <Spinner />
            </Card>
          ) : (
            <Card>
              <CardItem header bordered>
                <View style={styles.flexColumn}>
                  <H1>
                    {reqShortDesc} for {requesterName}
                  </H1>
                  <Text style={styles.subHeader}>
                    {reqNumber} :: {reqState}
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.subHeader}>To be completed by</Text>
                  <Text>
                    {reqSrvcDt
                      ? reqSrvcDt.toLocaleString('en-US', {
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
                  <Text style={styles.subHeader}>{requesterFirstName} says</Text>
                  <Text>{reqDesc || 'Thanks!'}</Text>
                </Body>
              </CardItem>
              <CardItem style={styles.showSchedule(reqState)}>
                <Body>
                  <Text style={styles.subHeader}>Scheduled for</Text>
                  <Text>
                    {reqPlndSt
                      ? reqPlndSt.toLocaleString('en-US', {
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
                  clientName={requesterFirstName}
                  reqState={reqState}
                  requestID={reqID}
                  userID={userID}
                  goBack={isMyWork}
                  reqAppt={reqPlndSt}
                  fetchRequest={this._fetchRequest}
                />
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedRequestUpdated } = state.requests
  const userID = state.user.db_data._id
  const reqID = state.requests.selectedRequest
  let reqExists
  let request = null
  // attempt to find in the myWork collection first
  if (state.requests.myWork.length) {
    reqExists = state.requests.myWork.find(req => req.content._id === reqID)
    reqExists = reqExists ? reqExists.content : undefined
  }
  // if still not found, attempt to find in the items collection
  if (!reqExists) {
    if (state.requests.items.length) {
      reqExists = state.requests.items.find(req => req._id === reqID)
    }
  }
  // if item was found, create a new object to return
  if (reqExists) {
    request = { ...reqExists }
  }

  return {
    request,
    userID,
    reqID,
    selectedRequestUpdated,
  }
}

const mapDispatchToProps = {
  receiveReqUpdate,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestForm)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, Button, Body, View } from 'native-base'
import { servicerUpdatedRequest, fetchMyWork, fetchRequestsNearby } from '../actions'
import AppointmentModal from './AppointmentModal'

const PickUpAlert = userID => ({
  title: 'Agree to help with issue.',
  subtitle: 'Are you sure you want to perform this work?',
  btnUpdate: { servicer_id: userID, state: 'Assigned' },
})

const DropAlert = {
  title: 'Dropping one of your tasks.',
  subtitle: 'Are you sure you want to stop this work?',
  btnUpdate: { servicer_id: null, planned_start: null, state: 'New' },
}

const styles = {
  dropBtnStyle: dropable => ({ display: dropable ? null : 'none', marginTop: 10 }),
  mainBtnStyle: scheduled => ({ display: !scheduled ? null : 'none' }),
  apptActionsStyle: scheduled => ({
    display: scheduled ? null : 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
  }),
}

class RequestFormActions extends Component {
  static propTypes = {
    reqState: PropTypes.string.isRequired,
    mapRegion: PropTypes.objectOf(PropTypes.any).isRequired,
    clientName: PropTypes.string.isRequired,
    requestID: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    fetchMyWork: PropTypes.func.isRequired,
    fetchRequestsNearby: PropTypes.func.isRequired,
    fetchRequest: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.userID = props.userID
    this.requestID = props.requestID
    this.state = {
      modalVisible: false,
    }
  }

  _onAccept = async (update) => {
    const {
      mapRegion,
      requestID,
      userID,
      fetchMyWork,
      fetchRequestsNearby,
      fetchRequest,
    } = this.props
    try {
      const wasUpdated = await servicerUpdatedRequest(requestID, userID, update)
      if (!wasUpdated) return null
      await fetchMyWork(userID)
      await fetchRequestsNearby(mapRegion, 20000)
      await fetchRequest()
    } catch (error) {
      throw new Error(error)
    }
  }

  _setDate = (newDate) => {
    this._onAccept({ planned_start: newDate.toISOString(), state: 'Scheduled' })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  btnTitle = () => {
    if (this.isNew) return 'Reply to this request'
    if (this.isScheduled) return 'Scheduled - Pending'
    if (this.isScheduleable) return 'Schedule this job'
    if (this.isCloseable) return 'Complete this request'
    if (this.isInReview) return 'Client Review in Progress'
    if (this.isClosed) return 'Closed Complete'
    return 'No action available'
  }

  btnOnPress = () => {
    if (this.isNew) {
      const pAlert = PickUpAlert(this.userID)
      Alert.alert(pAlert.title, pAlert.subtitle, [
        { text: 'Yes', onPress: () => this._onAccept(pAlert.btnUpdate) },
        { text: 'Cancel', onPress: () => false },
      ])
    }
    if (this.isScheduleable) {
      this.setState({ modalVisible: true })
    }
    if (this.isCloseable) {
      return this._onAccept({ state: 'Client Review', actual_end: new Date() })
    }
  }

  render() {
    const { reqState, clientName } = this.props
    this.isInReview = reqState === 'Client Review'
    this.isClosed = reqState.includes('Closed')
    this.isCloseable = reqState === 'Work in Progress'
    this.isDropable = reqState !== 'New' && !this.isInReview
    this.isNew = reqState === 'New'
    this.isScheduled = reqState === 'Scheduled'
    this.isScheduleable = this.isScheduled || reqState === 'Assigned'

    return (
      <Body>
        <View style={styles.apptActionsStyle(this.isScheduled)}>
          <Button
            primary
            onPress={() => this._onAccept({ state: 'Work in Progress', actual_start: new Date() })}
          >
            <Text>Begin work</Text>
          </Button>
          <Button danger onPress={() => this._onAccept({ state: 'Assigned', planned_start: null })}>
            <Text>Cancel Appointment</Text>
          </Button>
        </View>

        <Button
          block
          disabled={this.isScheduled || this.isInReview || this.isClosed}
          info={this.isScheduleable && !this.isScheduled}
          primary={this.isNew}
          success={this.isCloseable}
          onPress={this.btnOnPress}
          style={styles.mainBtnStyle(this.isScheduled)}
        >
          <Text>{this.btnTitle(reqState)}</Text>
        </Button>

        <Button
          style={styles.dropBtnStyle(this.isDropable)}
          light
          block
          onPress={() => {
            Alert.alert(DropAlert.title, DropAlert.subtitle, [
              {
                text: 'Yes',
                onPress: () => this._onAccept(DropAlert.btnUpdate),
              },
              { text: 'Cancel', onPress: () => false },
            ])
          }}
        >
          <Text>Drop this request</Text>
        </Button>

        <AppointmentModal
          clientName={clientName}
          visible={this.state.modalVisible}
          closeModal={this.closeModal}
          updateReq={this._onAccept}
        />
      </Body>
    )
  }
}

const mapStateToProps = state => ({
  userID: state.user.db_data._id,
  mapRegion: state.map.region,
})

export default connect(
  mapStateToProps,
  { fetchMyWork, fetchRequestsNearby },
)(withNavigation(RequestFormActions))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, Button } from 'native-base'
import { servicerUpdatedRequest, fetchMyWork, fetchRequestsNearby } from '../actions'

class AssignRequestButton extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    mapRegion: PropTypes.objectOf(PropTypes.any).isRequired,
    requestID: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    fetchMyWork: PropTypes.func.isRequired,
    fetchRequestsNearby: PropTypes.func.isRequired,
    goBack: PropTypes.bool,
  }

  static defaultProps = {
    goBack: true,
  }

  constructor(props) {
    super(props)
    this.fetchMyWork = this.props.fetchMyWork.bind(this)
    this.userID = props.userID
    this.alertObjD = {
      btnTitle: 'Drop',
      title: 'Dropping one of your tasks.',
      subtitle: 'Are you sure you want to stop this work?',
      btnUpdate: { servicer_id: null, state: 'New' },
    }
    this.alertObjP = {
      btnTitle: 'Pick Up',
      title: 'Agree to help with issue.',
      subtitle: 'Are you sure you want to perform this work?',
      btnUpdate: { servicer_id: this.userID, state: 'Assigned' },
    }
  }

  _onPress = (id, title, subtitle) => {
    Alert.alert(title, subtitle, [this._alert.yes(id), this._alert.cancel])
  }

  _onAccept = async (id) => {
    const { userID } = this.props
    const wasUpdated = await servicerUpdatedRequest(id, userID, this.alertObj.btnUpdate)
    if (!wasUpdated) return null

    this.fetchMyWork(this.userID)
    this.props.fetchRequestsNearby(this.props.mapRegion, 20000)
    if (this.props.goBack) this.props.navigation.goBack()

    return true
  }

  render() {
    const { action, requestID } = this.props

    this._alert = {}
    this._alert.cancel = { text: 'Cancel', onPress: () => false }
    this._alert.yes = id => ({
      text: 'Yes',
      onPress: () => this._onAccept(id),
    })

    this.alertObj = action === 'drop' ? this.alertObjD : this.alertObjP

    return (
      <Button
        small
        onPress={() => this._onPress(requestID, this.alertObj.title, this.alertObj.subtitle)}
      >
        <Text>{this.alertObj.btnTitle}</Text>
      </Button>
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
)(withNavigation(AssignRequestButton))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, Button } from 'native-base'
import { servicerUpdatedRequest, fetchMyWork } from '../actions'

class AssignRequestButton extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    requestID: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    fetchMyWork: PropTypes.func.isRequired,
    goBack: PropTypes.bool,
  }

  static defaultProps = {
    goBack: true,
  }

  constructor(props) {
    super(props)
    this.fetchMyWork = this.props.fetchMyWork.bind(this)
    if (props.action === 'drop') {
      this.state = {
        btnTitle: 'Drop',
        Atitle: 'Dropping one of your tasks.',
        Asubtitle: 'Are you sure you want to stop this work?',
        AbtnTitle: 'Yes',
        AbtnUpdate: { servicer_id: null, state: 'New' },
      }
    } else if (props.action === 'pickup') {
      this.state = {
        btnTitle: 'Pick up',
        Atitle: 'Complete this request.',
        Asubtitle: 'Are you sure you want to complete this work?',
        AbtnTitle: 'Yes',
        AbtnUpdate: { servicer_id: props.userID, state: 'Assigned' },
      }
    }
    this._alert = {}
    this._alert.cancel = { text: 'Cancel', onPress: () => false }
    this._alert.yes = id => ({
      text: this.state.AbtnTitle,
      onPress: () => {
        servicerUpdatedRequest(id, this.state.AbtnUpdate)
          .then(this.fetchMyWork(this.props.userID))
          .then(() => {
            if (props.goBack) props.navigation.goBack()
          })
      },
    })
  }

  _onPress = (id) => {
    Alert.alert(this.state.Atitle, this.state.Asubtitle, [this._alert.yes(id), this._alert.cancel])
  }

  render() {
    return (
      <Button small onPress={() => this._onPress(this.props.requestID)}>
        <Text>{this.state.btnTitle}</Text>
      </Button>
    )
  }
}

const mapStateToProps = state => ({
  userID: state.user.db_data._id,
})

export default connect(
  mapStateToProps,
  { fetchMyWork },
)(withNavigation(AssignRequestButton))

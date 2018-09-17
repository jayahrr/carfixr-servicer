import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base'
import { fetchMyWork } from '../actions/'
import { REQS_MYWORK } from '../actions/types'
import WorkList from '../components/WorkList'
import FindWorkButton from '../components/FindWorkButton'
import RequestFormModal from '../components/RequestFormModal'

export class WorkScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    myWork: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchMyWork: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.openDrawer = () => {
      props.navigation.toggleDrawer()
    }
    this.fetchMyWork = this.props.fetchMyWork.bind(this)
    this.state = {
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.fetchMyWork(this.props.userID)
  }

  toggleModal = (modalVisible, request) => {
    this.setState({ modalVisible })
    this.modalReq = request
    this.enableReqForm = modalVisible
  }

  showContent = () => {
    if (this.props.myWork.length !== 0) {
      return <WorkList {...this.props} toggleModal={this.toggleModal} />
    }
    return <FindWorkButton />
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
        <Header>
          <Left />
          <Body>
            <Title>My Work</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>{this.showContent()}</Content>

        {this.renderReqForm()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userID: state.user.db_data._id,
  myWork: state.requests.myWork,
})

const mapDispatchToProps = dispatch => ({
  setMyWork: myWork =>
    dispatch({
      type: REQS_MYWORK,
      payload: myWork,
    }),
  fetchMyWork: servicerID => dispatch(fetchMyWork(servicerID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkScreen)

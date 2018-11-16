import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base'

import { fetchMyWork, selectRequest } from '../actions/'
import { REQS_MYWORK } from '../actions/types'
import WorkList from '../components/WorkList'
import FindWorkButton from '../components/FindWorkButton'

export class WorkScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    myWork: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchMyWork: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchMyWork, userID } = this.props
    fetchMyWork(userID)
  }

  handleSelectRequest = (reqID) => {
    const { navigation, selectRequest } = this.props
    selectRequest(reqID)
    navigation.navigate('RequestForm')
  }

  render() {
    const { navigation, myWork } = this.props
    const list = myWork.length !== 0
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>My Work</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          {list && <WorkList {...this.props} handleSelectRequest={this.handleSelectRequest} />}
          {!list && <FindWorkButton />}
        </Content>
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
  selectRequest: reqID => dispatch(selectRequest(reqID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkScreen)

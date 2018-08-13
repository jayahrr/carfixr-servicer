import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base'
import { REQS_MYWORK } from '../actions/types'
import { fetchRequestsAssignedToMe } from '../actions/'
import WorkList from '../components/WorkList'
import FindWorkButton from '../components/FindWorkButton'

export class WorkScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Scheduled Work',
    drawerIcon: ({ tintColor }) => <Icon name="ios-clock" size={30} color={tintColor} />,
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
    myWork: PropTypes.arrayOf(PropTypes.object).isRequired,
    setMyWork: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.openDrawer = () => {
      props.navigation.toggleDrawer()
    }
    this.fetchMyWork = async () => {
      const response = await fetchRequestsAssignedToMe(props.userID)
      const myWork = []
      if (response && response.length) {
        response.forEach((item) => {
          const obj = {
            title: item.short_description,
            content: item,
          }
          myWork.push(obj)
        })
      }
      props.setMyWork(myWork)
    }
  }

  componentDidMount() {
    this.fetchMyWork()
  }

  render() {
    const { navigation, myWork } = this.props
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>My Work</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          {myWork.length ? (
            <WorkList myWork={myWork} fetchMyWork={this.fetchMyWork} />
          ) : (
            <FindWorkButton navigation={navigation} />
          )}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkScreen)

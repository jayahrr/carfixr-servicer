import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Card,
  CardItem,
  Text,
} from 'native-base'
import { fetchRequestsAssignedToMe } from '../actions/'

export class WorkScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Scheduled Work',
    drawerIcon: ({ tintColor }) => <Icon name="ios-clock" size={30} color={tintColor} />,
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    userID: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      work: null,
    }
    this.openDrawer(() => {
      props.navigation.toggleDrawer()
    })
    this.goHome(() => {
      props.navigation.navigate({ routeName: 'Home' })
    })
  }

  componentDidMount() {
    fetchRequestsAssignedToMe(this.props.userID).then((response) => {
      if (response !== null) {
        this.setState({
          work: response,
        })
      }
    })
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
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          {this.state.work != null ? (
            <Text>Found some!</Text>
          ) : (
            <Card>
              <CardItem header>
                <Text>Did not find any work scheduled for you.</Text>
              </CardItem>
              <CardItem footer>
                <Button iconRight primary onPress={() => this.goHome()}>
                  <Text>Find work in my area</Text>
                  <Icon name="ios-search" />
                </Button>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userID: state.user.db_data._id,
})

export default connect(mapStateToProps)(WorkScreen)

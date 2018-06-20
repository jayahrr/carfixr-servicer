import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Icon,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Content,
  Card,
  CardItem,
  Text,
} from 'native-base'

class MessagesScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Messages',
    drawerIcon: ({ tintColor }) => <Icon name="ios-chatbubbles" size={30} color={tintColor} />,
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Messages</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer()
              }}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          <Card>
            <CardItem header>
              <Text>Did not find any messages for you.</Text>
            </CardItem>
            <CardItem footer>
              <Button
                iconRight
                primary
                onPress={() => {
                  this.props.navigation.navigate({ routeName: 'Home' })
                }}
              >
                <Text>Find work in my area</Text>
                <Icon name="ios-search" />
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default MessagesScreen

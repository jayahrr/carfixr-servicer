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

export default class ProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'My Account',
    drawerIcon: ({ tintColor }) => <Icon name="ios-person" size={30} color={tintColor} />,
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
            <Title>Account</Title>
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

        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Servicer information</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable developers to build
                  high-quality mobile apps using React Native iOS and Android apps with a fusion of
                  ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase builds a layer on top of React Native that provides you with basic set
                  of components for mobile application development.
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Get on the mobile fast track with NativeBase, the fastest-growing platform and
                  tool set for iOS and Android development.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

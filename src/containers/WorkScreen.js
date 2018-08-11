import React, { PureComponent } from 'react'
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

export default class WorkScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Scheduled Work',
    drawerIcon: ({ tintColor }) => <Icon name="ios-clock" size={30} color={tintColor} />,
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
            <Title>My Work</Title>
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
            <CardItem header>
              <Text>Did not find any work scheduled for you.</Text>
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

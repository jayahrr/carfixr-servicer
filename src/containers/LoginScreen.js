import React from 'react'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base'
import { SafeAreaView } from 'react-native'
import * as Theme from '../config/theme'
import { Footer, Logo } from '../components/common'

const SignInScreen = ({ navigation }) => (
  <SafeAreaView style={Theme.screens}>
    <Container>
      <Content>
        <Logo />
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>

        <Button block primary onPress={() => navigation.navigate({ routeName: 'HomeDrawer' })}>
          <Text>Sign in</Text>
        </Button>

        <Footer />
      </Content>
    </Container>
  </SafeAreaView>
)

SignInScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withNavigation(SignInScreen)

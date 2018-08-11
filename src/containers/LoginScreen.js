import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Content, Header, Body, Title, Segment, Button, Text } from 'native-base'
import { ScrollView } from 'react-native'
import { Footer, Logo } from '../components/common'
import AuthForm from '../components/AuthForm'
import { USER_DATA } from '../actions/types'

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    screenProps: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  componentDidMount() {
    if (this.props.screenProps.isLoggedIn) {
      this.props.navigation.navigate({ routeName: 'HomeDrawer' })
    }
  }

  _toggleSegment = (bool = undefined) => {
    if (bool === undefined) this.setState({ active: !this.state.active })
    else this.setState({ active: bool })
  }

  render() {
    const { active } = this.state
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Header hasSegment>
            <Body>
              <Title>
                <Logo />
              </Title>
            </Body>
          </Header>

          <Segment>
            <Button first active={active} onPress={() => this._toggleSegment(true)}>
              <Text>Sign in</Text>
            </Button>
            <Button last active={!active} onPress={() => this._toggleSegment(false)}>
              <Text>Sign up</Text>
            </Button>
          </Segment>

          <Content>
            <AuthForm
              navigation={this.props.navigation}
              toggleSegment={this._toggleSegment}
              setUserData={this.props.setUserData}
              {...this.state}
            />
            <Footer />
          </Content>
        </Container>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserData: (userData) => {
    console.log('setUserData userData: ', userData)
    dispatch({
      type: USER_DATA,
      payload: userData,
    })
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen)

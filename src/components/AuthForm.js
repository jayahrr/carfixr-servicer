import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { Item, Input, Content, Button, Text, View, Label, Spinner } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import { loginUser, createUser } from '../actions/AuthActions'
import * as Theme from '../config/theme'

const styles = {
  submitBtn: { backgroundColor: Theme.colors.spot1, marginTop: 10 },
}

const required = value => (value ? undefined : 'required')
const tooShort = value => (value.length < 8 && value !== '' ? 'too short' : undefined)
const hasAt = value => (!value.includes('@') && value !== '' ? '@ not included' : undefined)

class AuthForm extends Component {
  static propTypes = {
    ...propTypes,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor() {
    super()
    this.state = {
      fetching: false,
    }
  }

  _renderInput = ({
    input: { onChange, ...restInput },
    label,
    meta: { error },
    secureTextEntry,
    autoCapitalize = 'none',
  }) => {
    const hasError = error !== undefined
    return (
      <Item error={hasError}>
        <Label>{label}</Label>
        <Input
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoComplete={false}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  _handleSignIn = async ({ email, password }) => {
    this.setState({ fetching: true })
    const { navigation, toggleSegment, active } = this.props
    if (active) {
      const answer = await loginUser({ email, password, navigation })
      this.setState({ fetching: false })
      if (!answer.ok) {
        Alert.alert('Your account was not found.', 'Would you like to create one?', [
          { text: 'OK', onPress: toggleSegment },
          { text: 'Cancel', onPress: () => false },
        ])
      } else {
        navigation.navigate({ routeName: 'HomeDrawer' })
      }
    }
  }

  _handleSignUp = async (values) => {
    this.setState({ fetching: true })
    const { navigation, toggleSegment, active } = this.props
    if (!active) {
      const answer = await createUser(values)
      this.setState({ fetching: false })
      if (answer.ok) {
        navigation.navigate({ routeName: 'HomeDrawer' })
      }
      if (answer.error && answer.error.code === 'auth/email-already-in-use') {
        Alert.alert('An account with that email already exists.', 'Would you like to sign in?', [
          { text: 'OK', onPress: toggleSegment },
          { text: 'Cancel', onPress: () => false },
        ])
      }
    }
  }

  render() {
    const { handleSubmit, active } = this.props
    const btnTitle = this.state.fetching ? (
      <Spinner />
    ) : (
      <Text>{active ? 'Sign in' : 'Sign up'}</Text>
    )
    const btnPress = this.props.active
      ? handleSubmit(this._handleSignIn)
      : handleSubmit(this._handleSignUp)

    return (
      <View>
        <Content padder>
          <Field
            name="email"
            label="Email"
            component={this._renderInput}
            validate={[required, tooShort, hasAt]}
          />
          {!active ? (
            <View>
              <Field
                name="first"
                label="First name"
                component={this._renderInput}
                validate={[required]}
                autoCapitalize="words"
              />
              <Field
                name="last"
                label="Last name"
                component={this._renderInput}
                validate={[required]}
                autoCapitalize="words"
              />
              <Field
                name="phone"
                label="Phone number"
                component={this._renderInput}
                validate={[required, tooShort]}
              />
            </View>
          ) : null}
          <Field name="password" label="Password" component={this._renderInput} secureTextEntry />

          <Button block primary style={styles.submitBtn} onPress={btnPress}>
            {btnTitle}
          </Button>
        </Content>
      </View>
    )
  }
}
export default reduxForm({
  form: 'AuthenticationForm',
  // validate,
})(AuthForm)

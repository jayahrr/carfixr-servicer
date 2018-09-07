import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { Item, Input, Content, Button, Text, View, Label, Spinner } from 'native-base'
import { Field, reduxForm, propTypes } from 'redux-form'
import { fetchUserData, loginUser, createUser } from '../actions/AuthActions'

const styles = {
  submitBtn: { marginTop: 10 },
}

const required = value => (value ? undefined : 'required')
const tooShort = value => (value.length < 8 && value !== '' ? 'too short' : undefined)
const notEmail = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined)

class AuthForm extends Component {
  static propTypes = {
    ...propTypes,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
    }
    // alert configurations
    this.createAlert = [
      { text: 'OK', onPress: props.toggleSegment },
      { text: 'Cancel', onPress: () => false },
    ]
    this.signinAlert = [
      { text: 'OK', onPress: props.toggleSegment },
      { text: 'Cancel', onPress: () => false },
    ]
    this.passwordAlert = [
      { text: 'OK', onPress: () => false },
      { text: 'Forgot my password', onPress: () => false },
    ]
  }

  _renderInput = ({
    input: { onChange, ...restInput },
    label,
    meta: { error },
    secureTextEntry,
    autoCapitalize = 'none',
    type,
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
          type={type}
          {...restInput}
        />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  _handleSignIn = async ({ email, password }) => {
    this.setState({ fetching: true })
    const { navigation, active } = this.props
    if (active) {
      const answer = await loginUser({ email, password, navigation })
      this.setState({ fetching: false })
      if (answer.ok) {
        this.props.reset()
        this.props.setUserData(await fetchUserData(email))
        navigation.navigate({ routeName: 'HomeDrawer' })
      } else if (answer.error.code === 'auth/user-not-found') {
        Alert.alert(
          'Your account was not found.',
          'Would you like to create one?',
          this.createAlert,
        )
      } else if (answer.error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password!', '', this.passwordAlert)
      }
    }
  }

  _handleSignUp = async (values) => {
    this.setState({ fetching: true })
    const { navigation, active } = this.props
    if (!active) {
      const answer = await createUser(values)
      this.setState({ fetching: false })
      if (answer.ok) {
        this.props.reset()
        navigation.navigate({ routeName: 'HomeDrawer' })
      }
      if (answer.error && answer.error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'An account using that address already exists.',
          'Would you like to sign in?',
          this.signinAlert,
        )
      }
    }
  }

  render() {
    const {
      handleSubmit, active, pristine, submitting,
    } = this.props
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
        <Content>
          <Field
            name="email"
            label="Email"
            type="email"
            component={this._renderInput}
            validate={[required, notEmail]}
          />
          {!active ? (
            <View>
              <Field
                name="first"
                label="First name"
                type="text"
                component={this._renderInput}
                validate={[required]}
                autoCapitalize="words"
              />
              <Field
                name="last"
                label="Last name"
                type="text"
                component={this._renderInput}
                validate={[required]}
                autoCapitalize="words"
              />
              <Field
                name="phone"
                label="Phone number"
                type="text"
                component={this._renderInput}
                validate={[required, tooShort]}
              />
            </View>
          ) : null}
          <Field name="password" label="Password" component={this._renderInput} secureTextEntry />

          <Button
            block
            primary
            style={styles.submitBtn}
            disabled={pristine || submitting}
            onPress={btnPress}
          >
            {btnTitle}
          </Button>
        </Content>
      </View>
    )
  }
}

export default reduxForm({
  form: 'AuthenticationForm',
})(AuthForm)

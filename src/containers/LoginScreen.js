import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import * as Theme from '../config/theme'
import { Card, Footer, Logo, CardTitle } from '../components/common'

const styles = StyleSheet.create({
  contentContainer: {
    borderWidth: 0,
    height: Theme.DEVICE_HEIGHT / 2.4,
    marginTop: -30,
  },
  icon: {
    flex: 1,
  },
})

const SignInScreen = ({ navigation }) => (
  <SafeAreaView style={Theme.screens}>
    <Logo />
    <Card style={styles.contentContainer}>
      <CardTitle title="SIGN IN" />
      <Ionicons.Button
        name="md-arrow-round-back"
        size={28}
        color={Theme.colors.text.primary}
        backgroundColor={Theme.colors.default}
        onPress={() => navigation.navigate({ routeName: 'SignUp' })}
        style={styles.icon}
      />
    </Card>
    <Footer />
  </SafeAreaView>
)

SignInScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withNavigation(SignInScreen)

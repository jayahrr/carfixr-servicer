import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Button, Text, Container, Content, Icon, H1, View } from 'native-base'
import { DrawerItems } from 'react-navigation'
import { logoutUser } from '../actions/AuthActions'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.spot1,
  },
  bannerText: {
    color: Theme.colors.default,
  },
})

const _logOut = (navigation) => {
  logoutUser(navigation)
  navigation.navigate({ routeName: 'LoginStack' })
}

const _handleLogOut = (navigation) => {
  Alert.alert('Are you sure you want to log out?', '', [
    { text: 'Yes', onPress: () => _logOut(navigation) },
    { text: 'No', onPress: () => false },
  ])
}

const CustomDrawerContent = props => (
  <Container>
    <Content bounce={false}>
      <View style={styles.titleContainer}>
        <H1 style={styles.bannerText}>GoMech</H1>
      </View>
      <DrawerItems {...props} />
      <Button
        style={styles.btnContainer}
        block
        iconRight
        light
        onPress={() => _handleLogOut(props.navigation)}
      >
        <Text>Log out</Text>
        <Icon name="ios-log-out" />
      </Button>
    </Content>
  </Container>
)

CustomDrawerContent.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default CustomDrawerContent

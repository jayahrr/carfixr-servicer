import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, Container, Content, Icon, H1, View } from 'native-base'
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import WorkScreen from '../containers/WorkScreen'
import ProfileScreen from '../containers/ProfileScreen'
import MessagesScreen from '../containers/MessagesScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    marginHorizontal: 5,
    marginTop: 50,
  },
  titleContainer: {
    margin: 5,
    marginBottom: 10,
  },
})

const CustomDrawerContentComponent = props => (
  <Container>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Content>
        <View style={styles.titleContainer}>
          <H1>CARFIXR</H1>
        </View>
        <DrawerItems {...props} />
        <Button
          style={styles.btnContainer}
          block
          iconRight
          light
          onPress={() => props.navigation.navigate({ routeName: 'LoginStack' })}
        >
          <Text>Log out</Text>
          <Icon name="ios-log-out" />
        </Button>
      </Content>
    </SafeAreaView>
  </Container>
)

const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Work: {
      screen: WorkScreen,
    },
    Messages: {
      screen: MessagesScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  },
)

export default HomeDrawer

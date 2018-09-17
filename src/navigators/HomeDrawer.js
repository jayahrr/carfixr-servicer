import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import HomeScreenStack from '../navigators/HomeScreenStack'
import WorkScreen from '../containers/WorkScreen'
import MessagesScreen from '../containers/MessagesScreen'
import CustomDrawerContent from '../components/CustomDrawerContent'
import ProfileScreenStack from './ProfileScreenStack'

export default createDrawerNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon ios="ios-home" android="md-home" size={30} color={tintColor} />
        ),
      },
    },
    Work: {
      screen: WorkScreen,
      navigationOptions: {
        drawerLabel: 'Work',
        drawerIcon: ({ tintColor }) => <Icon name="ios-clock" size={30} color={tintColor} />,
      },
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        drawerLabel: 'Messages',
        drawerIcon: ({ tintColor }) => <Icon name="ios-chatbubbles" size={30} color={tintColor} />,
      },
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: {
        drawerLabel: 'Account',
        drawerIcon: ({ tintColor }) => (
          <Icon ios="ios-person" android="md-person" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <CustomDrawerContent {...props} />,
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

import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import WorkScreen from '../containers/WorkScreen'
import ProfileScreen from '../containers/ProfileScreen'
import MessagesScreen from '../containers/MessagesScreen'
import CustomDrawerContent from '../components/CustomDrawerContent'

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

export default HomeDrawer

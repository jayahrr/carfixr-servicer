import { createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import WorkScreen from '../containers/WorkScreen'
import ProfileScreen from '../containers/ProfileScreen'

const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Work: {
      screen: WorkScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
)

export default HomeDrawer

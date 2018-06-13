import { createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'

const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
)

export default HomeDrawer

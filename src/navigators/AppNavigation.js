import { createStackNavigator } from 'react-navigation'
import LoginStack from './LoginStack'
import HomeDrawer from './HomeDrawer'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    HomeDrawer: { screen: HomeDrawer },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'HomeDrawer',
  },
)

export default PrimaryNav

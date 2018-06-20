import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../containers/LoginScreen'

const LoginStack = createStackNavigator(
  {
    Home: {
      screen: LoginScreen,
    },
  },
  {
    // Default config for all screens
    headerMode: 'none',
  },
)

export default LoginStack

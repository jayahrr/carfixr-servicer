import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../containers/LoginScreen'

const LoginStack = createStackNavigator({
  Home: {
    screen: LoginScreen,
  },
})

export default LoginStack

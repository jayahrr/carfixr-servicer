import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import NearbyRequestsListScreen from '../containers/NearbyRequestsListScreen'

const HomeScreenStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    RequestList: { screen: NearbyRequestsListScreen },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
  },
)

export default HomeScreenStack

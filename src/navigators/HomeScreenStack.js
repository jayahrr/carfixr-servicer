import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import NearbyRequestsListScreen from '../containers/NearbyRequestsListScreen'
import RequestForm from '../containers/RequestForm'

const HomeScreenStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    RequestList: { screen: NearbyRequestsListScreen },
    RequestForm: { screen: RequestForm },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
  },
)

export default HomeScreenStack

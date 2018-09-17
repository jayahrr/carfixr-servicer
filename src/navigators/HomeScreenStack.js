import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import NearbyRequestsListScreen from '../containers/NearbyRequestsListScreen'
import RequestForm from '../containers/RequestForm'

const HomeScreenStack = createStackNavigator(
  {
    HomeMap: { screen: HomeScreen },
    RequestList: { screen: NearbyRequestsListScreen },
    RequestForm: { screen: RequestForm, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'HomeMap',
    mode: 'modal',
  },
)

export default HomeScreenStack

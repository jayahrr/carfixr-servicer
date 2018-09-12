import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../containers/HomeScreen'
import NearbyRequestsListScreen from '../containers/NearbyRequestsListScreen'
import RequestForm from '../containers/RequestForm'
import CatalogItemList from '../components/CatalogItemList'

const HomeScreenStack = createStackNavigator(
  {
    HomeMap: { screen: HomeScreen },
    RequestList: { screen: NearbyRequestsListScreen },
    RequestForm: { screen: RequestForm },
  },
  {
    initialRouteName: 'HomeMap',
    mode: 'modal',
  },
)

export default HomeScreenStack

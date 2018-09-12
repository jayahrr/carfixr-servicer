import { createStackNavigator } from 'react-navigation'
import CatalogItemList from '../components/CatalogItemList'
import ProfileScreen from '../containers/ProfileScreen'

export default createStackNavigator(
  {
    ProfileHome: { screen: ProfileScreen },
    ServicesList: { screen: CatalogItemList },
  },
  {
    initialRouteName: 'ProfileHome',
    mode: 'modal',
    headerMode: 'none',
  },
)

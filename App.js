import { createStackNavigator, } from 'react-navigation';
import ClientList from './screens/ClientList'
import ClientProfile from './screens/ClientProfile'



export default createStackNavigator({
  Home: {
    screen: ClientList
  },
  ClientProfile: {
    screen: ClientProfile
  }
});
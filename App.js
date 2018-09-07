import { createStackNavigator, } from 'react-navigation';
import ClientListScreen from './screens/ClientListScreen'
import ClientProfile from './screens/ClientProfile'



export default createStackNavigator({
  Home: {
    screen: ClientListScreen
  },
  ClientProfile: {
    screen: ClientProfile
  }
});
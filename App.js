import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import ClientListScreen from './screens/ClientListScreen'
import ClientProfile from './screens/ClientProfile'

const HomeStack = createStackNavigator({
  Home: { screen: ClientListScreen },
  ClientProfile: { screen: ClientProfile }
});

export default HomeStack;
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import ClientListScreen from './Screens/ClientListScreen'
import ClientProfile from './Screens/ClientProfile'

const HomeStack = createStackNavigator({
  Home: { screen: ClientListScreen },
  ClientProfile: { screen: ClientProfile }
});

export default HomeStack;
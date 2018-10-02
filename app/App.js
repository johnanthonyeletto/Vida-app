import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ClientListScreen from './Screens/ClientListScreen';
import ClientProfile from './Screens/ClientProfile';
import AuthLoadingScreen from './Screens/Auth/AuthLoadingScreen';
import LoginScreen from './Screens/Auth/LoginScreen';

const AuthStack = createStackNavigator({
  SignIn: { screen: LoginScreen }
});

const AppStack = createStackNavigator({
  Home: { screen: ClientListScreen },
  ClientProfile: { screen: ClientProfile }
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
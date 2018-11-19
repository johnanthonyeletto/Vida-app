import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });


export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: AuthStack
},
  {
    initialRouteName: 'AuthLoading',
  });
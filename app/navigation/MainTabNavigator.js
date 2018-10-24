import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ClientProfileScreen from '../screens/ClientProfileScreen';
import eventView from '../screens/eventScreens/eventView';
import eventEntry from '../screens/eventScreens/eventEntry';
import ClientGraphScreen from '../screens/ClientGraphScreen';
import AuthStack from './AppNavigator';
import Colors from '../constants/Colors';
import NoteScreen from '../screens/ClientProfile/NoteScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ClientProfile: ClientProfileScreen,
  ClientGraph: ClientGraphScreen,
  Notes: NoteScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Clients',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-people${focused ? '' : '-outline'}`
          : 'md-people'
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  EView: eventView,
  EEntry: eventEntry,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// CLIENT SCREENS
import HomeScreen from '../screens/HomeScreen';
import ClientProfileScreen from '../screens/Client/ClientProfileScreen';
import ClientGraphScreen from '../screens/Client/ClientGraphScreen';
import AddClientScreen from '../screens/Client/AddClientScreen';

// EVENT SCREENS
import MeetingsScreen from '../screens/MeetingsScreen';
import eventView from '../screens/eventScreens/eventView';
import eventEntry from '../screens/eventScreens/eventEntry';
import NoteScreen from '../screens/ClientProfile/NoteScreen';

// SETTINGS SCREENS
import SettingsScreen from '../screens/Settings/SettingsScreen';

// OTHER COMPONENTS
import TabBarIcon from '../components/TabBarIcon';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ClientProfile: ClientProfileScreen,
  AddClient: AddClientScreen,
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
  Meetings: MeetingsScreen,
  EView: eventView,
  EEntry: eventEntry,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Meetings',
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

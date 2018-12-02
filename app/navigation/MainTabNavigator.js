import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// CLIENT SCREENS
import HomeScreen from '../screens/HomeScreen';
import ClientProfileScreen from '../screens/Client/ClientProfileScreen';
import ClientGraphScreen from '../screens/Client/ClientGraphScreen';
import AddClientScreen from '../screens/Client/AddClientScreen';
import AddRelationshipScreen from '../screens/Client/AddRelationshipScreen';
import NoteEntryScreen from '../screens/Client/NoteEntryScreen';

// EVENT SCREENS
import MeetingsScreen from '../screens/MeetingsScreen';
import EventView from '../screens/eventScreens/eventView';
import EventEntry from '../screens/eventScreens/eventEntry';
import EventUpdate from '../screens/eventScreens/eventUpdate';

// SETTINGS SCREENS
import SettingsScreen from '../screens/Settings/SettingsScreen';
import EditAccountScreen from '../screens/Settings/EditAccountScreen';
import EditCompanyInfoScreen from '../screens/Settings/EditCompanyInfoScreen';
import ManageEmployeesScreen from '../screens/Settings/ManageEmployeesScreen';
import ViewEmployeeScreen from '../screens/Settings/ViewEmployeeScreen';

// OTHER COMPONENTS
import TabBarIcon from '../components/TabBarIcon';


import Colors from '../constants/Colors';

const defaultNavigationOptions = {
  headerTitleStyle: {
    color: Colors.blue
  },
  headerStyle: {
    backgroundColor: Colors.white
  },
  mode: 'modal',
  headerMode: 'float',
  headerTransitionPreset: 'uikit',
};

const ClientProfileStack = createStackNavigator({
  ClientProfile: ClientProfileScreen,
  AddClient: AddClientScreen,
  ClientGraph: ClientGraphScreen,
  NoteEntry: NoteEntryScreen,
  AddRelationship: AddRelationshipScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions
  });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddClient: AddClientScreen,
  ClientProfile: {
    screen: ClientProfileStack,
    navigationOptions: {
      header: null,
    }
  },
}, {
    defaultNavigationOptions: defaultNavigationOptions
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
  EView: EventView,
  EEntry: EventEntry,
  EUpdate: EventUpdate,
}, {
    defaultNavigationOptions: defaultNavigationOptions
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
  EditAccount: EditAccountScreen,
  EditCompanyInfo: EditCompanyInfoScreen,
  ManageEmployees: ManageEmployeesScreen,
  ViewEmployee: ViewEmployeeScreen,
  ClientProfile: {
    screen: ClientProfileStack,
    navigationOptions: {
      header: null,
    }
  },
}, {
    defaultNavigationOptions: defaultNavigationOptions
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

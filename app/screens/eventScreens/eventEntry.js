import React from 'react';
import {
  AsyncStorage, ScrollView, StyleSheet,
  Text, Button, TouchableOpacity,
  View,FormLabel, FormInput, FormValidationMessage, } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import Navigator from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class EventEntry extends React.Component {
  static navigationOptions = {
    title: 'Add Event',
    headerTitleStyle:{
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };



  render() {
    return (
      <View></View>
    );
  }

}
const styles = StyleSheet.create({
  eventAddContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: Colors.white
  },
});

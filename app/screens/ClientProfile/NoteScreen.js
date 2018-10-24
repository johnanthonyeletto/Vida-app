import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, Alert } from 'react-native';
import Colors from '../../constants/Colors';

const NotesHTML = require('../../assets/html/notes_text_editor.html');


export default class NoteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    title: '0:00',
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity onPress={() => {
        Alert.alert(
          'End Meeting?',
          'Are you sure that you want to end this meeting?',
          [
            { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: () => navigation.navigate("ClientProfile") },
          ],
        )
      }} style={{ marginRight: 25 }}>
        <Text style={{ color: Colors.red, fontSize: 20, fontWeight: "bold" }}>End</Text>
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={NotesHTML}
        style={{ backgroundColor: Colors.white }}
      />
    );
  }
}

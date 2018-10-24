import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView } from 'react-native';
import Colors from '../../constants/Colors';

const NotesHTML = require('../../assets/html/notes_text_editor.html');


export default class NoteScreen extends Component {
  static navigationOptions = {
    title: '0:00',
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity onPress={() => { alert("New Client") }} style={{ marginRight: 25 }}>
        <Text style={{ color: Colors.red, fontSize: 20, fontWeight: "bold" }}>End</Text>
      </TouchableOpacity>
    ),
  };

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

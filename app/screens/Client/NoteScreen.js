import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, Alert } from 'react-native';
import Colors from '../../constants/Colors';

const NotesHTML = require('../../assets/html/notes_text_editor.html');

let _this = null;

export default class NoteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerRight: (
      <TouchableOpacity onPress={() => {
        _this._save();
      }} style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 20, color: Colors.blue }}>Save</Text>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    _this = this;
  }

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={NotesHTML}
        style={{ backgroundColor: Colors.white }}
        onMessage={(event) => this.setState({ note: event.nativeEvent.data })}
      />
    );
  }

  _save() {
    var note = _this.state.note;
    alert(note);
  }
}

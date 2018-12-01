import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import Client from '../../models/Client';
import LoadingOverlay from '../../components/loadingOverlay';

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

    const { navigation } = this.props;
    const pid = navigation.getParam('pid', 'NONE');
    this.setState({ pid });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={NotesHTML}
          style={{ backgroundColor: Colors.white, flex: 1, }}
          onMessage={(event) => this.setState({ note: event.nativeEvent.data })}
        />
        {
          this.state.loading &&
          <LoadingOverlay />
        }
      </View>
    );
  }

  _save() {
    this.setState({ loading: true });

    var client = new Client();
    client.pid = this.state.pid;

    client.note(this.state.note_id, this.state.note).then(response => {
      this.setState({ 'note_id': response, loading: false });
    }).catch(err => {
      alert(err);
    });
  }
}

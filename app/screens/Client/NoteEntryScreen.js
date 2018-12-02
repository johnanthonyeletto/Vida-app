import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, WebView, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import Client from '../../models/Client';
import LoadingOverlay from '../../components/loadingOverlay';

const NotesHTML = require('../../assets/html/notes_text_editor.html');

let _this = null;

export default class NoteEntryScreen extends Component {
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

    this.webView = null;

  }

  componentDidMount() {
    _this = this;

    const { navigation } = this.props;
    const pid = navigation.getParam('pid', 'NONE');
    const note = navigation.getParam('note', 'NONE');

    if (this.state.note != 'NONE') {
      this.setState({ note: note.note, note_id: note.note_id });
    }
    this.setState({ pid });



  }

  _sendData() {
    if (this.state.note) {
      this.webView.postMessage(this.state.note);
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={NotesHTML}
          style={{ backgroundColor: Colors.white, flex: 1, }}
          onMessage={(event) => this.setState({ note: event.nativeEvent.data })}
          ref={(webView) => this.webView = webView}
          onLoad={() => { this._sendData() }}
        />
        {
          this.state.loading &&
          <LoadingOverlay />
        }
      </SafeAreaView>
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

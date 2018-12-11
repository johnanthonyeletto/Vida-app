import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, WebView, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import Client from '../../models/Client';
import LoadingOverlay from '../../components/loadingOverlay';
import Environment from '../../constants/Environment';


const NotesHTMLSource = Environment.API_HOST + '/notes_text_editor.html';
// const NotesHTML = require(NotesHTMLSource);

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
      loading: true,
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
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: NotesHTMLSource }}
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

    if (this.state.loading) {
      return;
    }

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

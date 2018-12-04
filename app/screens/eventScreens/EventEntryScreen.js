import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import ClientList from '../../models/ClientList';
import Event from '../../models/Event';
import FormGroup from '../../components/forms/FormGroup';
import LoadingOverlay from '../../components/loadingOverlay';

let _this = null;

export default class EventEntryScreen extends React.Component {
  static navigationOptions = {
    title: 'Update Event',
    headerRight: (
      <TouchableOpacity onPress={() => {
        _this._save();
      }} style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 20, color: Colors.blue }}>Save</Text>
      </TouchableOpacity>
    ),
  };

  // Start cancelling all subscriptions and asyncs when component unmounts

  constructor(props) {
    super(props);
    this.state = {
      event: [],
      inactiveClients: [],
      activeClients: [],
      loading: false,
    };
  }


  async componentDidMount() {
    _this = this;

    const { navigation } = this.props;
    var event = navigation.getParam('eventPKG', 'NONE');

    if (event != 'NONE') {
      this.setState({
        event_id: event.event_id,
        event_datetime: event.event_datetime,
        pid: event.pid,
        location: event.location,
        notes: event.notes,
      });
    }


    var clientList = new ClientList();
    clientList.getClients().then(foundClients => {
      var clients = foundClients;
      this.setState({ activeClients: clients.active })
      this.setState({ inactiveClients: clients.inactive })
    });
    this.event = new Event();
  }


  render() {
    return (
      <DismissKeyboard>
        <ScrollContainer>
          <FormGroup
            type={"date"}
            value={this.state.event_datetime}
            placeholder={"Date"}
            onChangeText={(event_datetime) => this.setState({ event_datetime })}
          />

          <FormGroup
            clearButtonMode="while-editing"
            textContentType="location"
            placeholder='Location'
            value={this.state.location}
            onChangeText={(location) => this.setState({ location })}
          />


          <FormGroup
            placeholder='Notes'
            clearButtonMode="while-editing"
            multiline={true}
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.notes} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>

            <TouchableOpacity onPress={() => {
              this.event.deleteEvent(this.state.event.event_id).then(() => {
                this.props.navigation.state.params.onNavigateBack();
                this.props.navigation.goBack();
              });
            }} >
              <Text style={{ color: Colors.red, marginLeft: 25 }}>Delete</Text>
            </TouchableOpacity>

          </View>
          {this.state.loading &&
            <LoadingOverlay />
          }
        </ScrollContainer>
      </DismissKeyboard>
    );
  }




  _save = async () => {
    this.setState({ loading: true });
    var eventSave = new Event();
    eventSave.pid = this.state.pid;
    eventSave.event_id = this.state.event_id;
    eventSave.event_datetime = this.state.event_datetime;
    eventSave.location = this.state.location;
    eventSave.notes = this.state.notes;

    eventSave.save().then(() => {
      this.setState({ loading: false });

      this.props.navigation.state.params.onNavigateBack();
      this.props.navigation.goBack();
    }).catch((errorMessage) => {
      this.setState({ loading: false });
      alert(errorMessage);
    });
  }

}

// There seems to be a bug with deleting an event after just deleting another.
// It looks like if you hit the delete button before it loads properly it'll throw errors.
// Disable the delete button until it's ready to be activated.

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

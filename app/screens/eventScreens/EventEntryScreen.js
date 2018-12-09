import React from 'react';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import FormGroup from '../../components/forms/FormGroup';
import LoadingOverlay from '../../components/loadingOverlay';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import ClientList from '../../models/ClientList';
import Event from '../../models/Event';

let _this = null;

export default class EventEntryScreen extends React.Component {
  static navigationOptions = {
    // title: 'Update Event',
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

    // This will round the current date to the nearest 5 minutes.
    var coeff = 1000 * 60 * 5;
    var current_date = new Date();
    var rounded_date = new Date(Math.round(current_date.getTime() / coeff) * coeff);

    this.state = {
      event: [],
      loading: false,
      event_id: null,
      event_datetime: rounded_date.toISOString().slice(0, 19).replace('T', ' ').toString(),
      pid: null,
      location: null,
      notes: null
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
      var clients = foundClients.active;
      var options = [];

      clients.map((cli, i) => {
        options.push({ label: cli.fname + " " + cli.lname, value: cli.pid });
      });

      this.setState({ clientOptions: options, });

      if (event == 'NONE') {
        this.setState({ pid: options[0].value });
      }
    });
    this.event = new Event();
  }


  render() {
    return (
      <DismissKeyboard>
        <ScrollContainer>
          <FormGroup
            onChangeText={(pid) => this.setState({ pid })}
            value={this.state.pid}
            placeholder={"Client"}
            type={"picker"}
            options={this.state.clientOptions}
            disabled={((this.state.event_id) ? true : false)}
          />

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

          {this.state.event_id &&
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>

              <TouchableOpacity onPress={() => {
                Alert.alert(
                  'Delete Event?',
                  'Are you sure you want to delete this event? This action cannot be undone.',
                  [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                      text: 'OK', onPress: () => {
                        this.setState({ loading: true });
                        this.event.deleteEvent(this.state.event_id).then(() => {
                          this.props.navigation.state.params.onNavigateBack();
                          this.props.navigation.goBack();
                          this.setState({ loading: false });
                        });
                      }
                    },
                  ],
                  { cancelable: false }
                )


              }} >
                <Text style={{ color: Colors.red, textAlign: 'center', fontSize: 20 }}>Delete Event</Text>
              </TouchableOpacity>

            </View>
          }
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

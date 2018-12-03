import React from 'react';
import {
  DatePickerIOS,
  AsyncStorage, ScrollView, StyleSheet,
  Text, TextInput, Button, TouchableOpacity,
  View,FormLabel, FormInput, FormValidationMessage,
  Keyboard, TouchableWithoutFeedback, Picker } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import Navigator from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ClientList from '../../models/ClientList';
import Event from '../../models/Event';

export default class EventUpdate extends React.Component {
  static navigationOptions = {
    title: 'Update Event',
    headerTitleStyle:{
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };

  // Start cancelling all subscriptions and asyncs when component unmounts

  constructor(props) {
    super(props);
    this.state = {
      event :[],
      inactiveClients: [],
      activeClients: [],
      chosenDate: new Date(),
      showDatePicker: false,
      chosenClient: null,
      location:"",
      notes:"",
    };

    this.setDate = this.setDate.bind(this);
  }


  async componentDidMount() {
    const { navigation } = this.props;
    this.setState({ event: navigation.getParam('eventPKG', 'NONE') });
    var clientList = new ClientList();
    clientList.getClients().then(foundClients => {
      var clients = foundClients;
      this.setState({ activeClients: clients.active })
      this.setState({ inactiveClients: clients.inactive })
      // console.log(this.state.event.event_datetime);
      var match = this.state.event.event_datetime.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/)
      this.setState({ chosenDate: new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]) })
      this.setState({ event_id: this.state.event.event_id  })
      this.setState({ pid: this.state.event.pid  })
      this.setState({ location: this.state.event.location  })
      this.setState({ notes: this.state.event.notes  })
      this.event = new Event();
    });
  }


  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }


  render() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var showDatePicker = this.state.showDatePicker ?
            <DatePickerIOS
                  minimumDate={new Date()}
                  mode="datetime"
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
            /> : <View />
    return (
      <DismissKeyboard>
        <View style={styles.eventAddContainer}>

          <TouchableOpacity onPress={() => this.setState({showDatePicker: !this.state.showDatePicker,showClientPicker: false})} >
            <Text>Starts:</Text>
            <Text> {(this.state.chosenDate.toLocaleString('en-US',options))} </Text>
          </TouchableOpacity>
          {showDatePicker}

          <TextInput style = {styles.input}
            clearButtonMode = "while-editing"
            textContentType = "location"
            placeholder='Location...'
            value={this.state.event.location}
            onChangeText={(location) => this.setState({ location })}
          />


          <TextInput style={styles.inputNotes}
            placeholder='Notes...'
            clearButtonMode = "while-editing"
            multiline={true}
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.event.notes}/>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 100}}>

            <TouchableOpacity onPress={() => {this._save();}}>
              <Text style={{color:Colors.blue, marginRight: 25}}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                                this.event.deleteEvent(this.state.event.event_id).then(()=>{
                                this.props.navigation.state.params.onNavigateBack();
                                this.props.navigation.goBack();
                                });
                              }} >
              <Text style={{color:Colors.red, marginLeft: 25}}>Delete</Text>
            </TouchableOpacity>

          </View>
        </View>
      </DismissKeyboard>
    );
  }




  _save = async () => {
      this.state.chosenDate.setHours(this.state.chosenDate.getHours()-5);
      var eventSave = new Event();
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      eventSave.pid = this.state.event.pid;
      eventSave.event_id = this.state.event_id;
      eventSave.event_datetime = this.state.chosenDate;
      eventSave.location = this.state.location;
      eventSave.notes = this.state.notes;
      // Keep going here
      // console.log("Testing something...");
      // console.log(event);
      eventSave.save().then(() =>{

          this.props.navigation.state.params.onNavigateBack();
          this.props.navigation.goBack();
          // this.setState({ loading: false });
      }).catch((errorMessage) => {
          alert(errorMessage);
          // this.setState({ loading: false });
      });
      //}
  }

}
const styles = StyleSheet.create({
  eventAddContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.white
  },
  input: {
     margin: 2,
     paddingTop:0,
     height: 40,
     borderColor: Colors.blue,
     borderWidth: 0.6,
     backgroundColor: Colors.white,
  },
  inputNotes: {
     margin: 2,
     paddingTop:0,
     height: 70,
     borderColor: Colors.blue,
     borderWidth: 0.6,
     backgroundColor: Colors.white,
  },
});

// There seems to be a bug with deleting an event after just deleting another.
// It looks like if you hit the delete button before it loads properly it'll throw errors.
// Disable the delete button until it's ready to be activated.

const DismissKeyboard = ({ children }) => (
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
{children}
</TouchableWithoutFeedback>
);

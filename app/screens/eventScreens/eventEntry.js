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

  constructor(props) {
    super(props);
    this.state = {
      inactiveClients: [],
      activeClients: [],
      chosenDate: new Date(),
      showDatePicker: false,
      showClientPicker: false,
      chosenClient: null,
      fname:"Choose A",
      lname:"Client",
    };

    this.setDate = this.setDate.bind(this);
  }


  async componentDidMount() {
    var clientList = new ClientList();
    clientList.getClients().then(foundClients => {
      var clients = foundClients;
      this.setState({ activeClients: clients.active })
      this.setState({ inactiveClients: clients.inactive })
    });
  }
  getName(){

  }
  setDate(newDate) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    this.setState({chosenDate: newDate})
    console.log(this.state.chosenDate.toLocaleString('en-US',options));
  }



  // mAKE SURE YOU PASS THE CLIENT PID SO YOU CAN ADD VIA THE API
  render() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var showClientPicker = this.state.showClientPicker ?

        <Picker
          selectedValue={this.state.chosenClient}

          onValueChange={(itemValue, itemIndex) => {
            this.setState({ chosenClient: itemValue },  () =>{for (var i = 0; i < this.state.activeClients.length; i++) {
              if (this.state.activeClients[i].pid == this.state.chosenClient){
                this.setState({fname:this.state.activeClients[i].fname});
                this.setState({lname:this.state.activeClients[i].lname});
              }
            }} );

          }}>
          {this.state.activeClients.map((connection, i) => {
            return (
              <Picker.Item key={i}
              label={connection.fname+ " " + connection.lname} value={connection.pid}
              />
            );
          })}
        </Picker> : <View />
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


          <TouchableOpacity onPress={() => this.setState({showClientPicker: !this.state.showClientPicker,showDatePicker: false})} >
            <Text>Client: </Text>
            <Text> {(this.state.fname + " " + this.state.lname)} </Text>
          </TouchableOpacity>
          {showClientPicker}

          <TouchableOpacity onPress={() => this.setState({showDatePicker: !this.state.showDatePicker,showClientPicker: false})} >
            <Text>Starts:</Text>
            <Text> {(this.state.chosenDate.toLocaleString('en-US',options))} </Text>
          </TouchableOpacity>
          {showDatePicker}

          <TextInput style = {styles.input}
            clearButtonMode = "while-editing"
            textContentType = "location"
            placeholder='Location...'
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
           />

          <TextInput style={styles.inputNotes}
            placeholder='Notes...'
            clearButtonMode = "while-editing"
            multiline={true}
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.notes}
           />

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 100}}>
            <TouchableOpacity onPress={() => {this._save();}}>
              <Text style={{color:Colors.blue, marginRight: 25}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(this.state)}>
              <Text style={{color:Colors.red, marginLeft: 25}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    );
  }

  _save = async () => {

      if (this.state.chosenClient == null || this.state.chosenDate == null) {
          alert("A client and date is required");
          return;
      }
      // if (this.state.pid == null) {
      // this.setState({ loading: true });
      this.state.chosenDate.setHours(this.state.chosenDate.getHours()-5);
      var event = new Event();
      event.event_id = this.state.event_id;
      event.pid = this.state.chosenClient;
      event.event_datetime = this.state.chosenDate;
      event.location = this.state.location;
      event.notes = this.state.notes;
      // Keep going here
      // console.log("Testing something...");
      // console.log(event);
      event.save().then(() =>{

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



const DismissKeyboard = ({ children }) => (
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
{children}
</TouchableWithoutFeedback>
);

// {this.state.showDatePicker &&
//     <DatePickerIOS
//         style={{ height: 150 }}
//           minimumDate={new Date()}
//           mode="datetime"
//           date={this.state.chosenDate}
//           onDateChange={this.setDate}
//     /> }

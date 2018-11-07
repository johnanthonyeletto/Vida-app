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

  setDate(newDate) {
    this.setState({chosenDate: newDate})
    console.log(this.state.chosenDate);
  }

  // mAKE SURE YOU PASS THE CLIENT PID SO YOU CAN ADD VIA THE API
  render() {
        var showClientPicker = this.state.showClientPicker ?

        <Picker
          selectedValue={this.state.chosenClient}

          onValueChange={(itemValue, itemIndex) => this.setState({chosenClient: itemValue})}>
          {this.state.activeClients.map((connection, i) => {
            return (
              <Picker.Item key={i}
              label={connection.fname} value={connection.fname}
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
          // Need to deal with the datePicker not pushing everything down far enough
          // Also need to represent the time instead of just the date


          <TouchableOpacity onPress={() => this.setState({showClientPicker: !this.state.showClientPicker,showDatePicker: false})} >
            <Text>Client: </Text>
            <Text> {(this.state.chosenClient)} </Text>
          </TouchableOpacity>
          {showClientPicker}

          <TouchableOpacity onPress={() => this.setState({showDatePicker: !this.state.showDatePicker,showClientPicker: false})} >
            <Text>Starts:</Text>
            <Text> {(this.state.chosenDate.toLocaleDateString())} </Text>
          </TouchableOpacity>
          {showDatePicker}

          <TextInput style = {styles.input}
            clearButtonMode = "while-editing"
            textContentType = "location"
            placeholder='Location...' />

          <TextInput style={styles.inputNotes}
            placeholder='Notes...'
            clearButtonMode = "while-editing"
            multiline={true} />

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 100}}>
            <TouchableOpacity>
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

  import React, { Component } from 'react';
  import {
    TouchableOpacity, KeyboardAvoidingView, ActionSheetIOS, Image,
    AsyncStorage, ScrollView, StyleSheet,
    Text, TextInput, Button,
    View,FormLabel, FormInput, FormValidationMessage,
    Keyboard, TouchableWithoutFeedback, Picker } from 'react-native';
  import ScrollContainer from '../../components/ScrollContainer';
  import Colors from '../../constants/Colors';
  import { ImagePicker } from 'expo';
  import Client from '../../models/Client';
  import Environment from '../../constants/Environment';
  import FormGroup from '../../components/forms/FormGroup';
  import LoadingOverlay from '../../components/loadingOverlay';
  import Navigator from 'react-navigation';
  import { Ionicons } from '@expo/vector-icons';
  import GraphList from '../../models/GraphList';
  import Relationship from '../../models/Relationship';

  let _this = null;

  export default class AddRelationshipScreen extends Component {
      static navigationOptions = ({ navigation }) => ({
          gesturesEnabled: false,
          title: null,
          headerLeft: (
              <TouchableOpacity onPress={() => {
                  navigation.goBack(null);
              }} style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 20, color: Colors.blue }}>Cancel</Text>
              </TouchableOpacity>
          ),
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
      relationship: [],
      client_id: null,
      pid1: null,
      fname: null,
      lname: null,
      relationshiptoclient: null,
    };
  }


  async componentDidMount() {
    _this = this;

    var { navigation } = this.props;
    //if statement make sure theres a pid
    var pid = navigation.getParam('pid', 'NONE');

    var relationshipList = new GraphList();

      // relationshipList.getRelationships(pid).then(foundRelation => {
      // var relative = foundRelation;
      var client = new Client();
      client.getClient(pid).then(foundClient => {
      var relative = foundClient.relationships
      var options = [];

      relative.map((cli, i) => {
        options.push({ label: cli.fname + " " + cli.lname, value: cli.pid });
      });

      this.setState({ clientOptions: options, pid: options[0].value,  clientpid: pid });
    });
      this.relationship = new Relationship();
  }

    render() {
     return (
       <DismissKeyboard>
         <ScrollContainer>
           <FormGroup
            onChangeText={(pid1) => this.setState({ pid1 })}
            value={this.state.pid1}
            placeholder={"Related To"}
            type={"picker"}
            options={this.state.clientOptions}
            // disabled={((this.state.event_id) ? true : false)}
           />

           <FormGroup
               onChangeText={(fname) => this.setState({ fname })}
               value={this.state.fname}
               placeholder={"First Name"}
               keyboardType={"default"}
               autoCapitalize={"words"}
               autoCorrect={true}
               textContentType={"givenName"}
               maxLength={100}
           />

           <FormGroup
               onChangeText={(lname) => this.setState({ lname })}
               value={this.state.lname}
               placeholder={"Last Name"}
               keyboardType={"default"}
               autoCapitalize={"words"}
               autoCorrect={true}
               textContentType={"familyName"}
               maxLength={100}
           />

           <FormGroup
               onChangeText={(relationshiptoclient) => this.setState({ relationshiptoclient })}
               value={this.state.relationshiptoclient}
               placeholder={"Relationship to Client"}
               keyboardType={"default"}
               autoCapitalize={"words"}
               autoCorrect={true}
               maxLength={100}
           />

           {this.state.loading &&
             <LoadingOverlay />
           }
         </ScrollContainer>
       </DismissKeyboard>
     );
   }




   _save = async () => {

       // if (this.state.fname == null || this.state.lname == null) {
       //     alert("First name and last name are both required.");
       //     return;
       // }
       // if (this.state.pid == null) {
       this.setState({ loading: true });
       var relationship = new Relationship();
       relationship.client_id = this.state.clientpid;
       relationship.pid1 = this.state.pid1;
       relationship.relationshiptoclient = this.state.relationshiptoclient;
       relationship.fname = this.state.fname;
       relationship.lname = this.state.lname;


       relationship.save().then(() => {
             this.props.navigation.navigate('ClientProfile', { 'pid': this.state.clientpid });
             this.setState({ loading: false });
         }).catch((errorMessage) => {
             alert(errorMessage);
             this.setState({ loading: false });
         });
         //}
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

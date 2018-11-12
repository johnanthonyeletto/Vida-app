import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import ScrollContainer from '../../components/ScrollContainer';
import FormGroup from '../../components/forms/FormGroup';

export default class EditAccountScreen extends Component {
  static navigationOptions = {
    title: 'Edit Account',
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity onPress={() => {
        _this._save();
      }} style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 20, color: Colors.white }}>Save</Text>
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollContainer>
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
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          placeholder={"Email Address"}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          autoCorrect={false}
          textContentType={"emailAddress"}
          maxLength={100}
        />


        <FormGroup
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          placeholder={"Password"}
          keyboardType={"default"}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={100}
        />

        <FormGroup
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          value={this.state.password}
          placeholder={"Confirm Password"}
          keyboardType={"default"}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={100}
        />
      </ScrollContainer>
    );
  }
}

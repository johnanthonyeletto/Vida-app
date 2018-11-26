import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import ScrollContainer from '../../components/ScrollContainer';
import FormGroup from '../../components/forms/FormGroup';
import User from '../../models/User';
import LoadingOverlay from '../../components/loadingOverlay';

let _this = null;

export default class EditAccountScreen extends Component {
  static navigationOptions = {
    title: 'Edit Account',
    headerRight: (
      <TouchableOpacity onPress={() => {
        _this._save();
      }} style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 20, color: Colors.blue }}>Save</Text>
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    _this = this;
    var user = new User();

    user.getCurrentUser().then(res => {
      this.setState(res);
    }).catch(error => {
      alert("An Error Has occured");
    });
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
          onChangeText={(currentPassword) => this.setState({ currentPassword })}
          value={this.state.currentPassword}
          placeholder={"Current Password"}
          keyboardType={"default"}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={100}
        />

        <FormGroup
          onChangeText={(newPassword) => this.setState({ newPassword })}
          value={this.state.newPassword}
          placeholder={"New Password"}
          keyboardType={"default"}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={100}
        />

        <FormGroup
          onChangeText={(confirmNewPassword) => this.setState({ confirmNewPassword })}
          value={this.state.confirmNewPassword}
          placeholder={"Confirm New Password"}
          keyboardType={"default"}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={100}
        />
        {this.state.loading &&
          <LoadingOverlay />
        }
      </ScrollContainer>
    );
  }

  _save() {

    if (this.state.fname == null || this.state.lname == null) {
      alert("First name and last name are both required.");
      return;
    }

    if(this.state.newPassword != this.state.confirmNewPassword){
      alert("Passwords do not match.");
      return;
    }

    _this.setState({ loading: true });

    var user = new User();
    user.fname = _this.state.fname;
    user.lname = _this.state.lname;
    user.email = _this.state.email;
    user.currentPassword = _this.state.currentPassword;
    user.newPassword = _this.state.newPassword;
    user.confirmNewPassword = _this.state.confirmNewPassword;

    user.save().then(res => {
      _this.setState({ loading: false });
      _this.props.navigation.navigate("Settings");
    }).catch(error => {
      _this.setState({ loading: false });
      alert(error);
    });
  }
}

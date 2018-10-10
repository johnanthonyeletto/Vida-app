import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Colors from '../constants/Colors';

export default class ClientProfileScreen extends Component {
  static navigationOptions = {
    title: 'Pablo Rivas',
    headerTitleStyle: {
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue
    },
    // headerRight: (
    //   <TouchableOpacity onPress={() => { alert("New Client") }}>
    //     <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
    //   </TouchableOpacity>
    // ),
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollContainer>
        <Text> Client Profile </Text>
      </ScrollContainer>
    );
  }
}

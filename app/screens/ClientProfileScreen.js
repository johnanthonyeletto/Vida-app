import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Client from '../models/Client';
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
    var client = new Client();
  }

  render() {
    return (
      <ScrollContainer>
        <View>
          <Image
            style={{ width: 65, height: 65, borderRadius: 32.5 }}
            source={{
              uri: this.client.avatarURL
            }}
            resizeMode={'contain'}
          />
        </View>
        <Text> Client Profile </Text>
      </ScrollContainer>
    );
  }
}

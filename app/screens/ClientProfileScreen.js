import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Client from '../models/Client';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export default class ClientProfileScreen extends Component {
  static navigationOptions = {
    title: 'Pablo Rivas',
    headerTitleStyle: {
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue,
      borderBottomWidth: 0,
    },
    headerRight: (
      <TouchableOpacity onPress={() => { alert("Add something to this client.") }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);
    let client = new Client();
    this.state = {
      client: client
    };

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.clientInfo}>
          <Image
            style={{ width: 175, height: 175, borderRadius: (175 / 2), alignSelf: "center" }}
            source={{
              uri: this.state.client.avatarURL
            }}
            resizeMode={'contain'}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.circleContactButton}>
              <Ionicons name="ios-call" size={32} color={Colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleContactButton}>
              <Ionicons name="ios-chatbubbles" size={32} color={Colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleContactButton}>
              <Ionicons name="ios-mail" size={32} color={Colors.blue} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.clientDetails}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientGraph') }} style={styles.circleRelationshipButton}>
            <Ionicons name="ios-git-merge" size={32} color={Colors.white} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue
  },
  clientInfo: {
    alignItems: "center",
    backgroundColor: Colors.blue,
    padding: 25
  },
  clientName: {
    fontSize: 25,
  },
  clientDetails: {
    backgroundColor: Colors.white,
    minHeight: "100%",
    padding: 10,
  },
  circleContactButton: {
    //flex: 1,
    width: 60,
    height: 60,
    borderRadius: (60 / 2),
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10
  },
  circleRelationshipButton: {
    width: 75,
    height: 75,
    borderRadius: (75 / 2),
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10
  }
});

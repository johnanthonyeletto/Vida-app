import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActionSheetIOS } from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Client from '../models/Client';
import Colors from '../constants/Colors';
import ListSeparator from '../components/ListSeparator';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/events/EventCard';


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
      <TouchableOpacity onPress={() => { new ClientProfileScreen()._showMoreOptions() }}>
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

          {/* BEGIN NEXT EVENT SECTION */}
          <View>
            <ListSeparator>
              <Text>Next Meeting</Text>
            </ListSeparator>
            <EventCard title={"Meeting With Pablo"} location={"On The Phone"} />
          </View>
          {/* END NEXT EVENT SECTION */}


          {/* BEGIN RELATIONSHIPS SECTION */}
          <View>
            <ListSeparator>
              <Text>Relationships</Text>
            </ListSeparator>
            <ScrollView
              style={{ flexDirection: "row" }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientGraph') }} style={styles.circleRelationshipButton}>
                <Ionicons name="ios-git-merge" size={32} color={Colors.white} />
              </TouchableOpacity>
              {this.state.client.getConnections().map((connection, i) => {
                return (
                  <TouchableOpacity key={i}>
                    <Image
                      style={styles.circleRelationshipButton}
                      source={{
                        uri: connection.avatarURL
                      }}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {/* END RELATIONSHIPS SECTION */}
        </View>

      </ScrollView >
    );
  }

  _showMoreOptions() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Add Meeting', 'Add Note', 'Add Relationship'],
      cancelButtonIndex: 0,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 2:
            Linking.openURL('tel:5164689725');
            break;
          case 3:
            Linking.openURL('sms:5164689725');
            break;
          case 4:
            Linking.openURL('mailto:johnanthony.eletto@gmail.com');
            break;
        }
      });
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

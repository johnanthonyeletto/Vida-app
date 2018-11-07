import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import Client from '../models/Client';
import Colors from '../constants/Colors';
import ListSeparator from '../components/ListSeparator';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/events/EventCard';
import Environment from '../constants/Environment';


export default class ClientProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: 'Pablo Rivas',
    headerTitleStyle: {
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue,
      borderBottomWidth: 0,
    },
    headerRight: (
      <TouchableOpacity onPress={() => { new ClientProfileScreen()._showMoreOptions(navigation) }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      client: [],
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
    const pid = navigation.getParam('pid', 'NONE');

    var client = new Client();
    client.getClient(pid).then(foundClient => {
      this.setState({ client: foundClient, nextMeeting: foundClient.next_meeting[0], relationships: foundClient.relationships });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.clientInfo}>
          <Image
            style={{ width: 175, height: 175, borderRadius: (175 / 2), alignSelf: "center" }}
            source={{
              uri: Environment.API_HOST + this.props.client.image_path
            }}
            resizeMode={'contain'}
          />
          <Text style={{ color: Colors.white, fontSize: 25, marginTop: 10 }}>{this.state.client.fname} {this.state.client.lname}</Text>
          <View style={{ flexDirection: "row" }}>
            {this.state.client.cell_phone &&
              <TouchableOpacity style={styles.circleContactButton} onPress={() => { this._openLink("tel:" + this.state.client.cell_phone) }}>
                <Ionicons name="ios-call" size={32} color={Colors.blue} />
              </TouchableOpacity>
            }

            {this.state.client.cell_phone &&
              <TouchableOpacity style={styles.circleContactButton} onPress={() => { this._openLink("sms:" + this.state.client.cell_phone) }}>
                <Ionicons name="ios-chatbubbles" size={32} color={Colors.blue} />
              </TouchableOpacity>
            }

            {this.state.client.email &&
              <TouchableOpacity style={styles.circleContactButton} onPress={() => { this._openLink("mailto:" + this.state.client.email) }}>
                <Ionicons name="ios-mail" size={32} color={Colors.blue} />
              </TouchableOpacity>
            }
          </View>
        </View>

        <View style={styles.clientDetails}>

          {/* BEGIN NEXT EVENT SECTION */}


          <View>
            <ListSeparator>
              <Text>Next Meeting</Text>
            </ListSeparator>
            {this.state.nextMeeting &&
              <EventCard meeting={this.state.nextMeeting} />
            }

            {
              !this.state.nextMeeting &&
              <Text>You have no upcoming meetings with {this.state.client.fname} {this.state.client.lname}.</Text>
            }
          </View>


          {/* END NEXT EVENT SECTION */}

          {/* BEGIN RELATIONSHIPS SECTION */}
          <View>
            <ListSeparator>
              <Text>Relationships</Text>
            </ListSeparator>
            {this.state.relationships &&
              <ScrollView
                style={{ flexDirection: "row" }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientGraph') }} style={styles.circleRelationshipButton}>
                    <Ionicons name="ios-git-merge" size={32} color={Colors.white} />
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'center' }}>Graph</Text>
                </View>
                {this.state.relationships.map((connection, i) => {
                  return (
                    <TouchableOpacity key={i} style={{ alignItems: 'center' }}>
                      <Image
                        style={styles.circleRelationshipButton}
                        source={{
                          uri: Environment.API_HOST + connection.image_path
                        }}
                        resizeMode={'contain'}
                      />
                      <Text>{connection.fname} {connection.lname.substr(0, 1)}.</Text>
                      <Text style={{ fontStyle: 'italic', fontSize: 10, }}>{connection.pivot.relationshiptoclient}</Text>


                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            }

            {!this.state.relationships &&
              <Text>{this.state.client.fname} {this.state.client.lname} doesn't have any relationships yet.</Text>
            }
          </View>
          {/* END RELATIONSHIPS SECTION */}
        </View>

      </ScrollView >
    );
  }

  _showMoreOptions(navigation) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Add Meeting', 'Add Relationship', 'Quick Start Meeting'],
      cancelButtonIndex: 0,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 2:
            Linking.openURL('tel:5164689725');
            break;
          case 3:
            navigation.navigate('Notes');
            break;
        }
      });
  }

  _openLink(url) {
    Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue
  },
  clientInfo: {
    alignItems: "center",
    backgroundColor: Colors.blue,
    paddingBottom: 25
  },
  clientName: {
    fontSize: 25,
  },
  clientDetails: {
    backgroundColor: Colors.white,
    minHeight: "100%",
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  circleContactButton: {
    //flex: 1,
    width: 60,
    height: 60,
    borderRadius: (60 / 2),
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10,
    //opacity: 0.50
  },
  circleRelationshipButton: {
    width: 75,
    height: 75,
    borderRadius: (75 / 2),
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10,
    alignContent: 'center'
  }
});

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActionSheetIOS, Linking, RefreshControl, SafeAreaView } from 'react-native';
import Client from '../../models/Client';
import Colors from '../../constants/Colors';
import ListSeparator from '../../components/ListSeparator';
import { Ionicons } from '@expo/vector-icons';
import EventItem from '../../components/EventItem';
import Environment from '../../constants/Environment';
import LoadingOverlay from '../../components/loadingOverlay';
import NoteListItem from '../../components/NoteListItem';

let _this = null;

export default class ClientProfileScreen extends Component {



  static navigationOptions = ({ navigation }) => ({
    title: (navigation.getParam('coach_name') != null) ? navigation.getParam('coach_name').toString() + "'s Client" : null,
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
        <Ionicons name="ios-more" size={32} style={{ marginRight: 15 }} color={Colors.white} />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      client: [],
      refreshing: false,
      loading: true,
    };

  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async componentDidMount() {

    _this = this;

    const { navigation } = this.props;
    const pid = navigation.getParam('pid', 'NONE');

    var client = new Client();
    client.getClient(pid).then(foundClient => {
      this.setState({ loading: false, client: foundClient, nextMeeting: foundClient.next_meeting[0], relationships: foundClient.relationships, notes: foundClient.notes });
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>

        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={Colors.white}
            />}
        >

          <View style={styles.clientInfo}>
            <Image
              style={{ width: 125, height: 125, borderRadius: (125 / 2), alignSelf: "center" }}
              source={{
                uri: Environment.API_HOST + this.state.client.image_path
              }}
            />
            <Text style={{ color: Colors.white, fontSize: 20, marginTop: 10 }}>{this.state.client.fname} {this.state.client.lname}</Text>
            <Text style={{ color: Colors.white, fontSize: 15, fontStyle: 'italic' }}>{this.state.client.occupation}</Text>
            <View style={{ flexDirection: "row" }}>

              {(this.state.client.cell_phone || this.state.client.home_phone) &&
                <TouchableOpacity style={styles.circleContactButton} onPress={() => { this._showCallOptions() }}>
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
                <EventItem sEvent={this.state.nextMeeting} />
              }

              {
                !this.state.nextMeeting &&
                <Text style={{ color: Colors.grey, padding: 5 }}>You have no upcoming meetings with {this.state.client.fname} {this.state.client.lname}.</Text>
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
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientGraph', { 'pid': _this.state.client.pid }) }} style={styles.circleRelationshipButton}>
                      <Ionicons name="ios-git-merge" size={32} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center' }}>Graph</Text>
                  </View>
                  {this.state.relationships.map((connection, i) => {
                    return (
                      <TouchableOpacity key={i} style={{ alignItems: 'center' }} >
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
                <Text style={{ color: Colors.grey, padding: 5 }}>{this.state.client.fname} {this.state.client.lname} doesn't have any relationships yet.</Text>
              }
            </View>
            {/* END RELATIONSHIPS SECTION */}

            {/* BEGIN ADDRESS SECTION */}
            <View>
              <ListSeparator>
                <Text>Contact Info</Text>
              </ListSeparator>

              {!(this.state.client.cell_phone || this.state.client.home_phone || this.state.client.email || this.state.client.address || this.state.client.address2 || this.state.client.city || this.state.client.state_province || this.state.client.postal_code) &&
                <Text style={{ color: Colors.grey, padding: 5 }}>{this.state.client.fname} {this.state.client.lname} doesn't have any contact info.</Text>
              }

              {this.state.client.cell_phone &&
                <View style={styles.contactInfoRow}>
                  <View style={styles.contactInfoLeft}>
                    <Text style={styles.contactInfoLabel}>Cell Phone:</Text>
                  </View>
                  <View style={styles.contactInfoRight}>
                    <Text style={styles.contactInfoText}>
                      {this.state.client.cell_phone}
                    </Text>
                  </View>
                </View>
              }


              {this.state.client.home_phone &&
                <View style={styles.contactInfoRow}>
                  <View style={styles.contactInfoLeft}>
                    <Text style={styles.contactInfoLabel}>Home Phone:</Text>
                  </View>
                  <View style={styles.contactInfoRight}>
                    <Text style={styles.contactInfoText}>
                      {this.state.client.home_phone}
                    </Text>
                  </View>
                </View>
              }

              {this.state.client.email &&
                <View style={styles.contactInfoRow}>
                  <View style={styles.contactInfoLeft}>
                    <Text style={styles.contactInfoLabel}>Email Address:</Text>
                  </View>
                  <View style={styles.contactInfoRight}>
                    <Text style={styles.contactInfoText}>
                      {this.state.client.email}
                    </Text>
                  </View>
                </View>
              }

              {(this.state.client.address || this.state.client.address2 || this.state.client.city || this.state.client.state_province || this.state.client.postal_code) &&
                <View style={styles.contactInfoRow}>
                  <View style={styles.contactInfoLeft}>
                    <Text style={styles.contactInfoLabel}>Address:</Text>
                  </View>
                  <View style={styles.contactInfoRight}>
                    <Text style={styles.contactInfoText}>
                      {this.state.client.address}
                      {(this.state.client.address2) ? "\n" + this.state.client.address2 : ""}
                      {
                        "\n" + this.state.client.city +
                        ((this.state.client.state_province) ? ", " + this.state.client.state_province : "") +
                        ((this.state.client.postal_code) ? ", " + this.state.client.postal_code : "")
                      }
                    </Text>
                  </View>
                </View>
              }
            </View>
            {/* END ADDRESS SECTION */}


            {/* BEGIN NOTES SECTION */}
            <View>
              <ListSeparator>
                <Text>Notes</Text>
              </ListSeparator>

              {(!this.state.notes || this.state.notes.length <= 0) &&
                <Text style={{ color: Colors.grey, padding: 5 }}>{this.state.client.fname} {this.state.client.lname} doesn't have any notes yet.</Text>
              }

              {(this.state.notes && this.state.notes.length > 0) &&
                <View>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('NoteEntry', { 'pid': this.state.client.pid, 'note': this.state.notes[0] }) }}>
                    <NoteListItem note={this.state.notes[0]} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('AllNotes', { 'notes': this.state.notes, 'pid': this.state.client.pid }) }}>
                    <Text style={{ fontSize: 17, color: Colors.blue, textAlign: 'right', padding: 5, marginVertical: 5 }}>See All Notes</Text>
                  </TouchableOpacity>
                </View>
              }

            </View>
            {/* END NOTES SECTION */}
          </View>
          {
            this.state.loading &&
            <LoadingOverlay />
          }
        </ScrollView>
      </SafeAreaView >
    );
  }

  _showCallOptions() {
    if (this.state.client.cell_phone && !this.state.client.home_phone) {
      // Just cell phone is set
      Linking.openURL("tel:" + this.state.client.cell_phone);
      return;
    } else if (!this.state.client.cell_phone && this.state.client.home_phone) {
      // Just home phone is set
      Linking.openURL("tel:" + this.state.client.home_phone);
      return;
    }

    // Both are set, so we give the user the option...
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Cell Phone - ' + this.state.client.cell_phone, 'Home Phone - ' + this.state.client.home_phone],
      cancelButtonIndex: 0,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            Linking.openURL("tel:" + this.state.client.cell_phone);
            break;
          case 2:
            Linking.openURL("tel:" + this.state.client.home_phone);
            break;
        }
      }
    )
  }

  _showMoreOptions(navigation) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Add Meeting', 'Add Relationship', 'Add A Note', 'Edit Client', (_this.state.client.isActive) ? 'Mark Client Inactive' : 'Mark Client Active'],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 5,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 2:
            navigation.navigate('AddRelationship', { 'pid': _this.state.client.pid });
            break;
          case 3:
            navigation.navigate('NoteEntry', { 'pid': _this.state.client.pid });
            break;
          case 4:
            navigation.navigate('AddClient', { 'pid': _this.state.client.pid, });
            break;
          case 5:
            _this._markInactive().then(res => {
              navigation.navigate("Home");
            });
            break;
        }
      });
  }

  async _markInactive() {
    var client = new Client();
    client.pid = _this.state.client.pid;
    client.markInactive().then(res => {
      return res;
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
    paddingBottom: 25,
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
    width: 50,
    height: 50,
    borderRadius: (50 / 2),
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10,
    //opacity: 0.50
  },
  circleRelationshipButton: {
    width: 60,
    height: 60,
    borderRadius: (60 / 2),
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10,
    alignContent: 'center'
  },
  contactInfoRow: {
    flexDirection: 'row',
    flex: 1,
  },
  contactInfoLeft: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  contactInfoRight: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  contactInfoLabel: {
    fontSize: 15,
    padding: 5,
    fontWeight: '600',
  },
  contactInfoText: {
    padding: 5,
    fontSize: 15,
  }
});

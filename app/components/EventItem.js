import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Client from '../models/Client.js';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clientName: " "
        };
    }
      // Look at addClientScreen to see conditional loading of a client.
      // async componentDidMount() {
      //   var client = new Client();
      //   client.getClient(this.props.sEvent.pid).then(foundClient => {
      //     this.setState({ clientName: foundClient.fname + " "+foundClient.lname });
      //   });
      // }
    render() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return (
            <View>
            <View style={styles.item}>
                <View>
                  <Text style={styles.eventName}>Meeting</Text>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={styles.eventDate}>{this.props.sEvent.event_datetime}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Client:</Text><Text style={styles.eventDetails}> {/*{this.state.clientName}*/}{this.props.sEvent.pid}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Location:</Text><Text style={styles.eventDetails}>  {this.props.sEvent.location}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Notes:</Text><Text style={styles.eventDetails}>  {this.props.sEvent.notes}</Text>
                    </View>
                  </View>
                </View>
            </View>
            <View style={styles.separator}/>
            </View>
        );
    }
}
// there might not be a title to events anymore, so replace with "Meeting with {pid}"
// replace date with evdatetime
// replace client with pid until you use the getClient API
// replace location with eventlocation
// replace note with notes
const styles = new StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 40,
        paddingRight: 10,
        backgroundColor: Colors.lightBlue,
    },
    eventName: {
        fontSize: 19,
    },
    eventDate: {
      paddingBottom: 5

    },
    eventDetails: {
        fontWeight: '100',
    },
    separator: {
        backgroundColor: Colors.white,
        height:15
    },
});

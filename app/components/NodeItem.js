import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Client from '../models/Client.js';


export default class NodeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clientName: " "
        };
    }

      // async componentDidMount() {
      //   var client = new Client();
      //   client.getClient(this.props.sEvent.pid).then(foundClient => {
      //     this.setState({ clientName: foundClient.fname + " "+foundClient.lname });
      //   });
      // }
    render() {
        return (
            <View>
            <View style={styles.item}>
                <View>
                  <Text style={styles.eventName}>Relationship</Text>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={styles.eventDate}>{this.props.sNode.client_id}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Relationship:</Text><Text style={styles.eventDetails}> {/*{this.state.clientName}*/}{this.props.sNode.relationshiptoclient}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Rirstname:</Text><Text style={styles.eventDetails}>  {this.props.sNode.fname}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Lastname:</Text><Text style={styles.eventDetails}>  {this.props.sNode.lname}</Text>
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

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
            <View style={styles.item}>
                <View>
                  <Text style={styles.eventName}>{this.props.sEvent.title} </Text>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={styles.eventDate}>{this.props.sEvent.date}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Client:</Text><Text style={styles.eventDetails}> {this.props.sEvent.client}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Location:</Text><Text style={styles.eventDetails}>  {this.props.sEvent.location}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Notes:</Text><Text style={styles.eventDetails}>  {this.props.sEvent.note}</Text>
                    </View>
                  </View>
                </View>
            </View>
            <View style={styles.separator}/>
            </View>
        );
    }
}

const styles = new StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1.5,
        borderTopColor: Colors.blue,
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

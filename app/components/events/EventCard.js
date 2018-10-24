import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.card}>
                <View style={styles.left}>
                    <Text style={styles.month}>Feb</Text>
                    <Text style={styles.day}>15</Text>
                    <Text style={styles.time}>2:00 PM</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.eventTitle}>{this.props.title}</Text>
                    <Text style={styles.eventLocation}>{this.props.location}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = new StyleSheet.create({
    card: {
        borderColor: Colors.lightGrey,
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 75
    },
    left: {
        flexDirection: 'column',
        backgroundColor: Colors.lightBlue,
        width: 75,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    month: {
        fontSize: 15,
    },
    day: {
        fontSize: 20,
        fontWeight: "bold"
    },
    time: {

    },
    right: {
        flexDirection: 'column',
        padding: 10,
    },
    eventTitle: {
        fontSize: 20,
        //fontWeight: "bold"
    },
    eventLocation: {

    }
});

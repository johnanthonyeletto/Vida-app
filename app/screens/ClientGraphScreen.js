import React, { Component } from 'react';
import { View, Text, WebView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const GraphHTML = require('../assets/html/vida_graph.html');

export default class ClientGraphScreen extends Component {
    static navigationOptions = {
        //title: 'Pablo Rivas',
        // headerTitleStyle: {
        //     color: Colors.white
        // },
        headerTintColor: Colors.blue,
        headerStyle: {
            //backgroundColor: Colors.blue,
            borderBottomWidth: 0,
        },
        headerBackTitle: 'Back',
        headerRight: (
            <TouchableOpacity onPress={() => { alert("Add something to this client.") }}>
                <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
            </TouchableOpacity>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <WebView
                originWhitelist={['*']}
                source={GraphHTML}
            />
        );
    }
}

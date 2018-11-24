import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const win = Dimensions.get('window');


export default class OfflineNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: Colors.red,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.75,
    },
    offlineText: {
        color: Colors.white,
        marginTop: 30,
        padding: 15,
    }
});

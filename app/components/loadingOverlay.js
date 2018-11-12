import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, } from 'react-native';
import Colors from '../constants/Colors';

const win = Dimensions.get('window');


export default class LoadingOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color={Colors.blue} style={styles.indicator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: (win.height - 150),
    },
    indicator: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 5,
        padding: 15

    }
});


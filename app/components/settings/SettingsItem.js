import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
                <View style={styles.left}>
                    <Text style={[styles.title, { color: this.props.color }]}>{this.props.title}</Text>
                </View>
                <View style={styles.right}>
                    <Ionicons name="ios-arrow-forward" size={20} style={styles.icon} />
                </View>
            </TouchableOpacity >
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        padding: 20,
        flexDirection: 'row',
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 15,
    },
    left: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    right: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    // icon: {
    //     right: 0,
    //     flex: 1,
    // }
});

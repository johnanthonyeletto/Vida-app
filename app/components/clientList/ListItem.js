import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Environment from '../../constants/Environment';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.imageSection}>
                    <Image
                        style={{ width: 65, height: 65, borderRadius: 32.5 }}
                        source={{
                            uri: Environment.API_HOST + this.props.client.image_path
                        }}
                    />
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.name}>{this.props.client.fname} {this.props.client.lname}</Text>
                    <Text style={styles.lastInteraction}>Updated {this._parseTimestamp(this.props.client.updated_at)}</Text>
                </View>
                {/* <View style={styles.more}>
                    <TouchableOpacity onPress={this._showMoreOptions}>
                        <Ionicons name="ios-more" size={32} style={{ alignSelf: 'center', flex: 1 }} />
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }

    _parseTimestamp(timestamp) {
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = timestamp.split(/[- :]/);
        // Apply each element to the Date function
        var updated_at = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        var today = new Date();


        var diff = Math.floor(today.getTime() - updated_at.getTime());
        var day = 1000 * 60 * 60 * 24;
        var hour = 1000 * 60 * 60;
        var minute = 1000 * 60;

        var minutes = Math.floor(diff / minute);
        var hours = Math.floor(diff / hour);
        var days = Math.floor(diff / day);
        var months = Math.floor(days / 31);
        var years = Math.floor(months / 12);

        var result;

        if (minutes <= 1) {
            result = "less than a minute ago";
        } else if (minutes < 60) {
            result = minutes + " minutes ago";
        } else if (hours < 24) {
            result = hours + " hours ago";
        } else if (days < 31) {
            result = days + " days ago";
        } else if (months < 12) {
            result = months + " months ago";
        } else {
            result = years + " years ago";
        }

        return result;
    }

    _showMoreOptions() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Cancel', 'Add Meeting', 'Call Client', 'SMS Client', 'Email Client'],
            cancelButtonIndex: 0,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 2:
                        Linking.openURL('tel:' + this.state.phone);
                        break;
                    case 3:
                        Linking.openURL('sms:' + this.props.client.cell_phone);
                        break;
                    case 4:
                        Linking.openURL('mailto:' + this.props.client.email);
                        break;
                }
            });
    }
}

const styles = new StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGrey,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: Colors.white,
    },
    name: {
        fontSize: 17,
    },
    lastInteraction: {
        fontWeight: '100',
    },
    clientInfo: {
        paddingLeft: 20,
        justifyContent: 'center',
        //alignItems: 'center'
    },
    more: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        paddingTop: 35
    },
    imageSection: {
        paddingLeft: 10
    }
});



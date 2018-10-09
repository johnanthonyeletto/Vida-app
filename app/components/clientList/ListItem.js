import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.item}>
                <View>
                    <Image
                        style={{ width: 65, height: 65, borderRadius: 32.5 }}
                        source={{
                            uri: this.props.client.avatarURL
                        }}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.name}> {this.props.client.name} </Text>
                    <Text style={styles.lastInteraction}>{this.props.client.lastInteraction}</Text>
                </View>
                <View style={styles.more}>
                    <TouchableOpacity onPress={this._showMoreOptions}>
                        <Ionicons name="ios-more" size={32} style={{ alignSelf: 'center', flex: 1 }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _showMoreOptions() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Cancel', 'Call Client', 'SMS Client', 'Email Client'],
            cancelButtonIndex: 0,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 1:
                        Linking.openURL('tel:5164689725');
                        break;
                    case 2:
                        Linking.openURL('sms:5164689725');
                        break;
                        case 3:
                        Linking.openURL('mailto:johnanthony.eletto@gmail.com');
                        break;
                }
            });
    }
}

const styles = new StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
    },
    name: {
        fontSize: 17,
    },
    lastInteraction: {
        fontWeight: '100',
    },
    clientInfo: {
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    more: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        paddingTop: 35
    }
});



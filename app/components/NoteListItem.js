import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Swipeout from 'react-native-swipeout';
import Client from '../models/Client';


let _this = null;


export default class NoteListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {


        return (

            <View style={styles.note}>
                <View style={styles.noteLeft}>
                    {/* Strip out all html tags and remove excess space. */}
                    <Text style={styles.notePreview}>{this.props.note.note.replace(/<(?:.|\n)*?>/gm, ' ').replace(/\s\s+/g, ' ').substr(0, 40).trim()}...</Text>
                    <Text style={styles.noteDate}>{this._parseTimestamp(this.props.note.updated_at)}</Text>
                </View>
                <View style={styles.noteRight}>
                    <Ionicons name="ios-arrow-forward" size={20} style={{ alignSelf: 'center', }} />
                </View>
            </View>
        );
    }


    _parseTimestamp(timestamp) {
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = timestamp.split(/[- :]/);
        // Apply each element to the Date function
        var updated_at = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var result = months[updated_at.getMonth()] + " " + updated_at.getDate() + ", " + updated_at.getFullYear();

        return result;
    }
}

const styles = StyleSheet.create({
    note: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    noteLeft: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    },
    noteRight: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    notePreview: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 5,
    },
    noteDate: {
        color: Colors.grey,
        fontSize: 15,
    }
});

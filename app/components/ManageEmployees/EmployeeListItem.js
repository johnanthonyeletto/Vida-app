import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Environment from '../../constants/Environment';

const styles = new StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: '100%',
    },
    column: {
        flexDirection: 'column',
        height: '100%',
        paddingRight: 5,
        paddingLeft: 5,
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    item: {
        height: 100,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
        padding: 5,
    },
    flex: {
        flex: 1,
    },
    name: {
        fontSize: 17,
    },
    date: {
        fontWeight: '100',
    }
});

export default class EmployeeListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.row, styles.item]}>
                <View style={[styles.column, styles.flex]}>
                    <View style={[styles.row]}>
                        <View style={[styles.column, styles.justifyCenter]}>
                            {this.props.status == 'Active' &&
                                <Ionicons name="ios-checkmark-circle-outline" size={40} style={{ alignSelf: 'center', }} color="green" />
                            }

                            {this.props.status == 'Pending' &&
                                <Ionicons name="ios-sync" size={40} style={{ alignSelf: 'center', }} color="#FFEA00" />
                            }

                            {this.props.status == 'Inactive' &&
                                <Ionicons name="ios-close-circle-outline" size={40} style={{ alignSelf: 'center', }} color="red" />
                            }

                            {this.props.employee.super_coach &&
                                <Text style={{ fontStyle: 'italic' }}>Admin</Text>
                            }
                        </View>
                        <View style={[styles.column, styles.justifyCenter]}>
                            {this.props.employee.person &&
                                <Text style={[styles.name]}>{this.props.employee.person.fname} {this.props.employee.person.lname}</Text>
                            }
                            <Text style={[styles.date]}>{this.props.employee.email}</Text>
                        </View>
                    </View>
                </View>


                <View style={[styles.column, styles.justifyCenter]}>
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
            result = minutes + ((minutes > 1) ? " minutes ago" : " minute ago");
        } else if (hours < 24) {
            result = hours + ((hours > 1) ? " hours ago" : " hour ago");
        } else if (days < 31) {
            result = days + ((days > 1) ? " days ago" : " day ago");
        } else if (months < 12) {
            result = months + ((months > 1) ? " months ago" : " month ago");
        } else {
            result = years + ((years > 1) ? " years ago" : " year ago");
        }

        return result;
    }
}
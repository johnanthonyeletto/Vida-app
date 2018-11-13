import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import FormGroup from '../../components/forms/FormGroup';
import ScrollContainer from '../../components/ScrollContainer';
import ListSeparator from '../../components/ListSeparator';

export default class ManageCompanyScreen extends Component {
    static navigationOptions = {
        title: 'Manage Company',
        headerTintColor: Colors.white,
        headerTitleStyle: {
            color: Colors.white
        },
        headerStyle: {
            backgroundColor: Colors.blue
        },
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollContainer>
                <ListSeparator>
                    <Text>Company Info</Text>
                </ListSeparator>
                <FormGroup
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.fname}
                    placeholder={"Company Name"}
                    keyboardType={"default"}
                    autoCapitalize={"words"}
                    autoCorrect={true}
                    maxLength={100}
                />
                <ListSeparator>
                    <Text>Employees</Text>
                </ListSeparator>
                <View style={styles.addEmployeeContainer}>
                    <TextInput
                        style={styles.newEmployeeInput}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        placeholder={"Add employee by email"}
                        keyboardType={"email-address"}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        textContentType={"emailAddress"}
                        maxLength={100}
                    />
                    <TouchableOpacity onPress={() => { alert("Add Client") }} style={styles.addEmployeeButton}>
                        <Text style={styles.addEmployeeButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollContainer>
        );
    }
}

const styles = StyleSheet.create({
    addEmployeeContainer: {
        flexDirection: 'row'
    },
    newEmployeeInput: {
        height: 50,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        flex: 1,
    },
    addEmployeeButton: {
        backgroundColor: Colors.blue,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    addEmployeeButtonText: {
        color: Colors.white,
        fontSize: 15,
    }
});

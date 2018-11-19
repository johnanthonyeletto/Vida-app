import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import FormGroup from '../../components/forms/FormGroup';
import User from '../../models/User';
import LoadingOverlay from '../../components/loadingOverlay';

export default class componentName extends Component {
    static navigationOptions = {
        headerTintColor: Colors.blue,
        headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 0,
        },
        headerBackTitle: null
    };

    constructor(props) {
        super(props);
        this.state = {
            validCode: false,
        };
    }

    render() {
        return (
            <ScrollContainer>
                <Text style={styles.welcomeText}>Welcome.</Text>

                {!this.state.validCode &&
                    <View>
                        <Text style={styles.instructionsText}>Enter your email and signup code to continue.</Text>

                        <FormGroup
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            placeholder={"Email Address"}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            textContentType={"emailAddress"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(code) => this.setState({ code })}
                            value={this.state.code}
                            placeholder={"Signup Code"}
                            keyboardType={"default"}
                            autoCapitalize={"characters"}
                            autoCorrect={true}
                            maxLength={6}
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={() => { this._continue() }}>
                            <Text style={styles.loginButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                }


                {this.state.validCode &&
                    <View>
                        <FormGroup
                            onChangeText={(fname) => this.setState({ fname })}
                            value={this.state.fname}
                            placeholder={"First Name"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"givenName"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(lname) => this.setState({ lname })}
                            value={this.state.lname}
                            placeholder={"Last Name"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"familyName"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(newPassword) => this.setState({ newPassword })}
                            value={this.state.newPassword}
                            placeholder={"New Password"}
                            keyboardType={"default"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={true}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(confirmNewPassword) => this.setState({ confirmNewPassword })}
                            value={this.state.confirmNewPassword}
                            placeholder={"Confirm New Password"}
                            keyboardType={"default"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={true}
                            maxLength={100}
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={() => { alert("Signup!") }}>
                            <Text style={styles.loginButtonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                }
                {this.state.loading &&
                    <LoadingOverlay />
                }
            </ScrollContainer>
        );
    }

    _continue() {
        this.setState({ validCode: true });
    }
}



const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 50,
        fontWeight: '600',
    },
    instructionsText: {
        fontSize: 15,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: Colors.blue,
        margin: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderRadius: 5,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 18,
    },
});

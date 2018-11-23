import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import FormGroup from '../../components/forms/FormGroup';
import User from '../../models/User';
import LoadingOverlay from '../../components/loadingOverlay';
import APIRequest from '../../helpers/APIRequest';

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
                <Text style={styles.welcomeText}>
                    Welcome
                <Text style={{ color: Colors.blue }}>.</Text>
                </Text>

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
                            autoCorrect={false}
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

                        <TouchableOpacity style={styles.loginButton} onPress={() => { this._signup() }}>
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
        if (this.state.email == null || this.state.code == null) {
            alert("Email and code are both required.");
            return;
        }
        this.setState({ loading: true });
        var request = new APIRequest();
        request.route = '/1.0/auth/check-code';
        request.method = "POST";
        request.body = { code: this.state.code, email: this.state.email };
        request.auth = false;

        request.go().then(result => {
            this.setState({ loading: false });
            if (result == true) {
                this.setState({ validCode: true });
            } else {
                alert("This email and code do not match.");
            }
        }).catch(error => {
            this.setState({ loading: false });
            alert(error);
        });


    }

    _signup() {
        if (this.state.fname == null || this.state.lname == null || this.state.newPassword == null || this.state.confirmNewPassword == null) {
            alert("All fields are required.");
            return;
        }

        if (this.state.newPassword != this.state.confirmNewPassword) {
            alert("Passwords do not match.");
            return;
        }

        this.setState({ loading: true });
        var request = new APIRequest();
        request.route = '/1.0/auth/signup';
        request.method = "POST";
        request.body = this.state;
        request.auth = false;

        request.go().then(result => {
            this.setState({ loading: false });
            AsyncStorage.setItem('token', result.token);
            this.props.navigation.navigate('App');
        }).catch(error => {
            this.setState({ loading: false });
            alert(error);
        });


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

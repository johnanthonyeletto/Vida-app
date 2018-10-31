import React from 'react';
import {
    AsyncStorage,
    SafeAreaView,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Environment from '../../constants/Environment';

const win = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Colors.lightBlue,
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <KeyboardAvoidingView behavior="padding">
                    <Image
                        source={require('../../assets/images/logo_1280x800.png')}
                        resizeMode={'contain'}
                        style={{
                            width: (win.width * 0.5), // This makes the image take up 50% of the window's width
                            //height: win.height,
                            flex: 1,
                            alignSelf: 'center'
                        }}
                    />

                    {
                        this.state.errorMessage &&
                        <View style={styles.errorMessage}>
                            <Ionicons name="ios-close-circle" size={32} style={{ marginRight: 15 }} color={Colors.white} style={styles.errorMessageIcon} />
                            <Text style={styles.errorMessageText}>{this.state.errorMessage}</Text>
                        </View>
                    }
                    <View>
                        <TextInput
                            style={styles.loginInput}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder={"Email"}
                            returnKeyType={"next"}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            onSubmitEditing={() => { this.passwordInput.focus(); }}
                            blurOnSubmit={false}
                            autoCapitalize={"none"}
                        />
                        <TextInput
                            style={styles.loginInput}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            returnKeyType={"go"}
                            textContentType={"password"}
                            ref={(input) => { this.passwordInput = input; }}
                            onSubmitEditing={() => { this._loginAsync() }}
                            autoCapitalize={"none"}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={this._loginAsync}>
                            {
                                !this.state.loading &&
                                <Text style={styles.loginButtonText}>
                                    Login
                        </Text>
                            }
                            {
                                this.state.loading &&
                                <ActivityIndicator color={Colors.white} size={"large"} />
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>


        );
    }

    _loginAsync = async () => {
        this.setState({ errorMessage: null, loading: true });
        fetch(Environment.API_HOST + '/1.0/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            //.then((response) => response.json())
            .then((response) => {

                if (response.status != 200) {
                    response.json().then(errors => {
                        var errorMessage = '';
                        for (var key in errors) {
                            errorMessage = errorMessage + errors[key] + ' ';
                        }
                        this.setState({ errorMessage: errorMessage, loading: false });
                    });


                    return;
                }

                response.json().then(result => {
                    AsyncStorage.setItem('token', result.token);
                    this.props.navigation.navigate('App');
                });

            })
            .catch((error) => {
                console.error(error);

                if (Environment.APP_ENV == 'dev') {
                    // If there's an error and we're in dev, let the user through with a random, invalid token. This won't let the user do anything, but it'll bring them to see the screens that they need. 
                    AsyncStorage.setItem('token', 'asdfasdf');
                }
            });




    };
}

const styles = StyleSheet.create({
    loginInput: {
        width: win.width * 0.85,
        height: 50,
        margin: 10,
        padding: 5,
        backgroundColor: Colors.white,
        fontSize: 15,
    },
    loginButton: {
        backgroundColor: Colors.blue,
        margin: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 18,
    },
    errorMessage: {
        width: (win.width * 0.85),
        backgroundColor: Colors.red,
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    errorMessageText: {
        fontSize: 15,
        color: Colors.white,
        flexDirection: 'column',
        padding: 10
    },
    errorMessageIcon: {
        flexDirection: 'column',
        padding: 10
    }
});
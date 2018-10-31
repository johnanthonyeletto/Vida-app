import React from 'react';
import {
    AsyncStorage,
    SafeAreaView,
    Button,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import Colors from '../../constants/Colors';
import Environment from '../../constants/Environment';

const win = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
    };

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Colors.lightBlue,
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../../assets/images/logo_1280x800.png')}
                    resizeMode={'contain'}
                    style={{
                        width: (win.width * 0.5), // This makes the image take up 50% of the window's width
                        //height: win.height,
                    }}
                />
                <Button title="Login!" onPress={this._loginAsync} />
            </SafeAreaView>
        );
    }

    _loginAsync = async () => {
        fetch(Environment.API_HOST + '/1.0/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'john.eletto1@marist.edu',
                password: 'password',
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem('token', responseJson.token);
                this.props.navigation.navigate('App');
            })
            .catch((error) => {
                console.error(error);

                if (Environment.APP_ENV == 'dev') {
                    // If there's an error and we're in dev, let the user through with a random, invalid token. This won't let the user do anything, but it'll bring them to see the screens that they need. 
                    AsyncStorage.setItem('token', 'asdfasdf');
                }
            });;




    };
}
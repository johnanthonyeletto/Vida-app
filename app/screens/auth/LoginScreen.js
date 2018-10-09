import React from 'react';
import {
    AsyncStorage,
    SafeAreaView,
    Button
} from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
    };

    render() {
        return (
            <SafeAreaView>
                <Button title="Login!" onPress={this._loginAsync} />
            </SafeAreaView>
        );
    }

    _loginAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}
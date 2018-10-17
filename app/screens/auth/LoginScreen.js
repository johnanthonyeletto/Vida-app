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
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}
import React from 'react';
import { AsyncStorage, } from 'react-native';
import { Container, Content, Text, Button, Header, H1, H2 } from 'native-base';
import User from '../../Models/User';


export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Vida',
        header: null
    };

    render() {
        return (
            <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Header transparent />
                <Content >
                    <H1>Vida</H1>
                    <H2>Please Log In</H2>
                    <Button full rounded onPress={this._signInAsync}>
                        <Text>Log In</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    _signInAsync = async () => {
        var user = new User()
        var success = user.login("username@domain.com", "password");
        if (success) {
            this.props.navigation.navigate('App');
        }

    };
}
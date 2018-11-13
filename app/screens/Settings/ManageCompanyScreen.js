import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import FormGroup from '../../components/forms/FormGroup';
import ScrollContainer from '../../components/ScrollContainer';

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
                <FormGroup
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.fname}
                    placeholder={"Company Name"}
                    keyboardType={"default"}
                    autoCapitalize={"words"}
                    autoCorrect={true}
                    maxLength={100}
                />
            </ScrollContainer>
        );
    }
}

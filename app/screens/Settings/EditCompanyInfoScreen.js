import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';
import FormGroup from '../../components/forms/FormGroup';
import ScrollContainer from '../../components/ScrollContainer';
import ListSeparator from '../../components/ListSeparator';
import Company from '../../models/Company';
import LoadingOverlay from '../../components/loadingOverlay';


let _this = null;

export default class EditCompanyInfoScreen extends Component {
    static navigationOptions = {
        title: 'Edit Company Info',
        headerTintColor: Colors.white,
        headerTitleStyle: {
            color: Colors.white
        },
        headerStyle: {
            backgroundColor: Colors.blue
        },
        headerRight: (
            <TouchableOpacity onPress={() => {
                _this._save();
            }} style={{ marginRight: 15 }}>
                <Text style={{ fontSize: 20, color: Colors.white }}>Save</Text>
            </TouchableOpacity>
        ),
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        _this = this;

        var comp = new Company();
        comp.getCompany().then(company => {
            this.setState(company);
        });
    }

    render() {
        return (
            <ScrollContainer>
                <ListSeparator>
                    <Text>Company Info</Text>
                </ListSeparator>
                <FormGroup
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    placeholder={"Company Name"}
                    keyboardType={"default"}
                    autoCapitalize={"words"}
                    autoCorrect={true}
                    maxLength={100}
                />
                {this.state.loading &&
                    <LoadingOverlay />
                }
            </ScrollContainer>
        );
    }

    _save() {
        if (this.state.name == null) {
            alert("Company name is required.");
            return;
        }
        _this.setState({ loading: true });

        var comp = new Company();

        comp.saveCompanyInfo(this.state).then(result => {
            _this.setState({ loading: false });
            _this.props.navigation.navigate("Settings");
        }).catch(error => {
            alert(error);
        });
    }
}

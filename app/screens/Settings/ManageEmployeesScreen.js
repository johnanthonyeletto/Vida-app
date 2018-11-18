import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SectionList, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';
import ScrollContainer from '../../components/ScrollContainer';
import ListSeparator from '../../components/ListSeparator';
import Company from '../../models/Company';
import ListItem from '../../components/clientList/ListItem';
import LoadingOverlay from '../../components/loadingOverlay';

export default class ManageEmployeesScreen extends Component {
    static navigationOptions = {
        title: 'Manage Employees',
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
            inactiveEmployees: [],
            activeEmployees: [],
            loading: false,
        };
    }

    componentDidMount() {
        var comp = new Company();

        comp.getEmployees().then(foundEmployees => {
            var employees = foundEmployees;
            this.setState({ activeEmployees: foundEmployees.active });
            this.setState({ inactiveEmployees: foundEmployees.inactive });
        }).catch(error => {
            alert(error);
        });
    }

    render() {
        return (
            <ScrollContainer>
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
                    <TouchableOpacity onPress={() => { this._add() }} style={styles.addEmployeeButton}>
                        <Text style={styles.addEmployeeButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                <SectionList
                    renderItem={({ item, index, section }) =>
                        <TouchableOpacity onPress={() => { alert("Click!") }}>
                            <ListItem client={item.person} />
                        </TouchableOpacity>
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <ListSeparator>{title}</ListSeparator>
                    )}
                    renderSectionFooter={({ section }) => this.renderNoContent(section)}
                    sections={[
                        { title: 'Active', data: this.state.activeEmployees },
                        { title: 'Inactive', data: this.state.inactiveEmployees },
                    ]}
                    keyExtractor={(item, index) => item + index}
                />
                {this.state.loading &&
                    <LoadingOverlay />
                }
            </ScrollContainer>
        );
    }

    _add() {
        this.setState({ loading: true });

        var comp = new Company();
        comp.addEmployee(this.state.email).then(response => {
            this.componentDidMount();
            this.setState({ email: null, loading: false });
            Keyboard.dismiss();
        }).catch(error => {
            alert(error);
        });
    }

    renderNoContent = (section) => {
        if (section.data.length == 0) {
            return <Text style={{ alignSelf: 'center', opacity: 0.6, fontSize: 15 }}>You Have No {section.title} Employees</Text>
        }
        return null
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

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SectionList, Keyboard, RefreshControl } from 'react-native';
import Colors from '../../constants/Colors';
import ScrollContainer from '../../components/ScrollContainer';
import ListSeparator from '../../components/ListSeparator';
import Company from '../../models/Company';
import EmployeeListItem from '../../components/ManageEmployees/EmployeeListItem';
import LoadingOverlay from '../../components/loadingOverlay';

export default class ManageEmployeesScreen extends Component {
    static navigationOptions = {
        title: 'Manage Employees',
    };
    constructor(props) {
        super(props);
        this.state = {
            inactiveEmployees: [],
            activeEmployees: [],
            pendingEmployees: [],
            loading: false,
            refreshing: false,
        };
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    async componentDidMount() {
        var comp = new Company();

        comp.getEmployees().then(foundEmployees => {
            var employees = foundEmployees;
            this.setState({ activeEmployees: foundEmployees.active });
            this.setState({ inactiveEmployees: foundEmployees.inactive });
            this.setState({ pendingEmployees: foundEmployees.pending });
        }).catch(error => {
            alert(error);
        });
    }

    render() {
        return (
            <ScrollContainer refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }>
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
                        // Don't render your own item.
                        !item.me &&
                        <TouchableOpacity onPress={() => { (section.title == "Pending") ? alert("This user has not created their account yet.") : this.props.navigation.navigate("ViewEmployee", { "pid": item.pid, "name": item.person.fname + " " + item.person.lname }) }}>
                            <EmployeeListItem employee={item} status={section.title} />
                        </TouchableOpacity>
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <ListSeparator>{title}</ListSeparator>
                    )}
                    renderSectionFooter={({ section }) => this.renderNoContent(section)}
                    sections={[
                        { title: 'Pending', data: this.state.pendingEmployees },
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
            alert("We sent a message with instructions on how to signup.");
        }).catch(error => {
            alert(error);
        });
    }

    renderNoContent = (section) => {
        if (section.data.length == 0) {
            return <Text style={{ alignSelf: 'center', opacity: 0.6, fontSize: 15 }}>You have no {section.title.toLowerCase()} employees.</Text>
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

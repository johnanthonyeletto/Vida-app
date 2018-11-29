import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SectionList, Keyboard, RefreshControl, Switch } from 'react-native';
import Colors from '../../constants/Colors';
import ScrollContainer from '../../components/ScrollContainer';
import ListSeparator from '../../components/ListSeparator';
import Employee from '../../models/Employee';
import ListItem from '../../components/clientList/ListItem';
import LoadingOverlay from '../../components/loadingOverlay';

let _this = null;

export default class ViewEmployeeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name').toString(),
    });
    constructor(props) {
        super(props);
        this.state = {
            activeClients: [],
            inactiveClients: [],
            loading: false,
            refreshing: false,
            name: "John Eletto",
        };
    };
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    async componentDidMount() {
        _this = this;
        const { navigation } = this.props;
        const pid = navigation.getParam('pid', 'NONE');

        var emp = new Employee();

        emp.getEmployee(pid).then(employee => {
            this.setState({ 'super_coach': employee.super_coach, 'activeClients': employee.clients.active, 'inactiveClients': employee.clients.inactive });
        }).catch(error => alert(error));
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
                    <Text>User Settings</Text>
                </ListSeparator>
                <View style={styles.addEmployeeContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>Admin Privleges</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Switch
                            onValueChange={() => { this.setState({ super_coach: !this.state.super_coach }) }}
                            value={this.state.super_coach} />
                    </View>
                </View>

                <SectionList
                    renderItem={({ item, index, section }) =>
                        <TouchableOpacity onPress={() => { alert("Click!") }}>
                            <ListItem client={item} />
                        </TouchableOpacity>
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <ListSeparator>{title}</ListSeparator>
                    )}
                    renderSectionFooter={({ section }) => this.renderNoContent(section)}
                    sections={[
                        { title: 'Active', data: this.state.activeClients },
                        { title: 'Inactive', data: this.state.inactiveClients },
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

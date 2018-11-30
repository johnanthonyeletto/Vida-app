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
            person: [],
            loading: false,
            refreshing: false,
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
            this.setState({ 'super_coach': employee.super_coach, 'activeClients': employee.clients.active, 'inactiveClients': employee.clients.inactive, 'person': employee.person, 'isActive': employee.person.isActive });
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
                <View style={styles.userSettingItem}>
                    <View style={styles.userSettingLeft}>
                        <Text style={styles.userSettingText}>Active</Text>
                    </View>
                    <View style={styles.userSettingRight}>
                        <Switch
                            onValueChange={() => { this._toggleActive() }}
                            value={this.state.isActive} />
                    </View>
                </View>

                <View style={styles.userSettingItem}>
                    <View style={styles.userSettingLeft}>
                        <Text style={styles.userSettingText}>Super Coach Privleges</Text>
                    </View>
                    <View style={styles.userSettingRight}>
                        <Switch
                            onValueChange={() => { this._toggleSuperCoach() }}
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

    renderNoContent = (section) => {
        if (section.data.length == 0) {
            return <Text style={{ alignSelf: 'center', opacity: 0.6, fontSize: 15 }}>{this.state.person.fname} {this.state.person.lname} has no {section.title.toLowerCase()} clients.</Text>
        }
        return null
    }

    _toggleSuperCoach() {
        var super_coach = !this.state.super_coach;

        this.setState({ "super_coach": super_coach, "loading": true });

        var emp = new Employee();

        emp.setSuperCoach(this.state.person.pid, super_coach).then(result => {
            this.setState({ loading: false });
        }).catch(error => {
            alert(error);
            this.setState({ loading: false });
        });
    }

    _toggleActive() {
        var isActive = !this.state.isActive;

        this.setState({ "isActive": isActive, "loading": true });

        var emp = new Employee();

        emp.setActive(this.state.person.pid, isActive).then(result => {
            this.setState({ loading: false });
        }).catch(error => {
            alert(error);
            this.setState({ loading: false });
        });
    }
}

const styles = StyleSheet.create({
    userSettingItem: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        padding: 15,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
    },
    userSettingLeft: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    userSettingRight: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    userSettingText: {
        fontSize: 15,
    }
});

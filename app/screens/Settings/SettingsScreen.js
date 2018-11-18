import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import Navigator from 'react-navigation';
import SettingsItem from '../../components/settings/SettingsItem';
import SettingsGroupSeparator from '../../components/settings/SettingsGroupSeparator';

const app = require('../../app.json');

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };


  // All on onPress are set to logout for now just so the warning about them being null goes away.
  render() {
    return (
      <ScrollView>
        <SettingsGroupSeparator title={"Accounts"} />
        <SettingsItem title={"Edit My Account"} onPress={() => { this.props.navigation.navigate("EditAccount") }} />
        <SettingsItem title={"Edit Company Info"} onPress={() => { this.props.navigation.navigate("EditCompanyInfo") }} />
        <SettingsItem title={"Manage Employees"} onPress={() => { this.props.navigation.navigate("ManageEmployees") }} />

        <SettingsGroupSeparator title={"About"} />
        <SettingsItem title="Help/FAQ" onPress={() => { alert("Help yo self.") }} />
        <SettingsItem title="Legal Terms" onPress={() => { alert("Anyone know a good lawyer?") }} />

        <SettingsGroupSeparator title={""} />
        <SettingsItem title="Logout" onPress={this._logoutAsync} color={Colors.red} />
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: Colors.grey }}>{app.expo.name} {app.expo.version}</Text>
          <Text style={{ color: Colors.grey }}>{'\u00A9'}{new Date().getFullYear()} Vida. All rights reserved.</Text>
        </View>
      </ScrollView>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

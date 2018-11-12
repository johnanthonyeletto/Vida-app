import React from 'react';
import {
  AsyncStorage,
  ScrollView,
} from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Colors from '../constants/Colors';
import Navigator from 'react-navigation';
import SettingsItem from '../components/settings/SettingsItem';
import SettingsGroupSeparator from '../components/settings/SettingsGroupSeparator';

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
        <SettingsItem title={"Edit My Account"} onPress={() => { alert("Edit Account") }} />
        <SettingsItem title={"Manage Company"} onPress={() => { alert("Manage Company") }} />

        <SettingsGroupSeparator title={"About"} />
        <SettingsItem title="Help/FAQ" onPress={() => { alert("Help / FAQ") }}  />
        <SettingsItem title="Legal Terms" onPress={() => { alert("Legal Terms") }}  />
        
        <SettingsGroupSeparator title={""} />
        <SettingsItem title="Logout" onPress={this._logoutAsync} color={Colors.red} />
      </ScrollView>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

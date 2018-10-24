import React from 'react';
import {
  AsyncStorage,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import Colors from '../constants/Colors';
import Navigator from 'react-navigation';

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
  lawyer = () => {
    alert("Anyone know a good lawyer?")
  }

  // All on onPress are set to logout for now just so the warning about them being null goes away.
  render() {
    return (
      <View style={styles.settingsContainer}>
        <Button title="Notifications" onPress={this._logoutAsync} />
        <Button title="Help/FAQ" onPress={this._logoutAsync} />
        <Button title="Legal Terms" onPress={this.lawyer} />
        <Button title="Account Info" onPress={this._logoutAsync} />
        <Button title="Logout" onPress={this._logoutAsync} color={Colors.red} />
      </View>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: Colors.white
  },
  dividerLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'center',
    width: 180
  },
  dividerBlock: {
    backgroundColor: Colors.lightGrey,
    height: 40,
  },
});

// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
/*
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  SectionList,
  Text,
  View
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return(
      <ScrollView>
        </View>
      </ScrollView>
    );
  }
}

*/

import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerTitleStyle:{
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Button title="Sign Out" onPress={this._logoutAsync} />
      </View>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

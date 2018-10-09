import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
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
      <ScrollContainer>
        <Button title="Logout" onPress={this._logoutAsync} />
      </ScrollContainer>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

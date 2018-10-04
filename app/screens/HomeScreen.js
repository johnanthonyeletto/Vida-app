import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Clients',
    headerTitle: <Image
    source={require('../assets/images/logo_1280x800.png')}
    style={{height: 45, width: 72, paddingTop: 5, paddingBottom: 5}}
  />,
  };

  render() {
    return (
      <View>

      </View>
    );
  }
}
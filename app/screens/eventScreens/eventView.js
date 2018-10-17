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
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import Navigator from 'react-navigation';

export default class eventView extends React.Component {
  static navigationOptions = {
    title: 'Upcoming Event',
    headerTitleStyle:{
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };



  render() {
    return (
      <View> </View>
    );
  }

}
const styles = StyleSheet.create({
  eventAddContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: Colors.white
  },
});

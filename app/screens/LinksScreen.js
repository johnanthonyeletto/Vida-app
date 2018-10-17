import React from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ScheduleList from '../models/ScheduleList';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import EventItem from '../components/EventItem';
import Navigator from 'react-navigation';

export default class LinksScreen extends React.Component {
  static navigationOptions = ({navigation})=> ({
    title: 'Upcoming',
    // headerTitle: <Image
    //   source={require('../assets/images/logo_1280x800.png')}
    //   style={{ height: 45, width: 72, paddingTop: 5, paddingBottom: 5 }}
    // />,
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('EEntry') }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
      </TouchableOpacity>
    ),
  });


  constructor(props) {
    super(props);

    const scheduleList = new ScheduleList();
    this.events = scheduleList.getUpcoming();
  }
  lawyer = () => {
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.events}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EView'); }}>
              <EventItem sEvent={item}/>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => item + index}

        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

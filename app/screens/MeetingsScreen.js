import React from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import EventList from '../models/EventList';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import EventItem from '../components/EventItem';

export default class MeetingsScreen extends React.Component {
  static navigationOptions = ({navigation})=> ({
    title: 'Upcoming Meetings',
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

    this.state = {
      events: [],
      refreshing: false,
    }

  }

  _onRefresh = () => {
      this.setState({ refreshing: true });
      this.componentDidMount().then(() => {
        this.setState({ refreshing: false });
      });
    }

    async componentDidMount() {
      var eventList = new EventList();
      eventList.getEvents().then(foundEvents => {
        var events = foundEvents;
        this.setState({ events: events })
      });
    }

  render() {
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />
          }
      >
        <FlatList
          data={this.state.events}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() =>
              { this.props.navigation.navigate('EView', { 'event_id': item.event_id }); }
             }>
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

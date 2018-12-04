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
import ScrollContainer from '../components/ScrollContainer';

export default class MeetingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Upcoming Meetings',
    headerTitleStyle: {
      color: Colors.blue
    },
    headerStyle: {
      backgroundColor: Colors.white
    },
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('EEntry', { onNavigateBack: _this.navRefresh }) }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
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
  navRefresh = () => {
    this.componentDidMount();
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async componentDidMount() {
    _this = this;
    var eventList = new EventList();
    eventList.getEvents().then(foundEvents => {
      var events = foundEvents;
      this.setState({ events: events })
    });
  }
  // Need a past/future toggle.
  // Options?
  // We could have to api calls. One for all events starting at today's time and one for everything behind today.
  // We could sort the dataset that we get from the current api call, and then find a way to toggle between the two displays.


  render() {
    return (
      <ScrollContainer
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />
        }
      >
        <FlatList
          data={this.state.events}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventEntry', { onNavigateBack: this.navRefresh, 'eventPKG': item }); }
            }>
              <EventItem sEvent={item} />
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => item + index}

        />
      </ScrollContainer>
    );
  }
}

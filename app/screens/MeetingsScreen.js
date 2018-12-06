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
import LoadingOverlay from '../components/loadingOverlay';
let _this = null;

export default class MeetingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Meetings',
    headerTitleStyle: {
      color: Colors.blue
    },
    headerStyle: {
      backgroundColor: Colors.white
    },
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('EventEntry', { onNavigateBack: _this.navRefresh }) }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => { _this.setState({pastEventsToggle: !_this.state.pastEventsToggle}) }}>
        <Ionicons name="ios-calendar" size={32} style={{ marginLeft: 15 }} color={Colors.blue} />
      </TouchableOpacity>
    ),
  });


  constructor(props) {
    super(props);

    this.state = {
      events: [],
      refreshing: false,
      loading: true,
      pastEventsToggle:false,
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
      var today = new Date();
      var splitAt = 0;
      var tempDate =null;
      for (var i = 0; i < events.length; i++) {
        match = events[i].event_datetime;
        match = match.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
        match = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
        if ( match < today) {
          splitAt++;
          console.log("splitAt:" + splitAt);
        }
        console.log("Loopin");
      }
      var pastEvents = events.splice(0,splitAt);
      this.setState({ events: events, pastEvents: pastEvents, loading: false, })
    });
  }


  render() {
    if (this.state.loading) {
      return (
        <LoadingOverlay />
      )
    }


    if (this.state.events.length < 1) {
      return (
        <ScrollContainer
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={{ alignItems: 'center', alignContent: 'center', }}>
            <Ionicons name="ios-calendar"
              size={150}
              style={{
                alignSelf: 'center',
                marginBottom: 0,
                marginTop: 20,
              }}
              color={Colors.lightGrey} />
            <Text style={{ fontWeight: '200', fontSize: 30, marginTop: 0, textAlign: 'center', color: Colors.grey }}>
              It seems like you don't have any meetings scheduled yet.
            </Text>
            <TouchableOpacity style={{
              backgroundColor: Colors.blue,
              marginTop: 20,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 5,
              width: 200,
            }} onPress={() => { this.props.navigation.navigate('EventEntry', { onNavigateBack: this.navRefresh }) }}>
              <Text style={{
                color: Colors.white,
                fontSize: 18,
              }}>Add A Meeting</Text>
            </TouchableOpacity>
          </View>
        </ScrollContainer >
      )
    }

    if (this.state.pastEventsToggle) {
      return (
        <ScrollContainer
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />
          }
        >
          <FlatList
            data={this.state.pastEvents}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('DEventEntry', { onNavigateBack: this.navRefresh, 'eventPKG': item }); }
              }>
                <EventItem sEvent={item} />
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => item + index}

          />
        </ScrollContainer>
      );
    }

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

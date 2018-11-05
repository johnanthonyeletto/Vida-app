import React, { Component }  from 'react';
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
import EventItem from '../../components/EventItem';
import Event from '../../models/Event';

export default class eventView extends Component {
  static navigationOptions = {
    title: 'Meeting',
    headerTitleStyle:{
      color: Colors.white
    },
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.blue
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      event: [],
    };

}
  async componentDidMount() {
    const { navigation } = this.props;
    const event_id = navigation.getParam('event_id', 'NONE');

    var event = new Event();
    event.getEvent(event_id).then(foundEvent => {
      this.setState({ event: foundEvent });
    });
  }



  render() {
    const itemId = this.props.navigation.getParam('item', 'null');
    return (
      <ScrollView style={styles.eventAddContainer}>
        <EventItem sEvent={this.state.event}/>
        <Button title="Update" onPress={()=>console.log("update pls")} />
      </ScrollView>
    );
  }
  /*
  figure out how to implement these better
  <Button title="Update" onPress={()=>this.update(itemId)} />
  <Button title="Add" onPress={this.add} />
  */

}
const styles = StyleSheet.create({
  eventAddContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },
});

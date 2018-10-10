import React from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { WebBrowser } from 'expo';
import ClientList from '../models/ClientList';
import ScrollContainer from '../components/ScrollContainer'
import ListSeparator from '../components/clientList/ListSeparator';
import ListItem from '../components/clientList/ListItem';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Clients',
    // headerTitle: <Image
    //   source={require('../assets/images/logo_1280x800.png')}
    //   style={{ height: 45, width: 72, paddingTop: 5, paddingBottom: 5 }}
    // />,
    headerTitleStyle: {
      color: '#000000'
    },
    headerStyle: {
      backgroundColor: Colors.white
    },
    headerRight: (
      <TouchableOpacity onPress={() => { alert("New Client") }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);

    const clientList = new ClientList();
    this.activeClients = clientList.getActive();
    this.inactiveClients = clientList.getInactive();
  }

  render() {
    return (
      <ScrollContainer>
        <SectionList
          renderItem={({ item, index, section }) =>
            <ListItem client={item} />
          }
          renderSectionHeader={({ section: { title } }) => (
            <ListSeparator>{title}</ListSeparator>
          )}
          sections={[
            { title: 'Active', data: this.activeClients },
            { title: 'Inactive', data: this.inactiveClients },
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollContainer>
    );
  }
}
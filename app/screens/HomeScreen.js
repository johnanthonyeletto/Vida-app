import React from 'react';
import {
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';
import ClientList from '../models/ClientList';
import ScrollContainer from '../components/ScrollContainer'
import ListSeparator from '../components/ListSeparator';
import ListItem from '../components/clientList/ListItem';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: {
      color: Colors.white
    },
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerRight: (
      <TouchableOpacity onPress={() => { alert("New Client") }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
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
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientProfile'); }}>
              <ListItem client={item} />
            </TouchableOpacity>
          }
          renderSectionHeader={({ section: { title } }) => (
            <ListSeparator>{title}</ListSeparator>
          )}
          renderSectionFooter={({ section }) => this.renderNoContent(section)}
          sections={[
            { title: 'Active', data: this.activeClients },
            { title: 'Inactive', data: this.inactiveClients },
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollContainer>
    );
  }

  renderNoContent = (section) => {
    if (section.data.length == 0) {
      return <Text style={{ alignSelf: 'center', opacity: 0.6, fontSize: 15 }}>You Have No {section.title} Clients</Text>
    }
    return null
  }
}
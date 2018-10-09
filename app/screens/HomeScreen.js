import React from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  Text,
} from 'react-native';
import { WebBrowser } from 'expo';
import ClientList from '../models/ClientList';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Clients',
    // headerTitle: <Image
    //   source={require('../assets/images/logo_1280x800.png')}
    //   style={{ height: 45, width: 72, paddingTop: 5, paddingBottom: 5 }}
    // />,
    headerTitleStyle:{
      color: Colors.white
    },
    headerStyle:{
      backgroundColor: Colors.blue
    }
  };

  constructor(props) {
    super(props);

    const clientList = new ClientList();
    this.activeClients = clientList.getActive();
    this.inactiveClients = clientList.getInactive();
  }

  render() {
    return (
      <ScrollView>
        <SectionList
          renderItem={({ item, index, section }) =>
            <Text key={index}>{item.name}</Text>
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          )}
          sections={[
            { title: 'Active', data: this.activeClients },
            { title: 'Inactive', data: this.inactiveClients },
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollView>
    );
  }
}
import React from 'react';
import {
  SectionList,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ClientList from '../models/ClientList';
import ScrollContainer from '../components/ScrollContainer'
import ListSeparator from '../components/ListSeparator';
import ListItem from '../components/clientList/ListItem';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from '../components/loadingOverlay';

const win = Dimensions.get('window');

let _this = null;

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Clients',
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('AddClient') }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      inactiveClients: [],
      activeClients: [],
      refreshing: false,
      isLoading: true,
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async componentDidMount() {
    _this = this;
    var clientList = new ClientList();
    clientList.getClients().then(foundClients => {
      var clients = foundClients;
      this.setState({ activeClients: clients.active });
      this.setState({ inactiveClients: clients.inactive });
      this.setState({ isLoading: false });
    }).catch(error => {
      alert(error);
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingOverlay />
      )
    }
    if (this.state.activeClients.length < 1 && this.state.inactiveClients.length < 1) {
      return (
        <ScrollContainer
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={{ alignItems: 'center', alignContent: 'center', }}>
            <Ionicons name="ios-people"
              size={150}
              style={{
                alignSelf: 'center',
                marginBottom: 0,
                marginTop: 20,
              }}
              color={Colors.lightGrey} />
            <Text style={{ fontWeight: '200', fontSize: 30, marginTop: 0, textAlign: 'center', color: Colors.grey }}>
              It seems like you don't have any clients yet.
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
            }} onPress={() => { this.props.navigation.navigate('AddClient') }}>
              <Text style={{
                color: Colors.white,
                fontSize: 18,
              }}>Add A Client</Text>
            </TouchableOpacity>
          </View>
        </ScrollContainer >
      )
    }
    return (
      <ScrollContainer
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <SectionList
          renderItem={({ item, index, section }) =>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClientProfile', { 'pid': item.pid }); }}>
              <ListItem client={item} />
            </TouchableOpacity>
          }
          renderSectionHeader={({ section: { title } }) => (
            <ListSeparator>{title}</ListSeparator>
          )}
          renderSectionFooter={({ section }) => this.renderNoContent(section)}
          sections={[
            { title: 'Active', data: this.state.activeClients },
            { title: 'Inactive', data: this.state.inactiveClients },
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
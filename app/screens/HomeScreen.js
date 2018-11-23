import React from 'react';
import {
  SectionList,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
  Image,
  Dimensions,
} from 'react-native';
import ClientList from '../models/ClientList';
import ScrollContainer from '../components/ScrollContainer'
import ListSeparator from '../components/ListSeparator';
import ListItem from '../components/clientList/ListItem';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from '../components/loadingOverlay';

const win = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Clients',
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('AddClient') }}>
        <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.white} />
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
    var clientList = new ClientList();
    clientList.getClients().then(foundClients => {
      var clients = foundClients;
      this.setState({ activeClients: clients.active });
      this.setState({ inactiveClients: clients.inactive });
      this.setState({ isLoading: false });
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
          <View style={{ alignItems: 'center', alignContent: 'center' }}>
            <Ionicons name="ios-people" size={200} style={{ alignSelf: 'center' }} color={Colors.lightBlue} />
            <Text style={{ fontWeight: '300', fontSize: 30 }}>Welcome To</Text>
            <Image
              source={require('../assets/images/logo_1280x800.png')}
              resizeMode={'contain'}
              style={{
                width: (win.width * 0.4),
                height: ((win.width * 0.4) * 0.625),
                alignSelf: 'center',
              }}
            />
            <Text>You have no clients yet.</Text>
            <Text>
              If you want to add clients, click + in the top right of the screen.
            </Text>
          </View>
        </ScrollContainer>
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
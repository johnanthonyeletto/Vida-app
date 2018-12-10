import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  RefreshControl,
  FlatList,
  View, Text, WebView, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import GraphList from '../../models/GraphList';
// const GraphHTML = require('../../assets/html/vida_graph.html');
import Environment from '../../constants/Environment';
const Graph = Environment.API_HOST + '/vida_graph.html';

export default class ClientGraphScreen extends Component {
    static navigationOptions = {
        //title: 'Pablo Rivas',
        // headerTitleStyle: {
        //     color: Colors.white
        // },
        headerTintColor: Colors.blue,
        headerStyle: {
            backgroundColor: Colors.lightGrey,
            borderBottomWidth: 0,
        },
        headerBackTitle: 'Back',
        headerRight: (
            <TouchableOpacity onPress={() => { alert("Add something to this client.") }}>
                <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
            </TouchableOpacity>
        ),
    };


  constructor(props) {
    super(props);

    this.state = {
      relationship: [],
      loading: true,
    }

  }

  _onRefresh = () => {
      this.setState({ refreshing: true });
      this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
      });
    }

    async componentDidMount() {
      var { navigation } = this.props;
      var pid = navigation.getParam('pid', 'NONE');
      var relationshipList = new GraphList();
      relationshipList.getRelationships(pid).then(foundRelation => {
        var relationship = foundRelation;
        this.setState({ relationship: relationship })
        this.setState({ loading: false })
      });
    }

  /*  render() {

          return (
            <View>
                <Text>{JSON.stringify(this.state.events)}</Text>
            </View>
            );
    } */

    injectjs() {

        let message =  JSON.stringify(this.state.relationship);
        let envi = (Environment.API_HOST);

        let jsCode = `
          setTimeout(() => {
            dumb('${message}', '${envi}');
          }, 1500)`;

        return jsCode;
      }

    render() {
      var data = JSON.stringify(this.state.relationship);

           return (
             ( !this.state.loading &&
               <WebView
                   originWhitelist={['*']}
                   javaScriptEnabled={true}
                   injectedJavaScript={this.injectjs()}
                   source={{uri: Graph}}
                   mixedContentMode={'compatibility'}
                   style={{ backgroundColor: Colors.lightGrey }}
                   //injectedJavaScript={'dumb("' + (this.state.events) + '")'}

               />
             )
           );
       }
   }

import React from 'react';
import { Container, Drawer, Input, Item, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Separator, Thumbnail } from 'native-base';
import SideBar from '../components/SideBar';
import ClientList from '../Models/ClientList';

export default class ClientListScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "Vida",
        headerRight: <Button transparent onPress={() => alert("This will navigate to the new client screen.")}><Icon name='add' style={{ marginRight: 10 }} /></Button>,
        headerLeft: <Button transparent onPress={() => openDrawer()}><Icon name='menu' style={{ marginLeft: 10, }} /></Button>,
        headerBackTitle: 'Home',
        tabBarIcon: () => (
            <Icon
                name="ios-home"
                style={{ color: "white" }}
            />
        ),
        tabBarVisible: false
    };

    constructor(props) {
        super(props);
        var cl = new ClientList();
        this.activeClients = cl.getActive();
        this.inactiveClients = cl.getInactive();
    }

    render() {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        openDrawer = () => {
            this.drawer._root.open()
        };
        return (
            <Container>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar navigator={this.navigator} />}
                    onClose={() => closeDrawer()} >
                    <Content>
                        <Item style={{ paddingLeft: 10, paddingRight: 10, }}>
                            <Icon name="ios-search" />
                            <Input
                                placeholder="Search Clients"
                                returnKeyType='search'
                            />
                            <Icon name="ios-people" />
                        </Item>

                        {/* Hackey Hack Hack - John Eletto */}
                        <List></List>

                        <Separator bordered>
                            <Text>Active Clients</Text>
                        </Separator>
                        <List dataArray={this.activeClients}
                            renderRow={(client) =>
                                <ListItem thumbnail onPress={()=> this.props.navigation.navigate('ClientProfile')}>
                                    <Left>
                                        <Thumbnail square source={{ uri: client.avatarURL }} />
                                    </Left>
                                    <Body>
                                        <Text>{client.name}</Text>
                                        <Text note>
                                            <Text style={{ fontWeight: "bold" }} note>Updated: </Text>
                                            <Text note>{client.lastInteraction}</Text>
                                        </Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            }>
                        </List>

                        <Separator bordered>
                            <Text>Inactive Clients</Text>
                        </Separator>
                        <List dataArray={this.inactiveClients}
                            renderRow={(client) =>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail square source={{ uri: client.avatarURL }} />
                                    </Left>
                                    <Body>
                                        <Text>{client.name}</Text>
                                        <Text note>
                                            <Text style={{ fontWeight: "bold" }} note>Updated: </Text>
                                            <Text note>{client.lastInteraction}</Text>
                                        </Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            }>
                        </List>
                    </Content>
                </Drawer>
            </Container >
        );
    }
}






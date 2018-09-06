import React from 'react';
import { Container, Drawer, Item, Input, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Separator, Thumbnail } from 'native-base';
import SideBar from '../components/SideBar';

export default class ClientList extends React.Component {
    static navigationOptions = {
        title: 'Vida',
        headerRight: <Button transparent onPress={() => alert("This will navigate to the new client screen.")}><Icon name='add' style={{ marginRight: 10 }} /></Button>,
        headerLeft: <Button transparent onPress={() => openDrawer()}><Icon name='menu' style={{ marginLeft: 10, }} /></Button>,
        headerBackTitle: 'Home'
    };
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
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                        <List>
                            <Separator bordered>
                                <Text>Active Clients</Text>
                            </Separator>
                            <ListItem thumbnail onPress={() => this.props.navigation.navigate('ClientProfile')}>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>John</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>Jack</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>Andrew</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>Hunter</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>Jenna</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <Separator bordered>
                                <Text>Inactive Clients</Text>
                            </Separator>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                                </Left>
                                <Body>
                                    <Text>Pablo Rivas</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Drawer>
            </Container >
        );
    }
}
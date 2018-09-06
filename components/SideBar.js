import React from 'react';
import { View, Image, Linking } from 'react-native'
import { Container, H1, Content, Button, Icon, Text, Separator, List, ListItem, Left, Right } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

export default class SideBar extends React.Component {

    render() {

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Organization</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Create Organization</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>

                        <ListItem itemDivider>
                            <Text>Account</Text>
                        </ListItem>
                        <ListItem onPress={() => { alert("This will bring the user to a screen which allows them to edit their account. Emails passwords etc.") }}>
                            <Left>
                                <Text>Manage Account</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => alert("This will log out the user and return them to the login screen.")}>
                            <Left>
                                <Text>Logout</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );

    }
}
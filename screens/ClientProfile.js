import React from 'react';
import { Container, Fab, Tabs, Tab, Button, Icon, Text, } from 'native-base';
import ClientConnectionsWeb from '../components/ClientConnectionsWeb';
import ClientProfileInfo from '../components/ClientProfileInfo';



export default class ClientProfile extends React.Component {
    static navigationOptions = {
        title: 'John Eletto',
        headerRight: <Button transparent onPress={() => alert("This will navigate to the edit user profile page.")}><Text>Edit</Text></Button>,
    };

    constructor() {
        super();
        this.state = {
            active: false
        };
    };

    render() {
        return (
            <Container>
                <Tabs locked>
                    <Tab heading="Profile">
                        <ClientProfileInfo />
                    </Tab>
                    <Tab heading="Connections">
                        <ClientConnectionsWeb />
                    </Tab>
                </Tabs>


                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#2196F3' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={()=>alert("Add new event.")}>
                        <Icon name="calendar" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }} onPress={()=>alert("Add new connection.")}>
                        <Icon name="people" />
                    </Button>
                    <Button style={{ backgroundColor: '#DD5144' }} onPress={()=>alert("Add new note.")}>
                        <Icon name="clipboard" />
                    </Button>
                </Fab>
            </Container >

        );
    }
}
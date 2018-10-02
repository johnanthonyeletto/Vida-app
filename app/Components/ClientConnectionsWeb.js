import React from 'react';
import { Container, Content, Text, } from 'native-base';


export default class ClientConnectionsWeb extends React.Component {

    render() {


        return (
            <Container style={{ backgroundColor: '#263238' }}>
                <Content>
                    <Text style={{ color: '#fff' }}>This is a web of all the client's connections. There should probably be functionality to switch to a list view</Text>
                </Content>
            </Container>
        );
    }


}
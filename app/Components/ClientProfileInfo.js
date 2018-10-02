import React from 'react';
import { View, Image, Linking } from 'react-native'
import { Container, H1, Content, Button, Icon, Text, Separator, } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

export default class ClientProfileInfo extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <Container>
                <Content>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Image style={{ borderRadius: 150 / 2, overflow: "hidden", flex: 0, width: 150, height: 150, resizeMode: 'contain' }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} />
                        <H1>{this.props.client.name}</H1>
                        <Grid style={{ marginTop: 10, flex: 0 }}>
                            <Col>
                                <Button rounded style={{ alignSelf: 'center' }} onPress={() => this.openURL("sms:" + this.props.client.phone)}>
                                    <Icon name="chatbubbles" />
                                </Button>
                            </Col>
                            <Col>
                                <Button rounded style={{ alignSelf: 'center' }} onPress={() => this.openURL("tel:" + this.props.client.phone)}>
                                    <Icon name="call" />
                                </Button>
                            </Col>
                            <Col>
                                <Button rounded style={{ alignSelf: 'center' }} onPress={() => this.openURL("mailto:" + this.props.client.email + "?body=\n\n\nSent Using Vida\nhttps://getvida.app")}>
                                    <Icon name="mail" />
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Separator bordered>
                            <Text>Notes</Text>
                        </Separator>
                    </View>
                </Content>
            </Container>
        );
    }

    openURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                alert("Not supported.");
            } else {
                return Linking.openURL(url);

            }
        }).catch(err => alert(err));
    }
}
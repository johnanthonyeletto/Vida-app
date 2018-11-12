import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, ActionSheetIOS, Image } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import Colors from '../../constants/Colors';
import { ImagePicker } from 'expo';
import Client from '../../models/Client';
import Environment from '../../constants/Environment';
import FormGroup from '../../components/forms/FormGroup';
import LoadingOverlay from '../../components/loadingOverlay';

let _this = null;

export default class AddClientScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        gesturesEnabled: false,
        title: null,
        headerTintColor: Colors.white,
        headerTitleStyle: {
            color: Colors.white
        },
        headerStyle: {
            backgroundColor: Colors.blue
        },
        headerLeft: (
            <TouchableOpacity onPress={() => {
                navigation.goBack(null);
            }} style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 20, color: Colors.white }}>Cancel</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => {
                _this._save();
            }} style={{ marginRight: 15 }}>
                <Text style={{ fontSize: 20, color: Colors.white }}>Save</Text>
            </TouchableOpacity>
        ),
    });


    constructor(props) {
        super(props);
        this.state = {
            image_path: Environment.API_HOST + "/img/people_images/default.png",
        };
    }

    componentDidMount() {
        _this = this;

        const { navigation } = this.props;
        const pid = navigation.getParam('pid', 'NONE');
        if (pid !== 'NONE') {
            // We're editing a client. Load their info.

            var client = new Client();
            client.getClient(pid).then(foundClient => {
                this.setState(foundClient);

                this.setState({ image_path: Environment.API_HOST + this.state.image_path });
            });
        }
    }

    render() {
        return (
            <ScrollContainer>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={100} behavior={"padding"}>
                    <View style={{ marginBottom: 20 }}>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this._pickImage}>
                            <Image
                                style={{ width: 100, height: 100, borderRadius: (100 / 2), alignSelf: "center", margin: 10 }}
                                source={{ uri: this.state.image_path }}
                            />
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: Colors.blue }}>Change Photo</Text>
                        </TouchableOpacity>
                        <FormGroup
                            onChangeText={(fname) => this.setState({ fname })}
                            value={this.state.fname}
                            placeholder={"First Name"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"givenName"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(lname) => this.setState({ lname })}
                            value={this.state.lname}
                            placeholder={"Last Name"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"familyName"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(occupation) => this.setState({ occupation })}
                            value={this.state.occupation}
                            placeholder={"Occupation"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(cell_phone) => this.setState({ cell_phone })}
                            value={this.state.cell_phone}
                            placeholder={"Cell Phone"}
                            keyboardType={"phone-pad"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            textContentType={"telephoneNumber"}
                        />

                        <FormGroup
                            onChangeText={(home_phone) => this.setState({ home_phone })}
                            value={this.state.home_phone}
                            placeholder={"Home Phone"}
                            keyboardType={"phone-pad"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            textContentType={"telephoneNumber"}
                        />

                        <FormGroup
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            placeholder={"Email Address"}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            textContentType={"emailAddress"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(address) => this.setState({ address })}
                            value={this.state.address}
                            placeholder={"Address 1"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"streetAddressLine1"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(address2) => this.setState({ address2 })}
                            value={this.state.address2}
                            placeholder={"Address 2"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"streetAddressLine2"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(city) => this.setState({ city })}
                            value={this.state.city}
                            placeholder={"City"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"addressCity"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(state_province) => this.setState({ state_province })}
                            value={this.state.state_province}
                            placeholder={"State"}
                            keyboardType={"default"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"addressState"}
                            maxLength={100}
                        />

                        <FormGroup
                            onChangeText={(postal_code) => this.setState({ postal_code })}
                            value={this.state.postal_code}
                            placeholder={"Postal Code"}
                            keyboardType={"numeric"}
                            autoCapitalize={"words"}
                            autoCorrect={true}
                            textContentType={"postalCode"}
                        />

                    </View>
                </KeyboardAvoidingView>
                {this.state.loading &&
                    <LoadingOverlay />
                }
            </ScrollContainer>

        );
    }

    _save = async () => {

        if (this.state.fname == null || this.state.lname == null) {
            alert("First name and last name are both required.");
            return;
        }
        // if (this.state.pid == null) {
        this.setState({ loading: true });
        var client = new Client();
        client.pid = this.state.pid;
        client.fname = this.state.fname;
        client.lname = this.state.lname;
        client.address = this.state.address;
        client.address2 = this.state.address2;
        client.city = this.state.city;
        client.state_province = this.state.state_province;
        client.cell_phone = this.state.cell_phone;
        client.home_phone = this.state.home_phone;
        client.email = this.state.email;
        client.occupation = this.state.occupation;
        client.image_base64 = this.state.image_base64;
        client.image_path = this.state.image_path;

        client.save().then(pid => {
            this.props.navigation.navigate('ClientProfile', { 'pid': pid });
            this.setState({ loading: false });
        }).catch((errorMessage) => {
            alert(errorMessage);
            this.setState({ loading: false });
        });
        //}
    }

    _launchCamera = async () => {
        const { Permissions } = Expo;
        const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
        if (cameraPermission === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.5,
            });

            console.log(result);

            if (!result.cancelled) {
                this.setState({ image_base64: result.base64 });
                this.setState({ image_path: result.uri });
            }
        }
    }

    _launchPhotoGallery = async () => {
        const { Permissions } = Expo;
        const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraRollPermission === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.5,
            });

            console.log(result);

            if (!result.cancelled) {
                this.setState({ image_base64: result.base64 });
                this.setState({ image_path: result.uri });
            }
        }
    }

    _pickImage = async () => {


        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Cancel', 'Take Photo...', 'Choose from Library...'],
            cancelButtonIndex: 0,
        },
            (buttonIndex) => {



                switch (buttonIndex) {
                    case 1:
                        this._launchCamera();
                        break;
                    case 2:
                        this._launchPhotoGallery();
                        break;
                }
            });


    };
}

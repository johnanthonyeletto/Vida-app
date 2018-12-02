import React, { Component } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import NoteListItem from '../../components/NoteListItem';
import Client from '../../models/Client';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import LoadingOverlay from '../../components/loadingOverlay';


let _this = null;

export default class AllNotesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notes',
        headerRight: (
            <TouchableOpacity onPress={() => { navigation.navigate('NoteEntry', { pid: _this.state.pid }) }}>
                <Ionicons name="ios-add" size={32} style={{ marginRight: 15 }} color={Colors.blue} />
            </TouchableOpacity>
        ),
    });


    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    async componentDidMount() {
        _this = this;

        const { navigation } = this.props;
        const pid = navigation.getParam('pid', 'NONE');

        if (pid != 'NONE') {
            this.setState({ pid });
        }

        var client = new Client();
        client.pid = pid;
        client.getNotes().then(notes => {
            this.setState({ 'notes': notes });
        });
    }

    render() {
        return (
            <ScrollContainer
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}
            >
                {this.notesList()}
                {
                    this.state.loading &&
                    <LoadingOverlay />
                }
            </ScrollContainer>
        );
    }

    deleteNote(note_id) {
        this.setState({ loading: true });
        var client = new Client();
        client.pid = this.state.pid;

        client.deleteNote(note_id).then(response => {
            this.setState({ loading: false });
            this._onRefresh();
        });
    }

    notesList() {


        return this.state.notes.map((note, i) => {
            return (
                <Swipeout
                    right={[{
                        type: 'delete',
                        text: 'Delete',
                        backgroundColor: Colors.red,
                        // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                        onPress: () => { this.deleteNote(note.note_id) }
                    }]}
                    autoClose={true}
                    backgroundColor='transparent'
                    style={{ padding: 5, flex: 1, }}
                    key={i}
                >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('NoteEntry', { 'pid': this.state.pid, 'note': note }) }} key={i}>
                        <NoteListItem note={note} />
                    </TouchableOpacity>

                </Swipeout>
            )
        });
    }
}

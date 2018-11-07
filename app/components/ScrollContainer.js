import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

export default class ScrollContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={[styles.container, this.props.style]} refreshControl={this.props.refreshControl} keyboardShouldPersistTaps='handled' >
                {this.props.children}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        minHeight: '100%',
        padding: 10
    }
});
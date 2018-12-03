import React from 'react';
import {
    ScrollView,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import Colors from '../constants/Colors';

export default class ScrollContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView style={[styles.container, this.props.style]} refreshControl={this.props.refreshControl} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                    {this.props.children}
                </ScrollView>
            </SafeAreaView>
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
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

export default class ListSeparator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.seperator}>
                <Text style={styles.seperatorText}>{this.props.children}</Text>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    seperator: {
        //backgroundColor: Colors.lightBlue,
        padding: 5,
    },
    seperatorText: {
        fontSize: 20,
        color: Colors.blue,
        fontWeight: '400',
    }
});
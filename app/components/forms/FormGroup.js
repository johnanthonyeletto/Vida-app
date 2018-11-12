import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.formGroupContainer}>

        <View style={styles.labelContainer}>
          <Text>{this.props.placeholder}:</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            placeholder={this.props.placeholder}
            style={styles.input}
            keyboardType={this.props.keyboardType}
            autoCapitalize={this.props.autoCapitalize}
            autoCorrect={this.props.autoCorrect}
            clearButtonMode={'while-editing'}
            maxLength={this.props.maxLength}
            multiline={this.props.multiline}
            returnKeyType={this.props.returnKeyType}
            secureTextEntry={this.props.secureTextEntry}
            textContentType={this.props.textContentType}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formGroupContainer: {
    flexDirection: 'row'
  },
  labelContainer: {
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '25%',
    paddingLeft: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    height: 50,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  }
});

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, Keyboard, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export default class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
    };
  }

  render() {
    var valueIndex = (this.props.options != null && this.props.value != null) ? this.props.options.findIndex(p => p.value == this.props.value) : 0;


    return (
      <View>
        <View style={styles.formGroupContainer}>

          <View style={styles.labelContainer}>
            <Text>{this.props.placeholder}:</Text>
          </View>

          <View style={styles.inputContainer}>
            {this.props.type != "picker" &&
              <TextInput
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                placeholder={this.props.placeholder}
                placeholderTextColor={Colors.grey}
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
                maxLength={this.props.maxLength}
                onFocus={() => { this._textInputFocus() }}
                onBlur={() => { this._textInputBlur() }}
              />
            }

            {this.props.type == "picker" &&
              <TouchableOpacity onPress={() => { this._textInputFocus() }} style={styles.input}>
                <Text
                //onChangeText={this.props.onChangeText}
                //value={this.props.value}
                >
                  {/* {(this.state.selected != null) ? this.state.selected : this.props.placeholder} */}
                  {(this.props.options != null) ? this.props.options[valueIndex].label : this.props.placeholder}
                </Text>
              </TouchableOpacity>
            }

          </View>

        </View>
        {
          (this.props.type == "picker" && this.state.showPicker && this.props.options) &&
          <Picker selectedValue={this.props.value} onValueChange={(value, index) => { this.props.onChangeText(value); this.setState({ selected: this.props.options[index].label }) }}>
            {this.props.options.map((option, i) => {
              return (
                <Picker.Item key={option.value}
                  label={option.label} value={option.value}
                />
              );
            })}
          </Picker>
        }
      </View>
    );
  }
  _textInputFocus() {
    if (this.props.type == "picker") {
      this.setState({ showPicker: !this.state.showPicker });
    }
  }

  _textInputBlur() {
    if (this.props.type == "picker") {
      this.setState({ showPicker: false });
    }
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
    justifyContent: 'center',
  }
});

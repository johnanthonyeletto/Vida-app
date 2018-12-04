import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, DatePickerIOS, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    newDate.setHours(newDate.getHours() - 5);
    var timestamp = this._toTimestamp(newDate);
    this.props.onChangeText(timestamp);
  }

  render() {
    var valueIndex = (this.props.options != null && this.props.value != null) ? this.props.options.findIndex(p => p.value == this.props.value) : 0;

    var date;
    if (this.props.type == "date" && this.props.value) {
      date = this._parseTimestamp(this.props.value);
    }

    return (
      <View>
        <View style={styles.formGroupContainer}>

          <View style={styles.labelContainer}>
            <Text>{this.props.placeholder}:</Text>
          </View>

          <View style={styles.inputContainer}>
            {(this.props.type != "picker" && this.props.type != "date") &&
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

            {(this.props.type == "picker" || this.props.type == "date") &&
              <TouchableOpacity onPress={() => { this._textInputFocus() }} style={styles.input}>
                {(this.props.type == "picker") &&
                  <Text>
                    {(this.props.options != null) ? this.props.options[valueIndex].label : this.props.placeholder}
                  </Text>
                }
                {(this.props.type == "date" && this.props.value) &&
                  <Text>
                    {
                      Months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + "  " + ((date.getHours() + 11) % 12 + 1) + ":" + date.getMinutes() + " " + ((date.getHours() < 12) ? "AM" : "PM")
                    }
                  </Text>
                }

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


        {(this.props.type == "date" && this.state.showPicker == true && this.props.value != null) &&
          <DatePickerIOS
            mode="datetime"
            date={this._parseTimestamp(this.props.value)}
            onDateChange={this.setDate}
            minuteInterval={5}
          />
        }
      </View>
    );
  }
  _parseTimestamp(timestamp) {
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = timestamp.split(/[- :]/);
    // Apply each element to the Date function
    return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
  }

  _toTimestamp(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ').toString();
  }

  _textInputFocus() {
    if (this.props.type == "picker" || this.props.type == "date") {
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

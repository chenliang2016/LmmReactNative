import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

import LmmInput from './LmmInput';
import LmmSelect from './LmmSelect';
import LmmInputMutiLine from './LmmInputMutiLine';

import LmmKeyboardAvoidingView from './LmmKeyboardAvoidingView'

export default class LmmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      values: {},
    };
  }

  onChange = (key, value) => {
    console.log('test');
    let values = Object.assign({}, values, { key: value });
    this.setState({ values });
    this.props.onChange(values);
  };

  _renderItem = () => {
    return (
      <View style={styles.container}>
        {this.props.formItem.map(item => {
          return (
            <View style={styles.itemContainer}>
              {item.type == 'input' ? (
                <LmmInput
                  title={item.title}
                  key={item.key}
                  subTitle={item.subTitle}
                  inputType={item.inputType}
                  onChange={value => {
                    this.onChange('test', value);
                  }}
                />
              ) : null}
              {item.type == 'select' ? (
                <LmmSelect
                  title={item.title}
                  key={item.key}
                  subTitle={item.subTitle}
                  inputType={item.inputType}
                  items = {item.selectItems}
                  onChange={value => {
                    this.onChange('test', value);
                  }}
                />
              ) : null}
              {item.type == 'mutiinput' ? (
                <LmmInputMutiLine
                  title={item.title}
                  key={item.key}
                  subTitle={item.subTitle}
                  inputType={item.inputType}
                  onChange={value => {
                    this.onChange('test', value);
                  }}
                />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return <LmmKeyboardAvoidingView>{this._renderItem()}</LmmKeyboardAvoidingView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    padding: 10,
    backgroundColor:"white",
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

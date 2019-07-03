import * as React from 'react';
import CheckBox from 'react-native-checkbox';

export default class LmmCheckBox extends React.Component {
    render(){
        return <CheckBox
            label={this.props.label}
            checked={this.props.checked}
            checkedImage = {this.props.isSquare?require('../image/checked_sq.png'):require('../image/checked.png')}
            uncheckedImage = {this.props.isSquare?require('../image/uncheck_sq.png'):require('../image/uncheck.png')}
            onChange={(checked) => this.props.onChange(checked)}
        />

    }
}
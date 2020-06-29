import React, { Component } from 'react'

class CustomInput extends Component {
    render() {
        const { input: {value, onChange } } = this.props;
        return (
            <div className = "form-group">
                <label htmlFor = { this.props.id } >{ this.props.label }</label>
                <input
                    name = {this.props.name}
                    type = {this.props.type}
                    id = {this.props.id}
                    placeholder = {this.props.placeholder}
                    className = "form-control"
                    value = { value }
                    onChange = { onChange }
                />
            </div>
        );
    }
}

export default CustomInput

import React, { Component } from 'react'

export default class Options extends Component {

    render() {
        return (
            <div className="options">
                {this.props.foaasOptions.map((option, i) => (
                    <div className="option" onClick={this.props.updateFields.bind(this, option.fields, option.url)} key={i}>
                        {option.name}
                    </div>
                ))}
            </div>
        )
    }

}

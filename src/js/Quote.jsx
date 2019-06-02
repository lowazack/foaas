import React, { Component } from 'react'

export default class Quote extends Component {
    render() {
        return (
            <div className="quote">
                <div onClick={this.props.hideQuote.bind(this)} className="quote__container">
                    <div className="quote__message">
                        {this.props.message}
                    </div>
                    <div className="quote__subtitle">
                        {this.props.subtitle}
                    </div>
                </div>
            </div>
        )
    }
}

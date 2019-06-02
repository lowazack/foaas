import React, { Component } from 'react'

const initialState = {

};

export default class Form extends Component {

    state = initialState


    fieldUpdated = (field, event) => {
        this.setState({[field]: event.target.value});
    }

    getInputValue = (field) => {
        if(this.state[field]) return this.state[field];
        return "";
    }

    clearFields = () => {
        let stateObject = {
            receivedInputs: this.state.receivedInputs,
            clearFields: false,
        }
        this.props.formInputs.forEach(input => {
            stateObject[input.field] = "" 
        });
        this.setState(stateObject);
    } 

    componentDidUpdate() {
        if(this.state.clearFields){
            this.clearFields();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(prevState.receivedInputs !== nextProps)
        {            
            return {
                receivedInputs: nextProps,
                clearFields: true
            };
        }
        return prevState;
    }
    

    render() {
        return (
            <div className={this.props.formClass}>
                {this.props.formInputs.map((input, i) => (
                    <input
                        key={i}
                        type="text"
                        value={this.getInputValue(input.field)}
                        placeholder={input.name}
                        onChange={(e) => this.fieldUpdated(input.field, e)}/>
                ))}
                <button onClick={this.props.submitForm.bind(this, this.state)}>Lets GO</button>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios'
import '../css/App.css';
import Options from './Options';
import Form from './Form';
import Quote from './Quote';

class App extends Component {

  state = {
    foaasOptions: [],
    foaasFields: [],
    formClass: "form",
    showQuote: false,
    quoteMessage: "",
    quoteSubtitle: ""
  }
  
  updateFields = (fields, url) => {
    this.setState({
      foaasFields: fields,
      activeUrl: url
    });

    this.openForm();
  }

  hideQuote = () => {
    this.setState({
      formClass: "form",
      showQuote: false
    })
  }

  openForm = () => {
      this.setState({
        formClass: "form form--open",
      })
  }

  submitForm = (formState) => {
    let requestUrl = `https://www.foaas.com${this.state.activeUrl}`;
    this.state.foaasFields.forEach(field => {
      requestUrl = requestUrl.replace(`:${field.field}`, formState[field.field]);
    });
  
    axios
    .get(requestUrl)
    .then((res) => this.handleRespnse(res.data));
  }

  handleRespnse = response => {
    this.setState({
      showQuote: true,
      quoteMessage: response.message,
      quoteSubtitle: response.subtitle
    })
  }

  componentWillMount() {
    axios
			.get('https://www.foaas.com/operations')
			.then((res) => this.setState({ foaasOptions: res.data }));
  }



  render() {
    if(this.state.showQuote) {
      return (
        <Quote hideQuote={this.hideQuote} message={this.state.quoteMessage} subtitle={this.state.quoteSubtitle}/>
      )
    }
    else {
      return (
        <div className="list">
          <Options updateFields={this.updateFields} foaasOptions={this.state.foaasOptions}/>
          <Form formClass={this.state.formClass} submitForm={this.submitForm} formInputs={this.state.foaasFields}  />
        </div>
      );
    }
  
  }
}

export default App;

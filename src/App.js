import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Tag from './components/Tag.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {inputList: [], inputValue: '', helper: false, uniqueIdGen: 0};
    this.addTag = this.addTag.bind(this);
    this.deleteSaidTag = this.deleteSaidTag.bind(this);
  }

  deleteSaidTag(name) {  
    const temp = this.state.inputList.filter(function(item) { 
        return item.props.name !== name
    })
    this.setState ({
      inputList: temp
    })
  }

  tagExists(tagName) {
    const inputList = this.state.inputList;
    for(let i=0; i<inputList.length; i++)
    {
      if(inputList[i].props.name.toLowerCase()===tagName.toLowerCase()) {
        return true;
      }
    }
  }

  addTag(event) {
    const inputList = this.state.inputList;
    const inputValue = this.state.inputValue;
    const uniqueIdGen = this.state.uniqueIdGen;
    if(this.refs.tagInput.value==='' || inputList.length>9) {
      this.setState({
        helper: true
      })
    }
    else {
      this.refs.tagInput.value='';
      if(!this.tagExists(inputValue)) {
        this.setState({
        uniqueIdGen: uniqueIdGen+1,
        inputList: inputList.concat(<Tag name={inputValue} key={uniqueIdGen} delete={this.deleteSaidTag}/>),
        helper: false
        });
      }
    }
  }

  inputListener = (e) => {
    this.setState({inputValue: e.target.value});
  }

  render() {
    return (
      <div className="app">

        <h1 className="title">What are your skills?</h1>
        <h2 className="subtitle">
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna 
          aliqua. Ut enim ad minim veniam, quis
        </h2>

        <label className="label">Your Skills (Upto 10)</label>
        { this.state.helper ? <p className="help has-text-danger">You dumb idiot enter something</p> : null }

        <div className="field has-addons">
          <div className="control is-expanded">
            <input className="input" type="text" value={this.inputValue} onChange={this.inputListener} ref="tagInput"/>
          </div>
          <div className="control">
            <a className="button is-info" onClick={this.addTag}>Add</a>
          </div>
        </div>

        <div className="magicz">
          {this.state.inputList}
        </div>

        <a className="button is-info continue">Continue</a>

      </div>
    );
  }
}

export default App;

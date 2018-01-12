import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Tag from './components/Tag.js';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({tagMeta}) =>
  <Tag name={tagMeta.name} index={tagMeta.key}/>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      { items.map((item, index) => (
        <SortableItem index={index} key={item.key} tagMeta={item}/>
      ))
      }
    </ul>
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputList: [], inputValue: '', helper: false, uniqueIdGen: 0};
    this.addTag = this.addTag.bind(this);
    this.deleteSaidTag = this.deleteSaidTag.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  deleteSaidTag(name) {  
    const temp = this.state.inputList.filter(function(item) { 
        return item.name !== name
    })
    this.setState ({
      inputList: temp
    })
  }

  tagExists(tagName) {
    const inputList = this.state.inputList;
    for(let i=0; i<inputList.length; i++)
    {
      if(inputList[i].name.toLowerCase()===tagName.toLowerCase()) {
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
        const concattedInputList = inputList.concat({"name": inputValue,"key": uniqueIdGen});
        this.setState({
        uniqueIdGen: uniqueIdGen+1,
        inputList: concattedInputList,
        helper: false
        });
      }
    }
  }

  inputListener = (e) => {
    this.setState({inputValue: e.target.value});
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      inputList: arrayMove(this.state.inputList, oldIndex, newIndex),
    });
  };

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
          { this.state.inputList.map(function(tagMeta) {
              return (<Tag name={tagMeta.name} key={tagMeta.key} delete={this.deleteSaidTag}/>)
          }, this) }
        </div>

        <a className="button is-info continue">Continue</a>

        <SortableList items={this.state.inputList} onSortEnd={this.onSortEnd} axis="x" />

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class Tag extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.name, id: this.props.id};
  }

  render() {
    return (
          <span className="tag is-success is-unselectable">
            {this.state.name}
            <button className="delete is-small"></button>
          </span>
    );
  }
}

export default Tag;
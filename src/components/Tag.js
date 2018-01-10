import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class Tag extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.name, id: this.props.id};
  }

  render() {
    return (
          <span className="tag is-primary">
            {this.state.name}
            <button className="delete is-small" onClick={this.props.delete.bind(null, this.state.name)}></button>
          </span>
    );
  }
}

export default Tag;
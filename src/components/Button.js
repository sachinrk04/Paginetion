import React, { Component } from 'react'
import './Button.css';

class Button extends Component {
  render() {
    return (
      <div className="Button">
        <button
            onClick={this.props.onClick}
            value={this.props.name}
        >
        {this.props.name}
        </button>
      </div>
    );
  }
}

export default Button;
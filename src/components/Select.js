import React, { Component } from 'react'

class Select extends Component {
    state = {
        dropDown: false
    }
  render() {
    return (
      <React.Fragment>
      <div onChange={this.props.onClick}>
          <select >
              {
                  this.props.name.map(number => {
                      return (
                        <option key={number} value={number} >{number}</option>
                      )
                  })
              }
          </select>
        </div>
      </React.Fragment>
    )
  }
}

export default Select;

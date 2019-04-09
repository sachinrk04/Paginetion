import React, { Component } from 'react'

class ContactData extends Component {
  render() {
    return (
      <div>
        <img src={this.props.avatar} alt="photo" />
        <div><strong>Name:</strong> {this.props.first_name} {this.props.last_name}</div>
      </div>
    )
  }
}

export default ContactData;
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Button from './components/Button';
import ContactData from './components/ContactData/ContactData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page:3,
      data: [],
      loading: false
    }

    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }
   
  getData = () => {
    const { page, per_page } = this.state;
    this.setState({
      data: [],
      loading: true
    })
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data.data,
          loading: false,
        })
      })
      .catch(e => {
        console.log(e);
        this.setState({
          data: [],
          loading: false
        })
      });
  }

  btnClick = (e) => {
    const page = e.target.value;
    console.log(page);
    this.setState({ 
      page
    })
    this.getData()
  }

  componentDidMount() {
    this.getData();
  } 

  render() {
    if (this.state.loading) {
      return (
        <p>loading...</p>
      )
    }
    return (
      <div className="App">
        <div className="App-list">
          <ul>
          {
            this.state.data.map(item => {
              return (
                <li key={item.id} >
                  <ContactData {...item} />
                </li>
              )
            })
          }
          </ul>
        </div>
        <div className="App-button">
        <button name="1" onClick={this.btnClick}>|<i className="fas fa-angle-double-left"></i></button>
        <Button name="<<" onClick={this.btnClick} />
        <Button name="1" onClick={this.btnClick} />
        <Button name="2" onClick={this.btnClick} />
        <Button name="3" onClick={this.btnClick} />
        <Button name=">>" onClick={this.btnClick} />
        <button name="5" onClick={this.btnClick}><i className="fas fa-angle-double-right">|</i></button>
        </div>
      </div>
    );
  }
}

export default App;

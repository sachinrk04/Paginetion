import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Button from './components/Button';
import ContactData from './components/ContactData/ContactData';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page:3,
      data: [], 
      loading: false,
      totalPages: ''
    }

    this.getData = this.getData.bind(this);
    // this.btnClick = this.btnClick.bind(this);
  }
   
  getData = () => {
    const { page, per_page,total_pages } = this.state;
    this.setState({
      data: [],
      loading: true
    })
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}&total_pages=${total_pages}`)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data.data,
          totalPages: response.data,
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

  onChange = (e) => {
    console.log("Number : " , e.target.value);
    this.setState({
      page: e.target.value
    })
  }

  loadMore = (e) => {
    const page = e.target.value;
    console.log("Select Number :", page);
    this.setState(prevState => ({
      page
    }),this.getData)
  }

  handlePrevClick = () => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }),this.getData)
  }

  handleNextClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }),this.getData)
  }

  handleLastClick = () => {
    this.setState(prevState => ({
      page: 4
    }),this.getData)
  }

  handleFirstClick = () => {
    this.setState(prevState => ({
      page: 1
    }),this.getData)
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

    let pageNumbers = [];
    for (let i = 1; i <=this.state.totalPages.total_pages; i++) {
      pageNumbers.push(i);
    }

    let evenNumbers = [];
    let oddNumbers = [];
    for (let i = 1; i <=this.state.totalPages.total_pages; i++) {
      if (i%2 === 0) {
        let even = i;
        evenNumbers.push(even);
      } 
      else {
        let odd = i;
        oddNumbers.push(odd);
      }
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
        <button onClick={this.handleFirstClick}>|<i className="fas fa-angle-double-left"></i></button>
        <Button name="<<" onClick={this.handlePrevClick} />
        {
          pageNumbers.map(pageNumber => {
            return (
              <Button key={pageNumber} name={pageNumber} onClick={this.loadMore} />
            )
          })
        }
        <Select name={oddNumbers} onClick={this.loadMore} change={this.onChange} />
        <Select name={evenNumbers} onClick={this.loadMore} change={this.onChange} />
        <Button name=">>" onClick={this.handleNextClick} />
        <button onClick={this.handleLastClick}><i className="fas fa-angle-double-right">|</i></button>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from './main/Home'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'

class App extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array,
  }


  render() {
    return (
      <Home />
    );
  }
}

export default App;

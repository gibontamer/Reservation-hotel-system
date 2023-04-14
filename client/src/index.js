
import React from 'react'
import * as ReactDOM from 'react-dom';
import './App.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App
      className="App"
    />
  </BrowserRouter>,
  document.getElementById('root')
)

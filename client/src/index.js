import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import image from './components/img/cryptocurrency.jpg';


ReactDOM.render(<App />, document.getElementById('root'));

var styles = {
    color:'black',
    backgroundImage: 'url('+image+')'
    };
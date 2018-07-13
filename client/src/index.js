import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import image from './components/img/cryptocurrency.jpg';
// import {stylesheet,
//         text,
//         view,
//         imagebackground
// }

ReactDOM.render(<App />, document.getElementById('root'));

var styles = {
    color:'black',
    backgroundImage: 'url('+image+')'
    };
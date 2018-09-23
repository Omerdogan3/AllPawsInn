import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.component';

window.onload = function(){
    ReactDOM.render(<App />, document.getElementById('app'));
};
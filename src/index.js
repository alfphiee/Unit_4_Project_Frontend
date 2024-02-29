import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';
import './interceptors/axios'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <App />
    </Router>
);

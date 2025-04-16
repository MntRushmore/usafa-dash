import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Make sure Tailwind styles are loaded

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
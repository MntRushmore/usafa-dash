import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx';  // Import your App.jsx file

const rootElement = document.getElementById('app');  // The div in index.html
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);  // Render the App component into the DOM
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/style.scss';

const App = () => (
    <div>
        <h1>WP Client Management</h1>
        <p>Welcome to the React app integrated with WordPress!</p>
    </div>
);

const rootElement = document.getElementById('wp-client-management-root');
ReactDOM.render(<App />, rootElement);
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/tailwind.scss';
import './Styles/style.scss';
import AppLayout from './Components/Layouts/AppLayout';


const App = () => {
    return (
        <AppLayout>
            <span className='text-red-500 text-4xl'>Frontend</span>
        </AppLayout>
    )
};

const rootElement = document.getElementById('wp-client-management-root');
ReactDOM.render(<App />, rootElement);
import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import Navbar from './navbar/Navbar';


const App: React.FC = () => {
    return (
        <Provider store={ store }>
            <div className="App">
                <Navbar />
            </div>
        </Provider>
    );
};

export default App;

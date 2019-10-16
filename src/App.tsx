import React from 'react';
import GeneralInfo from './components/general-info/GeneralInfo'
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="view-container container">
                <div className="view-frame">
                    <h2 className="title-one">Order</h2>
                </div>

                <GeneralInfo title="Your Order" />
            </div>
        </div>
    );
}

export default App;

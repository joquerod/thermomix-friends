import React from 'react';
import ConsultantMap from './components/ConsultantMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ 
        padding: '20px', 
        backgroundColor: '#282c34', 
        color: 'white',
        marginBottom: '20px'
      }}>
        <h1>Thermomix Friends Locator</h1>
        <p>Find Thermomix consultants near you across the United States</p>
      </header>
      <main style={{ padding: '0 20px' }}>
        <ConsultantMap />
      </main>
    </div>
  );
}

export default App;

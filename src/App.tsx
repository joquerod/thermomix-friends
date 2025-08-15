import React from 'react';
import ConsultantMap from './components/ConsultantMap';
import './App.css';

function App() {
  const headerStyle: React.CSSProperties = {
    padding: '15px 10px',
    backgroundColor: '#282c34',
    color: 'white',
    marginBottom: '10px',
    textAlign: 'center'
  };

  const h1Style: React.CSSProperties = {
    margin: '0 0 8px 0',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 'bold'
  };

  const pStyle: React.CSSProperties = {
    margin: '0',
    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
    opacity: 0.9
  };

  const mainStyle: React.CSSProperties = {
    padding: '0 10px',
    maxWidth: '100vw',
    overflow: 'hidden'
  };

  return (
    <div className="App">
      <header style={headerStyle}>
        <h1 style={h1Style}>Thermomix Friends Locator</h1>
        <p style={pStyle}>Find Thermomix consultants near you across the United States</p>
      </header>
      <main style={mainStyle}>
        <ConsultantMap />
      </main>
    </div>
  );
}

export default App;

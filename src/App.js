import React from 'react';
import PicoPlacaForm from './components/PicoPlacaForm';
import 'primereact/resources/themes/lara-dark-blue/theme.css';  
import 'primereact/resources/primereact.min.css';           
import 'primeicons/primeicons.css';                       
import './App.css';  

function App() {
  return (
    <div className="app-container">
      <PicoPlacaForm />
    </div>
  );
}

export default App;

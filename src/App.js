import React from 'react';
import PicoPlacaForm from './components/PicoPlacaForm';
import 'primereact/resources/themes/saga-blue/theme.css';  // Cambia el tema si prefieres otro
import 'primereact/resources/primereact.min.css';           // Estilos de PrimeReact
import 'primeicons/primeicons.css';                         // Iconos de PrimeReact
import './App.css';  // Estilos personalizados

function App() {
  return (
    <div className="app-container">
      <PicoPlacaForm />
    </div>
  );
}

export default App;

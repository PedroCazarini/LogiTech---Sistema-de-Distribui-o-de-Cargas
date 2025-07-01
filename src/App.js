import React from 'react';
import DistribuirPedidos from './components/DistribuirPedidos';
import NaoAlocados from './components/NaoAlocados';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Logitech - Distribuição de Cargas</h1>
      <DistribuirPedidos />
      <NaoAlocados />
    </div>
  );
}

export default App;

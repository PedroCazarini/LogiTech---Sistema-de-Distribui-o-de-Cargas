import React, { useState } from 'react';
import VerDistribuicao from './VerDistribuicao';

function DistribuirPedidos() {
  const [pedidos, setPedidos] = useState('');
  const [resposta, setResposta] = useState(null);
  const [atualizar, setAtualizar] = useState(false);

  const handleDistribuir = async () => {
    try {
      const listaPedidos = JSON.parse(pedidos); // <-- Tenta converter o texto em JSON
      console.log("JSON válido:", listaPedidos); // <-- Mostra no console

      const response = await fetch('http://localhost:5000/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pedidos: listaPedidos })
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar pedidos.');
      }

      const data = await response.json();
      setResposta(data);

      const distribResponse = await fetch('http://localhost:5000/distribuir', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!distribResponse.ok) {
        const erroTexto = await distribResponse.text();
        console.error('Erro na distribuição:', erroTexto);
        throw new Error('Erro na distribuição');
      }

      alert('Distribuição feita com sucesso!');
      setAtualizar(prev => !prev);
    } catch (error) {
      console.error("Erro ao distribuir pedidos:", error.message);
      alert('Erro ao enviar pedidos! Verifique o formato JSON e se a API está ativa.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Distribuir Pedidos</h2>
      <textarea
        rows="10"
        cols="60"
        placeholder='[
  { "id": 1, "peso": 100 },
  { "id": 2, "peso": 150 }
]'
        value={pedidos}
        onChange={(e) => setPedidos(e.target.value)}
      />
      <br />
      <button onClick={handleDistribuir}>Enviar para distribuição</button>
      {resposta && <p>Pedidos enviados com sucesso!</p>}
      <VerDistribuicao atualizar={atualizar} />
    </div>
  );
}

export default DistribuirPedidos;

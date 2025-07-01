import React, { useEffect, useState } from 'react';

function NaoAlocados() {
  const [naoAlocados, setNaoAlocados] = useState([]);

  useEffect(() => {
    async function fetchNaoAlocados() {
      try {
        const response = await fetch('http://localhost:5000/nao_alocados');
        if (!response.ok) throw new Error('Erro na resposta da API');
        
        const data = await response.json();
        setNaoAlocados(data);
      } catch (error) {
        console.error('Erro ao buscar não alocados:', error);
      }
    }

    fetchNaoAlocados();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pedidos Não Alocados</h2>
      {naoAlocados.length === 0 ? (
        <p>Nenhum pedido não alocado.</p>
      ) : (
        <ul>
          {naoAlocados.map(({ id, peso }, index) => (
            <li key={index}>
              ID: {id} - Peso: {peso}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NaoAlocados;

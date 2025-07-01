import React, { useEffect, useState } from 'react';

function VerDistribuicao({ atualizar }) {
  const [caminhoes, setCaminhoes] = useState([]);
  const [naoAlocados, setNaoAlocados] = useState([]);

  useEffect(() => {
    async function fetchDistribuicao() {
      try {
        const response = await fetch('http://localhost:5000/distribuicao');
        if (!response.ok) throw new Error('Erro ao buscar distribuição');
        const data = await response.json();
        setCaminhoes(data);
      } catch (error) {
        console.error('Erro ao buscar distribuição:', error);
      }
    }

    async function fetchNaoAlocados() {
      try {
        const response = await fetch('http://localhost:5000/nao_alocados');
        if (!response.ok) throw new Error('Erro ao buscar não alocados');
        const data = await response.json();
        setNaoAlocados(data);
      } catch (error) {
        console.error('Erro ao buscar não alocados:', error);
      }
    }

    fetchDistribuicao();
    fetchNaoAlocados();
  }, [atualizar]);

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ borderBottom: '2px solid #222' }}>Distribuição nos Caminhões</h2>

      {caminhoes.length === 0 ? (
        <p style={{ color: '#999' }}>Nenhum caminhão distribuído ainda.</p>
      ) : (
        <>
          <p><strong>Total de caminhões:</strong> {caminhoes.length}</p>

          {caminhoes.map((caminhao, index) => (
            <div key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ marginBottom: '10px' }}>🚛 Caminhão {index + 1}</h3>
              <p><strong>Peso total:</strong> {caminhao.peso_total} kg</p>
              <p><strong>Total de pedidos:</strong> {caminhao.pedidos.length}</p>

              <ul style={{ marginTop: '10px' }}>
                {caminhao.pedidos.map((pedidos, i) => (
                  <li key={i}>📦 Pedido ID: {pedidos.id} - Peso: {pedidos.peso} kg</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      <h3 style={{ marginTop: '30px' }}>Pedidos Não Alocados</h3>
      {naoAlocados.length === 0 ? (
        <p style={{ color: '#999' }}>Nenhum pedido não alocado.</p>
      ) : (
        <ul>
          {naoAlocados.map((pedido, index) => (
            <li key={index}>🧱 <strong>ID:</strong> {pedido.id} - <strong>Peso:</strong> {pedido.peso}kg {pedido.motivo && `(${pedido.motivo})`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VerDistribuicao;

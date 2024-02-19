import React, { useState, useEffect } from 'react';

function KeyEventsExample() {
  const [key, setKey] = useState('');

  // Método para lidar com o evento de pressionar uma tecla
  const handleKeyDown = (event) => {
    // Atualiza o estado com a tecla pressionada
    setKey(event.key);
  }

  // Adiciona o ouvinte de evento quando o componente é montado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []); // O segundo argumento vazio [] garante que o useEffect será executado apenas uma vez, após a montagem do componente

  return (
    <div>
      <h1>Pressione uma tecla</h1>
      <p>Última tecla pressionada: {key}</p>
    </div>
  );
}

export default KeyEventsExample;
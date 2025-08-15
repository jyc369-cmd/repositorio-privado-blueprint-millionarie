"use client";

import { useState, useEffect, useCallback } from 'react';

// 0 = caminho, 1 = parede, 'S' = início, 'E' = fim
const mazeLayout = [
  ['S', 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 'E'],
];

const LabyrinthGame = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [win, setWin] = useState(false);

  const resetGame = useCallback(() => {
    // Encontra a posição inicial 'S'
    for (let y = 0; y < mazeLayout.length; y++) {
      for (let x = 0; x < mazeLayout[y].length; x++) {
        if (mazeLayout[y][x] === 'S') {
          setPlayerPosition({ x, y });
          break;
        }
      }
    }
    setWin(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (win) return;

    let { x, y } = playerPosition;
    
    switch (e.key) {
      case 'ArrowUp':
        y--;
        break;
      case 'ArrowDown':
        y++;
        break;
      case 'ArrowLeft':
        x--;
        break;
      case 'ArrowRight':
        x++;
        break;
      default:
        return;
    }

    // Verifica se o movimento é válido
    if (
      y >= 0 && y < mazeLayout.length &&
      x >= 0 && x < mazeLayout[y].length &&
      mazeLayout[y][x] !== 1
    ) {
      setPlayerPosition({ x, y });

      // Verifica se venceu
      if (mazeLayout[y][x] === 'E') {
        setWin(true);
      }
    }
  }, [playerPosition, win]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const getCellContent = (cell: string | number, x: number, y: number) => {
    if (playerPosition.x === x && playerPosition.y === y) return '😀';
    if (cell === 'E') return '🏁';
    if (cell === 'S') return ''; // O jogador começa aqui
    return '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Jogo do Labirinto</h2>
      <p>Use as setas do teclado para chegar à bandeira!</p>
      <div style={{ border: '2px solid black' }}>
        {mazeLayout.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: cell === 1 ? 'black' : 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                }}
              >
                {getCellContent(cell, x, y)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {win && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Você encontrou a saída! Parabéns!</h2>
          <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default LabyrinthGame;

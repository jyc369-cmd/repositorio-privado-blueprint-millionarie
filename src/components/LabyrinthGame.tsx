"use client";

import { useState, useEffect, useCallback } from 'react';

// Layouts dos Labirintos
const mazeLayouts = {
  nivel1: [
    ['S', 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 'E'],
  ],
  nivel2: [
    ['S', 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 'E'],
  ],
  nivel3: [
    ['S', 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 'E', 0],
  ],
};

type Level = keyof typeof mazeLayouts;

const LabyrinthGame = () => {
  const [level, setLevel] = useState<Level>('nivel1');
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const mazeLayout = mazeLayouts[level];

  const resetGame = useCallback(() => {
    for (let y = 0; y < mazeLayout.length; y++) {
      for (let x = 0; x < mazeLayout[y].length; x++) {
        if (mazeLayout[y][x] === 'S') {
          setPlayerPosition({ x, y });
          break;
        }
      }
    }
    setWin(false);
    setGameStarted(true);
  }, [mazeLayout]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (win || !gameStarted) return;

    let { x, y } = playerPosition;
    
    switch (e.key) {
      case 'ArrowUp': y--; break;
      case 'ArrowDown': y++; break;
      case 'ArrowLeft': x--; break;
      case 'ArrowRight': x++; break;
      default: return;
    }

    if (
      y >= 0 && y < mazeLayout.length &&
      x >= 0 && x < mazeLayout[y].length &&
      mazeLayout[y][x] !== 1
    ) {
      setPlayerPosition({ x, y });
      if (mazeLayout[y][x] === 'E') {
        setWin(true);
      }
    }
  }, [playerPosition, win, gameStarted, mazeLayout]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const getCellContent = (cell: string | number, x: number, y: number) => {
    if (playerPosition.x === x && playerPosition.y === y) return '😀';
    if (cell === 'E') return '🏁';
    return '';
  };
  
  if (!gameStarted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>Configurações do Jogo do Labirinto</h2>
        <div>
          <label>Nível: </label>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
            {Object.keys(mazeLayouts).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}>
          Iniciar Jogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Jogo do Labirinto</h2>
      <p>Use as setas do teclado para chegar à bandeira!</p>
      <div style={{ border: '3px solid #333', borderRadius: '8px', padding: '5px', backgroundColor: '#f0f0f0' }}>
        {mazeLayout.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: cell === 1 ? '#555' : '#eee',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.8rem',
                  border: '1px solid #ddd'
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
          <h2 style={{ color: 'green' }}>Você encontrou a saída! Parabéns!</h2>
          <button onClick={() => setGameStarted(false)} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default LabyrinthGame;

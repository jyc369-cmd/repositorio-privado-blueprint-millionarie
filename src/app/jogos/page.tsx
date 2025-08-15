"use client";

import { useState } from 'react';
import MemoryGame from '@/components/MemoryGame';
import LabyrinthGame from '@/components/LabyrinthGame';

export default function JogosPage() {
  const [selectedGame, setSelectedGame] = useState<'memory' | 'labyrinth' | null>(null);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Jogos Educativos</h1>
      
      {!selectedGame && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
          <button onClick={() => setSelectedGame('memory')} style={{ padding: '20px', fontSize: '1.5rem', cursor: 'pointer' }}>
            Jogo da Memória
          </button>
          <button onClick={() => setSelectedGame('labyrinth')} style={{ padding: '20px', fontSize: '1.5rem', cursor: 'pointer' }}>
            Jogo do Labirinto
          </button>
        </div>
      )}

      {selectedGame && (
        <button onClick={() => setSelectedGame(null)} style={{ marginBottom: '1rem' }}>
          Voltar para a seleção de jogos
        </button>
      )}

      {selectedGame === 'memory' && <MemoryGame />}
      {selectedGame === 'labyrinth' && <LabyrinthGame />}
    </div>
  );
}

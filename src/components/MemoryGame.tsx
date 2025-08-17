"use client";

import { useState, useEffect } from 'react';

// Temas do Jogo
const themes = {
  animais: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
  frutas: ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝'],
  veiculos: ['🚗', '🚕', ' автобус', '🚓', '🚑', '🚒', '🚐', '🚚'],
};

// Níveis de Dificuldade
const levels = {
  facil: { pairs: 6, columns: 4 },
  medio: { pairs: 8, columns: 4 },
  dificil: { pairs: 10, columns: 5 },
};

type Theme = keyof typeof themes;
type Level = keyof typeof levels;

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [theme, setTheme] = useState<Theme>('animais');
  const [level, setLevel] = useState<Level>('facil');
  const [gameStarted, setGameStarted] = useState(false);

  // Inicializa e embaralha o jogo
  const shuffleCards = () => {
    const selectedTheme = themes[theme];
    const { pairs } = levels[level];
    const gameEmojis = selectedTheme.slice(0, pairs);
    
    const shuffledCards = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));

    setCards(shuffledCards);
    setMoves(0);
    setFlippedCards([]);
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length < 2 && !cards.find(c => c.id === id)?.isFlipped) {
      const newCards = cards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      );
      setCards(newCards);
      setFlippedCards([...flippedCards, id]);
    }
  };

  // Lógica para checar se as cartas são iguais
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        const newCards = cards.map(card =>
          card.emoji === firstCard.emoji ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = cards.map(card =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1200);
      }
    }
  }, [flippedCards, cards, moves]);

  const allMatched = cards.length > 0 && cards.every(card => card.isMatched);

  if (!gameStarted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>Configurações do Jogo da Memória</h2>
        <div>
          <label>Tema: </label>
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            {Object.keys(themes).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label>Nível: </label>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
            {Object.keys(levels).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <button onClick={shuffleCards} style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}>
          Iniciar Jogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Jogo da Memória</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${levels[level].columns}, 100px)`, gap: '10px' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: card.isMatched ? '#90EE90' : '#6495ED',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2.5rem',
              cursor: card.isFlipped || card.isMatched ? 'default' : 'pointer',
              border: '3px solid #333',
              borderRadius: '12px',
              transform: card.isFlipped || card.isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.6s, background-color 0.3s',
              color: '#333',
            }}
          >
            <span style={{ visibility: card.isFlipped || card.isMatched ? 'visible' : 'hidden' }}>
              {card.emoji}
            </span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Movimentos: {moves}</p>
      {allMatched && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 style={{ color: 'green' }}>Parabéns, você venceu!</h2>
          <button onClick={() => setGameStarted(false)} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

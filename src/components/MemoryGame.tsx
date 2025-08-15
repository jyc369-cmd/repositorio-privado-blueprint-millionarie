"use client";

import { useState, useEffect } from 'react';

const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Inicializa e embaralha o jogo
  const shuffleCards = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setMoves(0);
    setFlippedCards([]);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (id: number) => {
    // Vira a carta
    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };
  
  // Lógica para checar se as cartas são iguais
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Cartas iguais
        const newCards = cards.map(card => 
          card.emoji === firstCard.emoji ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);
      } else {
        // Cartas diferentes
        setTimeout(() => {
          const newCards = cards.map(card => 
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, moves]);

  const allMatched = cards.every(card => card.isMatched);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Jogo da Memória</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => !card.isFlipped && flippedCards.length < 2 && handleCardClick(card.id)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: card.isFlipped || card.isMatched ? '#fff' : '#6495ED',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              cursor: 'pointer',
              border: '2px solid #333',
              borderRadius: '10px',
              transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.5s',
            }}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </div>
        ))}
      </div>
      <p>Movimentos: {moves}</p>
      {allMatched && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Parabéns, você venceu!</h2>
          <button onClick={shuffleCards} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

"use client";

import { useState } from 'react';
import PaintCanvas from '@/components/PaintCanvas'; // Importando o novo componente

// Dados de exemplo para os desenhos
const drawings = [
  { id: 1, title: 'Leão Amigável', imageUrl: 'https://via.placeholder.com/400/FFC107/FFFFFF?Text=Leao' },
  { id: 2, title: 'Macaco Brincalhão', imageUrl: 'https://via.placeholder.com/400/CDDC39/FFFFFF?Text=Macaco' },
  { id: 3, title: 'Elefante Elegante', imageUrl: 'https://via.placeholder.com/400/9E9E9E/FFFFFF?Text=Elefante' },
  { id: 4, title: 'Girafa Gigante', imageUrl: 'https://via.placeholder.com/400/FFEB3B/FFFFFF?Text=Girafa' },
  { id: 5, title: 'Tigre Tímido', imageUrl: 'https://via.placeholder.com/400/FF9800/FFFFFF?Text=Tigre' },
  { id: 6, title: 'Zebra Zen', imageUrl: 'https://via.placeholder.com/400/FFFFFF/000000?Text=Zebra' },
];

export default function DesenhosPage() {
  const [selectedDrawing, setSelectedDrawing] = useState<any>(null);

  if (selectedDrawing) {
    // Substituindo a imagem estática pelo componente de pintura
    return (
      <div>
        <h2>Pinte o {selectedDrawing.title}</h2>
        <PaintCanvas imageUrl={selectedDrawing.imageUrl} />
        <button onClick={() => setSelectedDrawing(null)} style={{ marginTop: '1rem' }}>Voltar para a galeria</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Desenhos do Dia</h1>
      <p>Escolha um desenho para colorir!</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {drawings.map((drawing) => (
          <div key={drawing.id} onClick={() => setSelectedDrawing(drawing)} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>
            <img src={drawing.imageUrl} alt={drawing.title} />
            <p>{drawing.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

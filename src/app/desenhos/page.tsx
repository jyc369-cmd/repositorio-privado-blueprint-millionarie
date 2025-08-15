"use client";

import { useState, useEffect } from 'react';
import PaintCanvas from '@/components/PaintCanvas';
import { db } from '@/lib/firebase'; // Importando a instância do Firestore
import { collection, getDocs } from 'firebase/firestore'; // Importando funções do Firestore

// Definindo um tipo para os nossos desenhos
interface Drawing {
  id: string;
  title: string;
  imageUrl: string;
}

export default function DesenhosPage() {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os desenhos do Firestore quando o componente montar
  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const drawingsCollection = collection(db, 'drawings');
        const drawingsSnapshot = await getDocs(drawingsCollection);
        const drawingsList = drawingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Drawing));
        setDrawings(drawingsList);
      } catch (err) {
        console.error("Erro ao buscar desenhos: ", err);
        setError('Não foi possível carregar os desenhos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, []);

  if (selectedDrawing) {
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
      {loading && <p>Carregando desenhos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {drawings.length > 0 ? (
            drawings.map((drawing) => (
              <div key={drawing.id} onClick={() => setSelectedDrawing(drawing)} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>
                <img src={drawing.imageUrl} alt={drawing.title} style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>
                <p>{drawing.title}</p>
              </div>
            ))
          ) : (
            <p>Nenhum desenho disponível hoje. Volte amanhã!</p>
          )}
        </div>
      )}
    </div>
  );
}

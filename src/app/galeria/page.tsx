"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

interface SavedDrawing {
  id: string;
  imageUrl: string;
  createdAt: any;
}

export default function GaleriaPage() {
  const [savedDrawings, setSavedDrawings] = useState<SavedDrawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedDrawings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const savedDrawingsCollection = collection(db, `users/${user.uid}/saved_drawings`);
        const q = query(savedDrawingsCollection, orderBy('createdAt', 'desc'));
        const drawingsSnapshot = await getDocs(q);
        const drawingsList = drawingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as SavedDrawing));
        setSavedDrawings(drawingsList);
      } catch (err) {
        console.error("Erro ao buscar desenhos salvos: ", err);
        setError('Não foi possível carregar os desenhos salvos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedDrawings();
  }, [user]);

  if (loading) {
    return <p>Carregando galeria...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Você precisa estar logado para ver sua galeria.</p>;
  }

  return (
    <div>
      <h1>Minha Galeria de Desenhos</h1>
      <p>Aqui estão todos os seus desenhos que você salvou!</p>
      {savedDrawings.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {savedDrawings.map((drawing) => (
            <div key={drawing.id} style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>
              <img src={drawing.imageUrl} alt="Desenho salvo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }}/>
            </div>
          ))}
        </div>
      ) : (
        <p>Você ainda não salvou nenhum desenho. Pinte um na seção "Desenhos do Dia" e salve para vê-lo aqui!</p>
      )}
    </div>
  );
}
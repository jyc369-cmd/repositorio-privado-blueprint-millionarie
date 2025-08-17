"use client";

import { useState, useEffect } from 'react';
import PaintCanvas from '@/components/PaintCanvas';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useAuth } from '@/context/AuthContext';

interface Drawing {
  id: string;
  title: string;
  imageUrl: string;
}

interface SavedDrawing {
  id: string;
  imageUrl: string;
  createdAt: Date;
}

export default function DesenhosPage() {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [savedDrawings, setSavedDrawings] = useState<SavedDrawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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

  const handleSaveDrawing = async (dataUrl: string) => {
    if (!user) {
      alert("Você precisa estar logado para salvar seu desenho!");
      return;
    }

    try {
      const storageRef = ref(storage, `saved_drawings/${user.uid}/${new Date().toISOString()}.png`);
      await uploadString(storageRef, dataUrl, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);

      const savedDrawingsCollection = collection(db, `users/${user.uid}/saved_drawings`);
      await addDoc(savedDrawingsCollection, {
        imageUrl: downloadURL,
        createdAt: new Date(),
      });

      alert("Desenho salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar desenho: ", error);
      alert("Ocorreu um erro ao salvar o seu desenho.");
    }
  };

  if (selectedDrawing) {
    return (
      <div>
        <h2>Pinte o {selectedDrawing.title}</h2>
        <PaintCanvas imageUrl={selectedDrawing.imageUrl} onSave={handleSaveDrawing} />
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
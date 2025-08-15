"use client";

import { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PaintCanvasProps {
  imageUrl: string;
}

export default function PaintCanvas({ imageUrl }: PaintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
  }, [imageUrl]);

  const startPainting = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsPainting(true);
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  };

  const stopPainting = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.closePath();
    setIsPainting(false);
  };

  const handleDownloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("desenho.pdf");
    });
  };

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <span>Cor: </span>
          {colors.map((c) => (
            <button
              key={c}
              style={{ backgroundColor: c, width: '25px', height: '25px', border: color === c ? '2px solid #000' : '1px solid #ccc', cursor: 'pointer' }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div>
          <label htmlFor="brushSize">Tamanho do Pincel: </label>
          <input
            type="range"
            id="brushSize"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
        </div>
        <button onClick={handleDownloadPdf} style={{ padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Baixar em PDF
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startPainting}
        onMouseMove={paint}
        onMouseUp={stopPainting}
        onMouseLeave={stopPainting}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
}

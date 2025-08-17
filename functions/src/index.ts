
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

// Lista de desenhos pré-definidos que serão usados como "desenhos do dia"
const dailyDrawingsPool = [
  { title: "Leão Amigável", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/leao.png" },
  { title: "Foguete Espacial", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/foguete.png" },
  { title: "Castelo Mágico", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/castelo.png" },
  { title: "Dinossauro Feliz", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/dinossauro.png" },
  { title: "Robô Futurista", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/robo.png" },
  { title: "Sereia Encantada", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/sereia.png" },
  { title: "Unicórnio Colorido", imageUrl: "https://storage.googleapis.com/nascente-das-cores.appspot.com/daily_drawings/unicornio.png" },
];

// Esta função será executada todos os dias à meia-noite
export const updateDailyDrawings = onSchedule("every day 00:00", async () => {
  logger.info("Iniciando a atualização dos desenhos diários...", { structuredData: true });

  const db = admin.firestore();

  try {
    // 1. Pega os desenhos já existentes para evitar repetição
    const drawingsSnapshot = await db.collection("drawings").get();
    const existingImageUrls = drawingsSnapshot.docs.map(doc => doc.data().imageUrl);

    // 2. Filtra a lista para obter apenas desenhos que ainda não foram usados
    const availableDrawings = dailyDrawingsPool.filter(
      drawing => !existingImageUrls.includes(drawing.imageUrl)
    );

    // 3. Se não houver mais desenhos novos, limpa a coleção para recomeçar
    if (availableDrawings.length === 0) {
      logger.info("Todos os desenhos já foram usados. Limpando a coleção para recomeçar.");
      const batch = db.batch();
      drawingsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      
      // Adiciona o primeiro desenho da lista novamente
      const firstDrawing = dailyDrawingsPool[0];
      await db.collection("drawings").add({
        ...firstDrawing,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      logger.info(`O desenho "${firstDrawing.title}" foi adicionado como o primeiro do novo ciclo.`);
      return;
    }

    // 4. Escolhe um desenho aleatório da lista de disponíveis
    const randomIndex = Math.floor(Math.random() * availableDrawings.length);
    const newDrawing = availableDrawings[randomIndex];

    // 5. Adiciona o novo desenho ao Firestore
    await db.collection("drawings").add({
      ...newDrawing,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    logger.info(`Novo desenho "${newDrawing.title}" adicionado com sucesso!`);

  } catch (error) {
    logger.error("Erro ao adicionar novo desenho:", error);
  }
});

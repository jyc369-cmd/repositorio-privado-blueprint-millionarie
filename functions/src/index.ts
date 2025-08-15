/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

// Exemplo de uma HTTP function que poderia ser chamada por um Cloud Scheduler
export const updateDailyDrawings = onRequest(async (request, response) => {
  logger.info("Iniciando a atualização dos desenhos diários...", {structuredData: true});
  
  // Lógica para buscar novas imagens (ex: de uma API de IA)
  // e salvá-las no Firebase Storage.
  // Os metadados (URL, título) seriam salvos no Firestore.

  // Por enquanto, é apenas um placeholder.
  const drawing = {
      title: "Desenho Gerado Automaticamente",
      imageUrl: "https://via.placeholder.com/400/0000FF/FFFFFF?Text=Novo+Desenho",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await admin.firestore().collection("drawings").add(drawing);
    logger.info("Novo desenho adicionado com sucesso!");
    response.send("Desenhos atualizados com sucesso!");
  } catch (error) {
    logger.error("Erro ao adicionar novo desenho:", error);
    response.status(500).send("Erro ao atualizar os desenhos.");
  }
});

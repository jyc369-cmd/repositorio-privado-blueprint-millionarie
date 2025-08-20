
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions";
import axios from "axios";

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage().bucket();

// Exemplo de lista de temas para os desenhos
const themes = [
    "animais da floresta",
    "espaço sideral",
    "fundo do mar",
    "dinossauros",
    "super-heróis",
    "contos de fadas",
    "veículos de construção",
    "instrumentos musicais",
];

export const gerarDesenhoDiario = onSchedule("every day 00:00", async (event) => {
    logger.info("Iniciando a geração do desenho diário...");

    try {
        // 1. Escolher um tema aleatório
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        const prompt = `desenho para colorir, contornos simples, para crianças, com o tema: ${randomTheme}`;

        logger.info(`Tema escolhido: ${randomTheme}`);

        // 2. Chamar a API de geração de imagem (usaremos uma API de placeholder por enquanto)
        // Substitua pela API de sua escolha (DALL-E, Midjourney, Vertex AI etc.)
        const imageUrl = await generateImage(prompt);

        if (!imageUrl) {
            throw new Error("A API não retornou uma URL de imagem.");
        }

        logger.info("Imagem gerada com sucesso:", imageUrl);

        // 3. Fazer o download da imagem
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        const imageName = `desenho-${new Date().toISOString().split('T')[0]}.png`;
        const file = storage.file(`desenhos-diarios/${imageName}`);

        // 4. Salvar a imagem no Firebase Storage
        await file.save(imageBuffer, {
            metadata: {
                contentType: 'image/png',
                public: true
            }
        });
        
        const publicUrl = file.publicUrl();
        logger.info("Imagem salva no Storage:", publicUrl);

        // 5. Salvar a URL da imagem no Firestore
        const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        await db.collection("desenhosDiarios").doc(today).set({
            url: publicUrl,
            prompt: prompt,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        logger.info("URL salva no Firestore. Processo concluído!");

    } catch (error) {
        logger.error("Erro ao gerar o desenho diário:", error);
    }
});

// Função mock para gerar imagem (substituir pela implementação real)
async function generateImage(prompt: string): Promise<string | null> {
    // Usaremos a API do Unsplash como placeholder para obter uma imagem aleatória
    // Em um cenário real, aqui você chamaria a API da OpenAI, Google AI, etc.
    try {
        // Para este exemplo, vamos usar uma imagem de placeholder para evitar a necessidade de chaves de API
        // Esta é uma imagem de um gatinho para colorir
        const placeholderImageUrl = "https://i.imgur.com/330h2Q3.png";
        return placeholderImageUrl;

    } catch (error) {
        logger.error("Erro na API de geração de imagem:", error);
        return null;
    }
}

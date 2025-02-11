import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


/*
    Exemplo do body pra ser enviado na request:
    {
        "texto_1": "Hello, how are you?",
        "texto_2": "Hoje é um dia lindo.",
        "texto_3": "Good morning! What are your plans for today?"
    }
*/
app.post('/api/chat', async (req, res) => {
    try {
        const inputText = req.body;

        if (!inputText || typeof inputText !== 'object' || Object.keys(inputText).length === 0) {
            return res.status(400).json({ error: 'O corpo da requisição deve conter um JSON com textos para tradução.' });
        }

        const prompt = `
            Você é um tradutor que converte textos para espanhol. Receba um JSON e retorne o mesmo JSON com os valores traduzidos para espanhol.
            Não adicione nada além do JSON. Certifique-se de que o JSON seja **válido**.

            Entrada:
            ${JSON.stringify(inputText)}

            Saída esperada:
            {
            "chave_original": "Tradução para espanhol"
            }
        `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: prompt }],
            max_tokens: 1200,
            temperature: 0.3,
        });

        let translatedText = completion.choices[0]?.message?.content?.trim() || '';

        try {
            translatedText = JSON.parse(translatedText);
        } catch (error) {
            console.error('Erro ao parsear JSON da OpenAI. Tentando corrigir...', translatedText);
            translatedText = { error: 'Erro ao gerar JSON válido. Verifique a formatação.' };
        }

        res.json({ original: inputText, translated: translatedText });
    } catch (error) {
        console.error('[OpenAI] Erro:', error.message);
        res.status(500).json({ error: 'Erro ao processar a tradução.' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
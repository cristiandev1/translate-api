### **📌 API de Tradução com OpenAI**

Esta API recebe um JSON com textos em **português ou inglês** e retorna a tradução para **espanhol**, utilizando a OpenAI.

---

## **🚀 Como iniciar o projeto**

### **1️⃣ Instalar as dependências**
```bash
npm install
```

### **2️⃣ Criar um arquivo `.env`**
Na raiz do projeto, crie um arquivo `.env` e adicione sua chave da OpenAI:
```
OPENAI_API_KEY=SUA_CHAVE_AQUI
```

### **3️⃣ Rodar o servidor**
```bash
node index.js
```
O servidor será iniciado em **`http://localhost:3000`**.

---

## **📡 Como usar a API**
A API possui um único endpoint:

### **🔹 POST `/api/chat`**
Envia um JSON com textos para serem traduzidos.

#### **📥 Exemplo de requisição**
```json
{
  "texto_1": "Hello, how are you?",
  "texto_2": "Hoje é um dia lindo.",
  "texto_3": "Good morning! What are your plans for today?"
}
```

#### **📤 Exemplo de resposta**
```json
{
  "original": {
    "texto_1": "Hello, how are you?",
    "texto_2": "Hoje é um dia lindo.",
    "texto_3": "Good morning! What are your plans for today?"
  },
  "translated": {
    "texto_1": "Hola, ¿como estás?",
    "texto_2": "Hoy es un día hermoso.",
    "texto_3": "¡Buenos días! ¿Cuáles son tus planes para hoy?"
  }
}
```

---

## **🔧 Tecnologias utilizadas**
- **Node.js**
- **Express**
- **OpenAI API**
- **Dotenv**

---



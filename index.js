//setup do servidor

const express = require("express");
const { runPrompt } = require("./promptMaker");
const { error } = require("console");
require("dotenv").config();

const app = express();

//middleware para o Json
app.use(express.json());

//rotas

app.post("/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "O campo 'prompt' é obrigatório" });
    }

    const resposta = await runPrompt(prompt);

    res.json({ prompt, resposta });
  } catch (err) {
    console.error("Erro no /gemini:", err);
    res
      .status(500)
      .json({ error: "Erro ao processar o prompt", details: err.message });
  }
});

//porta

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});

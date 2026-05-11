import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();const URL_CENTRAL = "https://mossy-bribe-carless.ngrok-free.dev/central";

app.use(cors());
app.use(express.json());

app.post('/api/open-finance/sync', async (req, res) => {
  const { cpf, nome } = req.body;

  try {
    
    const response = await axios.get(URL_CENTRAL);
    const bancoAtual = response.data || {};

    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 1);
    const vencimentoFormatado = agora.toISOString().replace('T', ' ').split('.')[0];

    
    bancoAtual[cpf] = {
      nome: nome,
      mae: "Não informada",
      renda: 5000.0,
      valor: 0.0,
      status: "ATIVO",
      score: 850,
      vencimento: vencimentoFormatado, 
      end: "Agência Banco do Brasil"
    };

    await axios.post(URL_CENTRAL, bancoAtual);
    
    res.json({ message: "Sincronizado!", score: 850 });
  } catch (error) {
    console.error("Erro na comunicação:", error.message);
    res.status(500).json({ message: "Central Offline" });
  }
});

app.listen(3001, () => console.log("✅ Backend BB Rodando na 3001"));
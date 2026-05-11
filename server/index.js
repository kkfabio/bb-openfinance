import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const URL_CENTRAL = "https://mossy-bribe-carless.ngrok-free.dev/central";

app.use(cors());
app.use(express.json());

app.post('/api/open-finance/sync', async (req, res) => {
  const { cpf, nome } = req.body;
  try {
    const response = await axios.get(URL_CENTRAL);
    const bancoAtual = response.data || {};
    
    let scoreAtual = bancoAtual[cpf] ? bancoAtual[cpf].score : 850;

    if (scoreAtual <= 200) {
      scoreAtual = 200;
    }

    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 1);
    const vencimentoFormatado = agora.toISOString().replace('T', ' ').split('.')[0];

    bancoAtual[cpf] = {
      nome: nome,
      mae: "Não informada",
      renda: 5000.0,
      valor: 0.0,
      status: scoreAtual <= 200 ? "NEGATIVADO" : "ATIVO",
      score: scoreAtual,
      vencimento: vencimentoFormatado, 
      end: "Agência Banco do Brasil"
    };

    await axios.post(URL_CENTRAL, bancoAtual);
    res.json({ message: "Sincronizado com o Banco Central!", score: scoreAtual });
  } catch (error) {
    res.status(500).json({ message: "Central Offline" });
  }
});

app.post('/api/open-finance/loan', async (req, res) => {
  const { cpf, valorEmprestimo } = req.body;
  
  try {
    const response = await axios.get(URL_CENTRAL);
    let bancoAtual = response.data || {};

    if (bancoAtual[cpf]) {
      if (bancoAtual[cpf].score <= 200) {
        bancoAtual[cpf].status = "NEGATIVADO";
        await axios.post(URL_CENTRAL, bancoAtual);
        return res.status(403).json({ message: "Operação negada pelo Banco Central: Score Insuficiente." });
      }

      const valorNumerico = Number(valorEmprestimo);
      bancoAtual[cpf].valor = valorNumerico;
      bancoAtual[cpf].status = "AGUARDANDO LIBERAÇÃO";
      
      await axios.post(URL_CENTRAL, bancoAtual);
      res.json({ message: `Solicitação de R$ ${valorNumerico.toFixed(2)} enviada para análise!` });

      setTimeout(async () => {
        try {
          const resUpdate = await axios.get(URL_CENTRAL);
          let bancoUpdate = resUpdate.data || {};
          if (bancoUpdate[cpf]) {
            bancoUpdate[cpf].status = "APROVADO";
            bancoUpdate[cpf].renda = Number(bancoUpdate[cpf].renda) + valorNumerico;
            bancoUpdate[cpf].valor = 0; 
            await axios.post(URL_CENTRAL, bancoUpdate);
            console.log(`✅ Central: Empréstimo aprovado para ${cpf}`);
          }
        } catch (err) {
          console.error("Erro na comunicação com a central:", err.message);
        }
      }, 10000);
    } else {
      res.status(404).json({ message: "CPF não localizado na Central." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro de conexão com a Central." });
  }
});

app.listen(3001, () => console.log("✅ Servidor API rodando na porta 3001"));
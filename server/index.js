import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
let usuarios = [
  {
    cpf: "123.456.789-00",
    nome: "SIMULADOR BB",
    senha: "123",
    saldo: 1250.00,
    conta: "48231-5"
  }
];

// Rota de Login
app.post('/api/login', (req, res) => {
  const { cpf, password } = req.body;
  const user = usuarios.find(u => u.cpf === cpf && u.senha === password);

  if (user) {
    const { senha, ...userData } = user;
    return res.json(userData);
  }
  res.status(401).json({ message: "Acesso negado" });
});

// Adicione isso ao seu server/index.js

let dadosOpenFinance = [
  {
    instituicao: "Itaú",
    tipo: "Conta Corrente",
    saldo: 2500.50,
    cor: "#EC7000" 
  },
  {
    instituicao: "Nubank",
    tipo: "Conta Pagamento",
    saldo: 890.20,
    cor: "#820AD1" 
  }
];

app.get('/api/open-finance/contas', (req, res) => {
  res.json(dadosOpenFinance);
});

app.post('/api/open-finance/consentimento', (req, res) => {
  const { banco } = req.body;
  res.json({ 
    message: `Consentimento para ${banco} realizado com sucesso!`,
    status: "AUTORIZADO" 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
}
);
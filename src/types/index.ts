export interface OpenFinanceData {
  banco_origem: string;
  saldo_externo: number;
  status_lgpd: "autorizado" | "negado";
  cliente_nome: string;
}

export interface UserProfile {
  nome: string;
  score: number;
  saldo: number;
}
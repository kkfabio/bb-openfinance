import React, { useState, useCallback, useMemo } from 'react';
import { ScoreGauge } from '../components/ScoreGauge.tsx';
import { ShieldCheck, RefreshCw, Landmark, User, Wallet, PiggyBank, ArrowRight, AlertOctagon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [score, setScore] = useState(450);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mensagem, setMensagem] = useState('');
  
  const userCpf = "12345678900";
  const userName = "Fábio Nunes";

  const isBloqueado = score <= 200;

  const valorEmprestimoDisponivel = useMemo(() => {
    return isBloqueado ? 0 : score * 50;
  }, [score, isBloqueado]);

  const handleSimulateRestriction = () => {
    setScore(200);
    setMensagem('');
  };

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    setMensagem('');
    try {
      const response = await fetch('http://localhost:3001/api/open-finance/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: userCpf, nome: userName })
      });
      if (response.ok) {
        const data = await response.json();
        setScore(data.score); 
      }
    } catch (error) {
      console.error("Erro na sincronização:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [userCpf, userName]);

  const handleLoan = async () => {
    if (isBloqueado) {
      setMensagem("Ops! Seu score atual não é suficiente para realizar esta operação.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/open-finance/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: userCpf, valorEmprestimo: valorEmprestimoDisponivel })
      });
      if (response.ok) {
        const data = await response.json();
        setMensagem(data.message);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com a central.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-slate-800">
      <header className="bg-[#0038a8] px-6 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_do_Brasil_logo.svg/1200px-Banco_do_Brasil_logo.svg.png" className="h-6 filter brightness-0 invert" alt="Logo BB" />
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <User size={16} className="text-[#fcf800]" />
          <span className="text-white font-semibold text-xs uppercase tracking-wider">{userName}</span>
        </div>
      </header>

      <div className="h-2 bg-[#fcf800] w-full" />

      <main className="max-w-xl mx-auto p-4 md:p-6 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={48} className="text-[#0038a8]" /></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={12} className="text-green-500" /> Conta Protegida
          </span>
          <h2 className="text-3xl font-black text-[#0038a8] mt-1">R$ 4.320,10</h2>
          <p className="text-slate-500 text-[11px] mt-1 font-medium">Saldo total disponível em conta</p>
        </div>

        <div className="bg-[#0038a8] p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white"><PiggyBank size={120} /></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#fcf800] text-[10px] font-bold uppercase tracking-[0.2em]">Crédito Pré-Aprovado</p>
              <h3 className="text-white text-xl font-bold mt-1">Empréstimo Rápido</h3>
            </div>
            <Landmark className="text-[#fcf800]" size={24} />
          </div>

          <div className="mb-6">
            <p className="text-blue-100 text-xs">Com base no seu score atual de <span className="text-[#fcf800] font-bold">{score}</span>:</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-white text-3xl font-black">
                {valorEmprestimoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span className="text-blue-200 text-xs font-medium">disponível</span>
            </div>
          </div>

          <button 
            onClick={handleLoan}
            className={`w-full py-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-colors shadow-lg ${
              isBloqueado ? 'bg-slate-400 text-slate-200 cursor-not-allowed opacity-80' : 'bg-[#fcf800] text-[#0038a8] hover:bg-yellow-400'
            }`}
          >
            {isBloqueado ? 'Solicitação Negada' : 'Contratar Agora'} <ArrowRight size={16} />
          </button>

          {mensagem && (
            <div className={`mt-4 p-3 text-[10px] text-center rounded border ${
              isBloqueado 
              ? 'bg-red-500/20 text-white border-red-500/30' 
              : 'bg-yellow-400/20 text-white border-yellow-400/30'
            }`}>
              {mensagem}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-[#0038a8] font-bold text-sm uppercase flex items-center gap-2"><Landmark size={18} /> Open Finance Score</h3>
            <span className={`${score <= 200 ? 'bg-red-600 text-white' : score < 400 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'} text-[10px] px-2 py-1 rounded font-bold`}>
              {score <= 200 ? 'Conta Negativada' : score < 400 ? 'Risco Alto' : 'Nível Intermediário'}
            </span>
          </div>

          <div className="p-6">
            <div className="py-4 flex justify-center transform scale-110"><ScoreGauge score={score} /></div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className={`group w-full py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-3 shadow-md ${
                  isSyncing ? 'bg-slate-200 text-slate-400' : 'bg-[#0038a8] text-white hover:bg-[#002a7a]'
                }`}
              >
                {isSyncing ? <RefreshCw className="animate-spin" size={20} /> : <><span>Atualizar Limites</span><RefreshCw size={18} /></>}
              </button>

              <button 
                onClick={handleSimulateRestriction}
                className="w-full py-2 border-2 border-dashed border-red-200 text-red-400 rounded-xl text-[10px] font-bold uppercase hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <AlertOctagon size={14} /> Simular Negativação
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 uppercase font-semibold tracking-tighter">Conexão Segura TLS 1.3 | Protocolo Aberto de Finanças v2.4</p>
      </main>
    </div>
  );
};
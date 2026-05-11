import React, { useState, useCallback } from 'react';
import { ScoreGauge } from '../components/ScoreGauge.tsx';
import { ShieldCheck, RefreshCw, Landmark, User, Wallet } from 'lucide-react'; // Ícones para dar profundidade

export const Dashboard: React.FC = () => {
  const [score, setScore] = useState(450);
  const [isSyncing, setIsSyncing] = useState(false);
  const userCpf = "123.456.789-00";
  const userName = "Fábio Nunes";

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/open-finance/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cpf: userCpf, 
          nome: userName,
          valorNegativo: 0 
        })
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

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-slate-800">
      {/* Header Refinado: Menos margem, mais contraste */}
      <header className="bg-[#0038a8] px-6 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_do_Brasil_logo.svg/1200px-Banco_do_Brasil_logo.svg.png" 
          className="h-6 filter brightness-0 invert" 
          alt="Logo BB" 
        />
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <User size={16} className="text-[#fcf800]" />
          <span className="text-white font-semibold text-xs uppercase tracking-wider">{userName}</span>
        </div>
      </header>

      {/* Banner de Identidade Visual */}
      <div className="h-2 bg-[#fcf800] w-full" />

      <main className="max-w-xl mx-auto p-4 md:p-6 space-y-4">
        
        {/* Card de Saldo: Estilo Neumorphism suave */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={48} className="text-[#0038a8]" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={12} className="text-green-500" /> Conta Protegida
          </span>
          <h2 className="text-3xl font-black text-[#0038a8] mt-1">R$ 4.320,10</h2>
          <p className="text-slate-500 text-[11px] mt-1 font-medium">Saldo total disponível em conta</p>
        </div>

        {/* Card de Score: Foco na funcionalidade */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-[#0038a8] font-bold text-sm uppercase flex items-center gap-2">
              <Landmark size={18} /> Open Finance Score
            </h3>
            <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-1 rounded font-bold">Nível Intermediário</span>
          </div>

          <div className="p-6">
            <div className="py-4 flex justify-center transform scale-110">
              <ScoreGauge score={score} />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-center text-slate-600 text-xs leading-relaxed italic">
                Aumente seu limite e acesso a crédito sincronizando seus dados com o 
                <span className="font-bold text-[#0038a8]"> Banco Central (Bacen)</span>.
              </p>
            </div>

            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className={`group relative w-full py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-md ${
                isSyncing 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-[#0038a8] text-white hover:bg-[#002a7a] active:scale-[0.98]'
              }`}
            >
              {isSyncing ? (
                <RefreshCw className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sincronizar com Bacen</span>
                  <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-400 uppercase font-semibold tracking-tighter">
          Conexão Segura TLS 1.3 | Protocolo Aberto de Finanças v2.4
        </p>
      </main>
    </div>
  );
};
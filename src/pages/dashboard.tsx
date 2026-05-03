import React, { useState } from 'react';
import { ScoreGauge } from '../components/ScoreGauge.tsx';

export const Dashboard: React.FC = () => {
  const [score, setScore] = useState(450);
  const [ip, setIp] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!ip) return alert("Por favor, informe o IP da API do colega.");
    
    setIsSyncing(true);
    setTimeout(() => {
      setScore(780); 
      setIsSyncing(false);
      alert("Integração concluída! Seu score foi atualizado.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bb-amarelo font-sans">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b-4 border-bb-azul shadow-md">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/52/BB-logo1.jpg" 
          className="h-10" 
          alt="Logo BB" 
        />
        <div className="text-bb-azul font-bold uppercase text-sm">Fábio Nunes</div>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Card Saldo */}
        <div className="bg-white p-8 rounded shadow-lg border-l-[12px] border-bb-azul">
          <span className="text-xs font-bold text-gray-500 uppercase">Saldo total disponível</span>
          <h2 className="text-4xl font-black text-bb-azul mt-1">R$ 4.320,10</h2>
          <div className="text-green-600 text-xs font-bold mt-2">● Conta Corrente atualizada</div>
        </div>

        {/* Card Score / Open Finance */}
        <div className="bg-white p-8 rounded shadow-lg border-l-[12px] border-orange-500">
          <h3 className="text-bb-azul font-bold text-lg mb-4">SEU SCORE BB</h3>
          
          <ScoreGauge score={score} />

          <p className="text-center text-gray-600 text-sm mb-6">
            Sua pontuação atual permite um limite de crédito de até <strong className="text-gray-800">R$ 2.500,00</strong>.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-bb-azul uppercase block mb-1">IP do Servidor Parceiro</label>
              <input 
                type="text" 
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Ex: 192.168.1.XX"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bb-azul"
              />
            </div>

            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className={`w-full py-4 font-bold uppercase transition-all ${
                isSyncing ? 'bg-gray-400' : 'bg-bb-azul hover:bg-blue-900'
              } text-white shadow-md`}
            >
              {isSyncing ? 'Sincronizando...' : '🚀 Aumentar Score com Open Finance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
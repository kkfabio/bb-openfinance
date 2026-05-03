import React from 'react';
interface ScoreProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreProps> = ({ score }) => {
  const rotation = (score / 1000) * 180;
  
  const getStatus = () => {
    if (score < 400) return { label: 'BAIXO', color: 'bg-red-500' };
    if (score < 700) return { label: 'MÉDIO', color: 'bg-yellow-500' };
    return { label: 'EXCELENTE', color: 'bg-green-600' };
  };

  const status = getStatus();

  return (
    <div className="flex flex-col items-center my-5">
      {/* Container do Semicírculo (Cinza ao fundo) */}
      <div className="relative w-56 h-28 bg-gray-200 rounded-t-full overflow-hidden">
        
        {/* Parte colorida que gira */}
        <div 
          className={`absolute top-full left-0 w-56 h-56 origin-top transition-transform duration-1000 ease-out ${status.color}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Círculo interno branco para dar o efeito de 'ponteiro' */}
        <div className="absolute inset-x-4 top-4 bottom-0 bg-white rounded-t-full flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-blue-900 mt-4">
            {Math.floor(score)}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
};
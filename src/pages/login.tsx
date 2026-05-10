import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-[#fcf800] flex flex-col items-center justify-center p-4">
      
      <div className="mb-8 flex flex-col items-center">
        {/* Mesma URL de imagem utilizada no Dashboard */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/52/BB-logo1.jpg" 
          alt="Logo BB" 
          className="h-20 md:h-24 mb-4 object-contain"
        />
        <h2 className="text-[#0038a8] font-bold text-xl uppercase tracking-widest text-center">
          Autoatendimento
        </h2>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border-t-8 border-[#0038a8]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-[#0038a8] text-xs font-bold mb-2 uppercase tracking-tighter">
              CPF
            </label>
            <input 
              type="text" 
              placeholder="000.000.000-00"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0038a8] outline-none text-center text-lg font-semibold"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-[#0038a8] text-xs font-bold mb-2 uppercase tracking-tighter">
              Senha de 8 dígitos
            </label>  
            <div className="relative">
              <input 
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0038a8] outline-none text-center text-2xl"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0038a8] opacity-70"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0038a8] text-[#fcf800] font-black py-4 rounded-md shadow-lg hover:bg-blue-900 transition-all uppercase tracking-widest text-lg"
          >
            Entrar
          </button>
        </form>
      </div>

      <footer className="mt-12 text-[#0038a8] text-[10px] font-bold opacity-60 uppercase tracking-widest text-center">
        Segurança BB | © Banco do Brasil 2026
      </footer>
    </div>
  );
};

export default Login;
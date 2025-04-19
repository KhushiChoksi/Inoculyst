import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.tsx';

const Login: React.FC = () => {
  const {
    username, 
    setUsername, 
    password, 
    setPassword, 
    errorMessage, 
    login,
    accountType
  }  = useAuth();


  

return (
  <div className="flex justify-center items-center min-h-screen bg-background">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
      <h1 className="text-lg font-bold mb-6 text-center text-dark1 tracking-widest">INOCULYST</h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold text-dark2">Username</label>
        <input 
          type="text" 
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-semibold text-dark2">Password</label>
        <input 
          type="password" 
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
        />
      </div>
      {errorMessage && <p className = "text-red-500 mb-4 text-sn"> {errorMessage}</p>}
      
      <button 
        onClick={login}
        className="w-full bg-dark1 text-white py-3 rounded hover:bg-dark_green transition-colors"
      >
        Login
      </button>
    </div>
  </div>
);
};

export default Login;
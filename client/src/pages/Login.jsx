import React from 'react';

const Login = ({ api_url }) => {
  const AUTH_URL = `${api_url}/auth/github`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6">Login to FlightAid</h1>
      
      <p className="text-lg md:text-2xl text-gray-700 mb-8">
        Start planning your next journey.
      </p>

      <a href={AUTH_URL}>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xl">
          Login with GitHub
        </button>
      </a>
    </div>
  );
};

export default Login;

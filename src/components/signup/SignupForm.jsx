import React, { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted. Email:', email, 'Password:', password);
    // Add your form submission logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

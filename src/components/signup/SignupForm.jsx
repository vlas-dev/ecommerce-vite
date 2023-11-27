export default function SignupForm() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
            className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#6F0571] text-white px-4 py-2 rounded hover:bg-[#5d235e]"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

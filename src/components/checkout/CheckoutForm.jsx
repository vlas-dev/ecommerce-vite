import React from "react";
import { useForm } from "../../hooks/useForm/useForm";

const CheckoutForm = () => {
  const { formState, onInputChange } = useForm({
    name: "",
    lastName: "",
    email: "",
    country: "venezuela",
    state: "",
    city: "",
    line1: "calle 111",
    phone: "",
    postal_code: "",
  });

  return (
    <div>
    
    <form className="p-8 h-[550px] w-[400px] md:w-[500px] bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">Datos de Facturación</h2>
      {/* Name Field */}
      <div className="mb-4">
        
      <label
          htmlFor="firstName"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
          
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={formState.name}
          name="name"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nombre"
        />
      </div>

      {/* Last Name Field */}
      <div className="mb-4">
      <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Apellido
        </label>
        <input
          type="text"
          id="lastName"
          value={formState.lastName}
          name="lastName"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Apellido"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
      <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formState.email}
          name="email"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
        />
      </div>

      {/* Country Field */}
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          País
        </label>
        <input
          type="text"
          id="country"
          value={formState.country}
          name="country"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="País"
        />
      </div>

      {/* State Field */}
      <div className="mb-4">
        <label
          htmlFor="state"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Provincia
        </label>
        <input
          type="text"
          id="state"
          value={formState.state}
          name="state"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Provincia"
        />
      </div>

      {/* City Field */}
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Ciudad
        </label>
        <input
          type="text"
          id="city"
          value={formState.city}
          name="city"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ciudad"
        />
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Dirección
        </label>
        <input
          type="text"
          id="address"
          value={formState.line1}
          name="line1"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Dirección"
        />
      </div>

      {/* Postal Code Field */}
      <div className="mb-4">
        <label
          htmlFor="postal_code"
          className="block text-gray-700 text-sm font-bold mb-2 sr-only"
        >
          Código Postal
        </label>
        <input
          type="text"
          id="postal_code"
          value={formState.postal_code}
          name="postal_code"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Código Postal"
        />
      </div>
    </form>
    </div>
  );
};

export default CheckoutForm;

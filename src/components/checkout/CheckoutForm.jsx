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
      <form className="p-8 h-[650px] md:h-[450px] w-[400px] md:w-[500px] bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Datos de Facturación
        </h2>

        {/* Flex container for Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-10">
          {/* Name Field */}
          <div className="floating-label-group">
            <input
              type="text"
              id="name"
              value={formState.name}
              name="name"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="name" className="block bg-gray-100">
              Nombre
            </label>
          </div>

          {/* Last Name Field */}
          <div className="floating-label-group">
            <input
              type="text"
              id="lastName"
              value={formState.lastName}
              name="lastName"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder="Apellido"
            />
            <label htmlFor="lastName" className="block bg-gray-100">
              Apellido
            </label>
          </div>
        </div>

        {/* Flex container for Email and País */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          {/* Email Field */}
          <div className="floating-label-group">
            <input
              type="email"
              id="email"
              value={formState.email}
              name="email"
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="email" className="block bg-gray-100">
              Email
            </label>
          </div>

          {/* Country Field (País) */}
          <div className="floating-label-group">
            <input
              type="text"
              id="country"
              value={formState.country}
              name="country"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="country" className="block bg-gray-100">
              País
            </label>
          </div>
        </div>

        {/* Flex container for Provincia and Ciudad */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          {/* State Field (Provincia) */}
          <div className="floating-label-group">
            <input
              type="text"
              id="state"
              value={formState.state}
              name="state"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="state" className="block bg-gray-100">
              Provincia
            </label>
          </div>

          {/* City Field (Ciudad) */}
          <div className="floating-label-group">
            <input
              type="text"
              id="city"
              value={formState.city}
              name="city"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="city" className="block bg-gray-100">
              Ciudad
            </label>
          </div>
        </div>

        {/* Flex container for Dirección and Código Postal */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          {/* Address Field (Dirección) */}
          <div className="floating-label-group">
            <input
              type="text"
              id="address"
              value={formState.line1}
              name="line1"
              onChange={onInputChange}
              className="h-12 text-[18px] capitalize bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="address" className="block bg-gray-100 ">
              Dirección
            </label>
          </div>

          {/* Postal Code Field (Código Postal) */}
          <div className="floating-label-group">
            <input
              type="text"
              id="postal_code"
              value={formState.postal_code}
              name="postal_code"
              onChange={onInputChange}
              className="h-12 text-[18px] bg-gray-100 border py-55-rem border-gray-400 text-sm rounded-lg focus:outline-none focus:shadow-outline block w-full p-2.5 placeholder-transparent "
              placeholder=" "
            />
            <label htmlFor="postal_code" className="block bg-gray-100">
              Código Postal
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

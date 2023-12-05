import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../services/productsData.json';

export default function Celulares() {
  // Filter only cellphones
  const cellphones = products.filter((product) =>
    product.titulo.toLowerCase().includes('teléfono')
  );

  // State to track quantity of each product
  const [quantities, setQuantities] = useState(
    cellphones.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  // Function to increment quantity
  const incrementQuantity = (id) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] + 1,
    });
  };

  // Function to decrement quantity
  const decrementQuantity = (id) => {
    if (quantities[id] > 0) {
      setQuantities({
        ...quantities,
        [id]: quantities[id] - 1,
      });
    }
  };

  return (
    <div className="pt-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto md:pb-20 max-w-[300px] md:max-w-[1200px]">
        {cellphones.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-[6px] shadow-md hover:shadow-lg transition duration-300 ease-in-out transform w-[284px] max-w-[284px] h-[469px] max-h-[469px]"
          >
            <div className="w-[250px] h-[286px] mx-auto flex items-center">
              <Link to={product.url} key={product.id} className="w-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="bg-white w-auto h-auto object-cover"
                />
              </Link>
            </div>
            <hr className="bg-gray-300" />
            <div className="p-4">
              {product['mas-vendidos'] ? (
                <span className="bg-[#ff7733] text-white rounded-sm px-[5px] py-[1px] uppercase text-[.75rem] font-[600] ">
                  Más vendido
                </span>
              ) : (
                ''
              )}
              <h3 className="font-[400] text- text-[.95rem] text-[rgba(0,0,0,.8)]">
                {product.titulo}
              </h3>
              <div>
                {product.descuento.descuento ? (
                  <p className="line-through text-[rgba(0,0,0,.55)] text-[12px]">
                    ${product.descuento.antiguo}
                  </p>
                ) : (
                  ''
                )}
                <div className="flex">
                  <p className="text-2xl">${product.precio}</p>
                  {product.descuento.descuento ? (
                    <p className="text-[#00a650] flex items-center pl-1 text-[.9rem]">
                      {product.descuento.porcentaje}% OFF
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <p className="text-[#00a650] font-[600] text-[14px]">
                {product.envioGratis ? 'Envío gratis' : 'Sin envío incluido'}
              </p>
            </div>

            {/* Quantity Controls - Positioned at bottom right */}
            <div className="absolute bottom-2 right-2 flex items-center">
              <button onClick={() => decrementQuantity(product.id)} className="px-2 py-1 border rounded-l">
                -
              </button>
              <span className="px-2 py-1 border-t border-b">
                {quantities[product.id]}
              </span>
              <button onClick={() => incrementQuantity(product.id)} className="px-2 py-1 border rounded-r">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

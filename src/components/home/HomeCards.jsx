import React from 'react'
import { Link } from 'react-router-dom'
import { FaPercentage, FaGift, FaTag, FaStar } from 'react-icons/fa'
import products from '../../services/productsData.json'

export default function HomeCards() {
  return (
    <div className="md:pt-10 scale-90 md:scale-100">
      <h2 className="text-[2.3rem] font-[600] text-center mb-6">
        Nuestros productos
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mx-auto md:pb-20 max-w-[1200px]">
        {products.map((product) => (
          <Link to={product.url} key={product.id} className="w-full">
          {/* contenedor */}
            <div className="bg-white rounded-[6px] shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1  w-[284px] max-w-[284px] h-[469px] max-h-[469px]z">
              {/*imagen */}
              {/* <div className="flex justify-center  w-64 h-72"></div> */}
              <div className="w-[250px] h-[286px] mx-auto flex items-center">
                <img
                  src={product.image}
                  alt={product.title}https://theflixer.tv/watch-tv/watch-house-full-39423.4882459
                  className=" bg-white w-auto h-auto object-cover"
                />
              </div>

              <hr className="bg-gray-300" />

              {/* contenedor info */}
              <div className="p-4">
                {/*Más vendido / oferta del día*/}
                {product['mas-vendidos'] ? (
                  <span className="bg-[#ff7733] text-white rounded-sm px-[5px] py-[1px] uppercase text-[.75rem] font-[600] ">
                    Más vendido
                  </span>
                ) : (
                  ''
                )}

                {/* titulo */}
                <h3 className="font-[400] text- text-[.95rem] text-[rgba(0,0,0,.8)]">
                  {product.titulo}
                </h3>

                {/* contenedor precio */}
                <div>
                  {/*precio antiguo*/}

                  {product.descuento ? (
                    <p class="line-through text-[rgba(0,0,0,.55)] text-[12px]">
                      ${product.descuento.antiguo}
                    </p>
                  ) : (
                    ''
                  )}

                  {/*Precio actual y descuento*/}

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

                {/*Tipo de envío*/}
                <p className="text-[#00a650] font-[600] text-[14px]">
                  {product.envioGratis ? 'Envío gratis' : 'Sin envío incluido'}
                </p>
                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
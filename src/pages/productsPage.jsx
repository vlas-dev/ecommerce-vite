import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import crudAxios from "../config/axios";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true); // New state for loading status

  useEffect(() => {
    const consultarApi = async () => {
      try {
        setIsLoading(true); // Start loading
        const res = await crudAxios.get(`/product/${id}`);
        setProduct(res.data);
        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.log(error);
        setProduct({});
        setIsLoading(false); // Stop loading if there is an error
      }
    };
    consultarApi();

    window.scrollTo(0, 0);
  }, [id]); // Include id in dependency array

  if (!isLoading && Object.keys(product).length < 1) {
    navigate("/");
  }

  // Loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (Object.keys(product).length < 1) {
    navigate("/");
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center pt-40 h-screen ">
        <div className="mx-auto container">
          <div className="mx-auto md:pb-20 max-w-[1000px]">
            <div
              key={product.id}
              className="md:flex bg-white rounded shadow-lg transition duration-300"
            >
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src={`../images/products/${product.titulo}.png`}
                  alt={product.titulo}
                  className="w-3/4 p-10"
                />
              </div>

              <div className="md:w-1/2 p-4">
                <h3 className="text-lg font-semibold mt-10 mb-5">
                  {product.titulo}
                </h3>
                <p className="mb-4">{product.descripcion}</p>
                <p className="text-indigo-700 text-3xl font-semibold mb-4">
                  ${product.precio}
                </p>
                <p className="font-semibold text-sm">
                  {product.envio ? "Envío gratis " : "Sin envío incluido"}
                </p>

                <div className="my-10 flex flex-col gap-4 pr-5 font-semibold">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                    Comprar
                  </button>
                  <button className="bg-gray-200 text-indigo-500 px-4 py-2 rounded-md hover:bg-gray-300">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

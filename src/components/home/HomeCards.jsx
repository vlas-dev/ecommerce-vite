import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import crudAxios from "../../config/axios";

export default function HomeCards({ dataLoaded }) {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const consultarApi = async () => {
      const link = slug ? "/get/" + slug : "";

      console.log(slug);
      try {
        const res = await crudAxios.get(`/product${link}`);
        setProducts(res.data);
        dataLoaded();  // Notify parent component that data is loaded
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    consultarApi();
    window.scrollTo(0, 0);
  }, [slug, dataLoaded]);

  return (
    <div className="">
      <h2 className="pt-28 md:pt-10 text-[2.3rem] font-[600] text-center mb-6">
        Nuestros productos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto md:pb-20 max-w-[300px] md:max-w-[1200px]">
        {products.map((product) => (
          <div
            key={product.id}
            className=" relative bg-white rounded shadow-md hover:shadow-lg transition duration-300"
          >
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="w-full h-full block"
            >
              <div className="w-[250px] h-[286px] p-4 mx-auto flex items-center">
                <img
                  src={`../images/products/${product.titulo}.png`}
                  alt={product.titulo}
                  className="w-auto h-auto object-cover"
                />
              </div>
              <hr className="bg-gray-300" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">{product.titulo}</h3>
                <div>
                  <div className="flex">
                    <p className="text-indigo-700 text-xl font-semibold mb-4">
                      ${product.precio}
                    </p>
                  </div>
                </div>
                <p className=" font-semibold text-[14px]">
                  {product.envio ? "Envío gratis " : "Sin envío incluido"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

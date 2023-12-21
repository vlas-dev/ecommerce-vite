import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import crudAxios from "../../config/axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import EditMisPublicaciones from "./EditMisPublicaciones";
import { TailSpin } from 'react-loader-spinner';

export default function MisPublicaciones() {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await crudAxios.get("/product");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setIsNew(true);
    setIsEditing(false);
    setEditProduct({
      titulo: "",
      precio: "",
      category: "",
      marca: "",
      envio: true,
      porcentaje:0,
      descripcion: "",
      imagen: "",
    });
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProduct(product);
  };

  const handleRemove = async (productId) => {
    // Removal logic here
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { 
        "Content-Type":"multipart/form-data",
        "x-token": token,
      },
      };

      const res = await crudAxios.delete(`/product/${productId}`, config);
      console.log(res.data)
      refreshProducts()
    } catch (error) {
      
    }

  };

  const refreshProducts = async () => {
    const res = await crudAxios.get("/product");
    setProducts(res.data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="flex justify-center items-center h-full">
          <TailSpin
            color="#4F46E5" // Choose color
            height={50} // Set height
            width={50} // Set width
          />
        </div>
      </div>
    );
  }

return (
  <div className="container mx-auto p-4 max-w-[400px] md:max-w-[800px]">
    {isNew || isEditing ? (
      <EditMisPublicaciones
        isNew={isNew}
        isEditing={isEditing}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        setIsEditing={setIsEditing}
        setIsNew={setIsNew}
        refreshProducts={refreshProducts}
      />
    ) : (
      <div>
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Lista de Productos</h2>
          <button
            onClick={handleAddNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg mt-2 md:mt-0"
          >
            Subir Producto
          </button>
        </div>

        <div className="bg-white shadow-md rounded px-4 py-6 mb-4">
          <ul>
            {products.map((product, index) => (
              <li key={product.id} className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      className="w-20 h-20 object-cover rounded"
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${product.imagen}`}
                      alt={product.titulo}
                    />
                    <div>
                      <h3 className="text-lg font-bold">{product.titulo}</h3>
                      <p className="text-gray-600">${product.precio}</p>
                    </div>
                  </Link>

                  <div className="flex items-center space-x-2 text-indigo-600 mt-4 md:mt-0 mx-auto md:mx-0">
                    <button
                      onClick={() => handleEdit(product)}
                    >
                      <FaRegEdit />
                    </button>

                    <button
                      className="text-red-500"
                      onClick={() => handleRemove(product.id)}
                      onMouseEnter={() => setHoveredItemId(product.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      {hoveredItemId === product.id ? (
                        <RiDeleteBin7Fill />
                      ) : (
                        <RiDeleteBin7Line />
                      )}
                    </button>
                  </div>
                </div>
                {index < products.length - 1 && (
                  <hr className="my-4 border-gray-300" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

}

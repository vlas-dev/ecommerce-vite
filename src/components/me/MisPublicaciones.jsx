import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import crudAxios from "../../config/axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import EditMisPublicaciones from "./EditMisPublicaciones";

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
      descuento:0,
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
  };

  const refreshProducts = async () => {
    const res = await crudAxios.get("/product");
    setProducts(res.data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold ">Lista de Productos</h2>
            <button
              onClick={handleAddNew}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Subir Producto
            </button>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ul>
              {products.map((product, index) => (
                <li key={product.id} className="mb-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center space-x-4"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded"
                      //  LLAMAR IMAGENES DESDE EL BACK // src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${product.imagen}`}
                        src={`/images/products/${product.titulo}.png`}

                        alt={product.titulo}
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.titulo}</h3>
                        <p className="text-gray-600">${product.precio}</p>
                      </div>
                    </Link>

                    <div className="flex items-center space-x-2 text-indigo-600">
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

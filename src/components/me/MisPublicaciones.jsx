import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import crudAxios from "../../config/axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";

export default function MisPublicaciones() {
  const referenciaImg = useRef()
  const [files, setFiles] = useState()
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false); // State to track if adding a new product
  const [editProduct, setEditProduct] = useState({// Added id to track which product is being edited or added
    titulo: "",
    precio: "",
    category: "",
    marca: "",
    envio: true,
    descuento:0,
    descripcion: "",
    imagen: "",
  });
  const leerImagen = (e) =>{

    
    setFiles(e.target.files[0])
  }


  useEffect(() => {
    const consultarApi = async () => {
      try {
        const res = await crudAxios.get("/category");
        
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarApi();
  }, []);
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

  const handleInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('titulo',editProduct.titulo)
      formData.append('precio',editProduct.precio)
      formData.append('imagen',files)
      formData.append('category',editProduct.category)
      formData.append('marca',editProduct.marca)
      formData.append('envio',editProduct.envio)
      formData.append('descuento',editProduct.descuento)
      formData.append('descripcion',editProduct.descripcion)
      
      if (isNew) {
 
        // Add new product request

        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token },
        };
        const res = await crudAxios.post("/product/crear", formData,config);
        // console.log(res.data)
      
      } else if (isEditing) {
        // Update product request
        await crudAxios.put("/product/update", editProduct);
      }
      // Refresh products list after update or add
      const res = await crudAxios.get("/product");
      setProducts(res.data);
      setIsEditing(false);
      setIsNew(false);
    } catch (error) {
      console.error("Error updating/adding product:", error);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[550px] md:w-[1000px] "
        >
          <div className="mb-4">
            <h1>Producto</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="titulo"
              placeholder="Title"
              value={editProduct.titulo}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Precio</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="precio"
              placeholder="Price"
              value={editProduct.precio}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Marca</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="marca"
              placeholder="Brand"
              value={editProduct.marca}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <h1>Descuento</h1>
            <input
 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="descuento"
              placeholder="Discount"

            />
          </div>

          <div className="mb-4">
            <h1>Envío</h1>
            <select
              className=" bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="envio"
              onChange={handleInputChange}
              value={editProduct.envio }
            >

              <option value={true}>Envío Gratis</option>
              <option value={false}>Sin Envío Incluido</option>
            </select>
          </div>

          <div className="mb-4">
            <h1>Categoría</h1>

            <select 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={editProduct.category}
            onChange={handleInputChange}
            name="category" id="">
              <option value={""}>Seleccione una categoria</option>
              {
                categories.map((category)=>
                  <option value={category.nombre} key={category.id}>{category.nombre}</option>
                  )
              }
            </select>
          </div>

          <div className="mb-4">
            <h1>Descripción</h1>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="descripcion"
              placeholder="Description"
              value={editProduct.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <input type="file" name="imagen"  onChange={leerImagen} ref={referenciaImg} style={{display:'none'}}  />
          <h1 onClick={()=>referenciaImg.current.click()}>Click aqui para seleccionar Imagen</h1>
          <div className="flex flex-col items-center justify-between space-y-2">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isNew ? "Add Product" : "Save Changes"}
            </button>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setIsEditing(false);
                setIsNew(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
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
                        src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${product.imagen}`}
                        alt={product.titulo}
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.titulo}</h3>
                        <p className="text-gray-600">${product.precio}</p>
                      </div>
                    </Link>

                    <div className="flex items-center space-x-2 text-indigo-600">
                      <button
                        className=""
                        onClick={() => {
                          setIsEditing(true);
                          setEditProduct(product);
                        }}
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

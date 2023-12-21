import React, { useState, useEffect, useRef } from "react";
import crudAxios from "../../config/axios";

export default function EditMisPublicaciones({
  isNew,
  isEditing,
  editProduct,
  setEditProduct,
  setIsEditing,
  setIsNew,
  refreshProducts,
}) {
  const referenciaImg = useRef();
  const [files, setFiles] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [categories, setCategories] = useState([]);

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

  const handleInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  
  const leerImagen = (e) => {
    let file = e.target.files[0];
    setFiles(file);

    // Preview image
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {updatedAt,createdAt, id,activo, ...resto} = editProduct
    try {
    

      const token = localStorage.getItem("x-token");
      const config = {
        headers: { 
        "Content-Type":"multipart/form-data",
        "x-token":token
      },

      };

      if (isNew) {
        const formData = new FormData();
        formData.append("titulo", resto.titulo);
        formData.append("precio", resto.precio);
        formData.append("imagen", files);
        formData.append("category", resto.category);
        formData.append("marca", resto.marca);
        formData.append("envio", resto.envio);
        formData.append("porcentaje", resto.porcentaje);
        formData.append("descripcion", resto.descripcion);

        const res  = await crudAxios.post("/product/crear", formData, config);
        console.log(res.data)
      } else if (isEditing) {
        const formData = new FormData();
        formData.append("titulo", resto.titulo);
        formData.append("precio", resto.precio);
        formData.append("imagen", files);
        formData.append("category", resto.category);
        formData.append("marca", resto.marca);
        formData.append("envio", resto.envio);
        formData.append("porcentaje", resto.porcentaje);
        formData.append("descripcion", resto.descripcion);
 
       const res = await crudAxios.put(`/product/${id}`,  formData,config);
       console.log(res.data)
      }
      await refreshProducts();
      setIsEditing(false);
      setIsNew(false);
    } catch (error) {
      console.error("Error updating/adding product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[550px] md:w-[1000px]"
    >
      <div className="mb-4">
        <h1>Producto</h1>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="titulo"
          placeholder="Title"
          value={editProduct.titulo}
          onChange={handleInputChange}
          required 
        />
      </div>

     <div className="mb-4">
  <h1>Precio</h1>
  <input
    type="number" // Set the input type to "number"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    name="precio"
    placeholder="Price"
    value={editProduct.precio}
    onChange={handleInputChange}
    required 
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
          required 
        />
      </div>

      <div className="mb-4">
        <h1>Descuento</h1>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="porcentaje"
          placeholder="Discount"
          value={editProduct.porcentaje}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <h1>Envío</h1>
        <select
          className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="envio"
          onChange={handleInputChange}
          value={editProduct.envio}
        >
          <option value={true}>Envío Gratis</option>
          <option value={false}>Sin Envío Incluido</option>
        </select>
      </div>

      <div className="mb-4">
        <h1>Categoría</h1>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline capitalize"
          value={editProduct.category}
          onChange={handleInputChange}
          name="category"
          required 
        >
          <option value={""}>Seleccione una categoría</option>
          {categories.map((category) => (
            <option value={category.nombre} key={category.id}>
              {category.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
  <h1>Descripción</h1>
  <textarea
    className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
    name="descripcion"
    placeholder="Descripción"
    value={editProduct.descripcion}
    onChange={handleInputChange}
    style={{ paddingTop: '0.5rem' }} 
    required 
  />
</div>


      <div className="mb-4">
        
        <button 
          type="button" 
          onClick={() => referenciaImg.current.click()}
          className=" border border-gray-400 hover:border-gray-500  px-2 rounded">
          Seleccionar Imagen
        </button>
        <input
          type="file"
          name="imagen"
          onChange={leerImagen}
          ref={referenciaImg}
          style={{ display: "none" }}
        />
        {imagePreviewUrl && (
          <img src={imagePreviewUrl} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }} />
          )}
      </div>

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
  );
}
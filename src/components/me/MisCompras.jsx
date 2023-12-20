import React, { useEffect, useState } from 'react';
import crudAxios from '../../config/axios';

const MisCompras = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { "x-token": token },
      };
      const res = await crudAxios.get("/order/", config);
      setPedidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { "x-token": token },
      };
      await crudAxios.delete(`/order/${id}`, config);
      cargarPedidos(); // Reload the orders to reflect the deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos realizados.</p>
      ) : (
        pedidos.map((pedido, index) => (
          <div key={index} className="mb-6 bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {new Date(pedido.createdAt).toLocaleDateString('es', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h3>
              <button 
                onClick={() => handleDelete(pedido.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar Pedido
              </button>
            </div>
            {pedido.productos.map((producto, idx) => (
              <div key={idx} className="flex items-center p-4 border-b last:border-b-0">
                <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${producto.imagen}`} alt={producto.titulo} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <p className="font-bold">{producto.titulo}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p>Precio: ${producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MisCompras;

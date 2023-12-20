import React, { useEffect, useState } from 'react';
import crudAxios from '../../config/axios';

const MisCompras = () => {
  const [pedidos, setPedidos ] = useState({})

  useEffect(()=>{
    const consultarApi = async()=>{
      try {
        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token },
        };
        const res = await crudAxios.get("/order/",config);
   
        setPedidos(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    consultarApi()
  },[])
  console.log(pedidos)
  return (
    <div>
      {/* Pedidos here */}
    </div>
  );
};

export default MisCompras;

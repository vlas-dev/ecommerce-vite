import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import crudAxios from '../../config/axios';

export default function UserData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('x-token');
        const config = {
          headers: { 'x-token': token }
        };

        const res = await crudAxios.get('/me', config);
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('x-token')) {
      navigate('/signin');
    }
  }, [navigate]);

  if (!userData) {
    return <div className="flex justify-center">Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto ">
            {userData.usuario.imagen ? (
              <img src={userData.usuario.imagen} alt="User"  />
            ) : (
              <span className="text-gray-400 text-2xl">?</span>
            )}
          </div>
          <div className="ml-4 text-gray-600 text-sm">
            <h2 className="text-2xl font-semibold text-gray-900 capitalize">{userData.usuario.nombre} {userData.usuario.apellido}</h2>
            <p className="my-1"><span className="text-gray-900 font-semibold">Email:</span> {userData.usuario.email}</p>
            <p className="my-1"><span className="text-gray-900 font-semibold">Contraseña:</span> ******</p>
            <p className="my-1"><span className="text-gray-900 font-semibold">Rol:</span> {userData.usuario.role === 'USER_ROLE' ? 'User' : 'Admin'}</p>
            <p className="my-1 capitalize"><span className="text-gray-900 font-semibold">País:</span> {userData.usuario.pais}</p>
            
            <p className="my-1 capitalize"><span className="text-gray-900 font-semibold">Estado:</span> {userData.usuario.estado}</p>
            <p className="my-1 capitalize"><span className="text-gray-900 font-semibold">Ciudad:</span> {userData.usuario.ciudad}</p>

            
            <p className="my-1"><span className="text-gray-900 font-semibold">Miembro Desde:</span> {new Date(userData.usuario.createdAt).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

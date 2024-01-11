import React, { useEffect, useState } from "react";
import crudAxios from "../../config/axios";
import { FaUser } from "react-icons/fa";
import { TailSpin } from 'react-loader-spinner';

export default function UsersData() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("x-token");
        if (!token) {
          console.error("No token found");
          setIsLoading(false);
          return;
        }

        const config = {
          headers: { "x-token": token },
        };

        const res = await crudAxios.get("/admin/users", config);
        setUsers(res.data.map(user => ({ ...user, imageError: false })));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleImageError = (userId) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return { ...user, imageError: true };
      }
      return user;
    }));
  };

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-72">
        <TailSpin color="#030712" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-[400px] md:max-w-[800px] pt-40 md:pt-32">
      <h2 className="text-2xl font-bold mb-4 text-center">Registered Users</h2>
      <ul>
        {currentUsers.map((user) => (
          <li key={user.id} className="flex items-center mb-2.5 bg-white p-4 rounded shadow">
            <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full overflow-hidden">
              {user.imagen && !user.imageError ? (
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/users/${user.imagen}?${new Date().getTime()}`}
                  alt="User"
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(user.id)}
                />
              ) : (
                <FaUser className="text-gray-400" size={24} />
              )}
            </div>
            <div className="ml-4 text-gray-700">
              <p className="font-semibold capitalize">{user.nombre} {user.apellido}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-gray-950 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
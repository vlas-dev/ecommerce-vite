import React from 'react';
import { Link } from 'react-router-dom'; 
import { RiSearchLine, RiShoppingCartLine } from 'react-icons/ri';

export default function Navbar() {
  const categories = [
    {
      id: 1,
      name: 'Celulares',
      link: '/category/celulares',
    },
    {
      id: 2,
      name: 'Audio',
      link: '/category/audio',
    },
    {
      id: 3,
      name: 'Computadoras',
      link: '/category/computadoras',
    },
  ];

  return (
    <div className='bg-gray-100'>
      <nav className='container mx-auto p-4'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <Link to='/'> 
            <button className='text-2xl font-bold mb-4 md:mb-0'>Logo</button>
          </Link>
          <div className='flex flex-grow items-center justify-center mb-4 md:mb-0'>
            <div className='relative dropdown hidden md:block'>
              <button className='mr-6'>Categorías</button>
              <div className='dropdown-content hidden absolute bg-white shadow-lg'>
                {categories.map((category) => (
                  <Link key={category.id} to={category.link}> 
                    <button className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                      {category.name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
            <form className='flex items-center'>
              <input
                type='text'
                placeholder='Buscar...'
                className='border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:border-blue-300 w-96 h-10' // Adjust the width using w-xx classes
                aria-label='Search'
              />
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 flex items-center w-14 h-10'
                aria-label='Submit Search'
              >
                <RiSearchLine size={20} />
              </button>
            </form>
          </div>
          <div className='flex space-x-4'>
            <div className='relative dropdown md:hidden'>
              <button className='mr-6'>Categorías</button>
              <div className='dropdown-content hidden absolute bg-white shadow-lg'>
                {categories.map((category) => (
                  <Link key={category.id} to={category.link}> 
                    <button className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                      {category.name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
            <Link to='/signup'> 
              <button>Crear cuenta</button>
            </Link>
            <button>Ingresar</button>
            <div className='relative'>
              <RiShoppingCartLine size={24} aria-label='Shopping Cart' />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

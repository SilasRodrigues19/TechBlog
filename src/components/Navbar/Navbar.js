import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useAuthValue } from '../../contexts/AuthContext';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <NavLink
              to='/'
              className='text-white font-bold text-lg hover:text-white'
            >
              Tech <span>Blog</span>
            </NavLink>
          </div>
          <div className='hidden md:block'>
            <ul className='flex space-x-4'>
              <li>
                <NavLink
                  to='/'
                  exact
                  className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                >
                  Início
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink
                      to='/login'
                      className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Entrar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/register'
                      className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Cadastrar
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink
                      to='/dashboard'
                      className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Painel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/post/create'
                      className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Criar post
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to='/about'
                  className='inline-block text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                >
                  Sobre
                </NavLink>
              </li>
              {user && (
                <li>
                  <button
                    onClick={logout}
                    className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                  >
                    Sair
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className='md:hidden'>
            <button
              onClick={handleMenuToggle}
              className='text-gray-300 hover:text-white px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            >
              {menuOpen ? (
                <Icon icon='iconamoon:close-duotone' className='h-6 w-6' />
              ) : (
                <Icon icon='ion:menu' className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className='md:hidden'>
            <ul className='mt-2 space-y-2'>
              <li>
                <NavLink
                  to='/'
                  className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                >
                  Inicio
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink
                      to='/login'
                      className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Entrar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/register'
                      className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Cadastrar
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink
                      to='/dashboard'
                      className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Painel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/post/create'
                      className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                    >
                      Criar post
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to='/about'
                  className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                >
                  Sobre
                </NavLink>
              </li>
              {user && (
                <li>
                  <button
                    onClick={logout}
                    className='text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium focus:text-white active:bg-gray-900'
                  >
                    Sair
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

         
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { useAuthValue } from '../../context/AuthContext';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      <NavLink to='/' className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Inicio
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                to='/login'
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/register'
                className={({ isActive }) => (isActive ? styles.active : '')}
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
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Painel
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/post/create'
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Criar post
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

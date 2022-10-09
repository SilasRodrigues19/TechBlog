import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks';

import { useAuthValue } from '../../contexts/AuthContext';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Tech <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Inicio
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.signup
                }
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
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Painel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/post/create"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Criar post
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

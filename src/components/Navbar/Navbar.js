import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to='/'>
        Mini <span>Blob</span>
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

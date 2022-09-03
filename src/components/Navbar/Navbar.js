import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        Mini <span>Blob</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}
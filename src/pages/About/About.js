import styles from './About.module.scss';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

export const About = () => {
  const { user } = useAuthValue();

  return (
    <section className={styles.about}>
      <h2>
        Sobre o Tech <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React para construção da
        interface do usuário e serviços do Firebase utilizados no Back End
      </p>
      <Link className="btn" to={user ? '/post/create' : '/register'}>
        Criar post
      </Link>
    </section>
  );
};

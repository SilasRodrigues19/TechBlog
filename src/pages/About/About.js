import styles from './About.module.scss';

import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <section className={styles.about}>
      <h2>
        Sobre o Tech <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React para construção da
        interface do usuário e serviços do Firebase utilizados no Back End
      </p>
      <Link className="btn" to="/post/create">
        Criar post
      </Link>
    </section>
  );
};

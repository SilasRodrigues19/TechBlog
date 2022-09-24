import styles from './Home.module.scss';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const Home = () => {

  const [query, setQuery] = useState('');
  const [posts] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type='text'
          placeholder='Busque por algum termo...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.hasNoPosts}>
            <div className='error'>
              <p>
                <Icon className='dangerIcon' icon='jam:triangle-danger-f' />
                Não existe nada publicado.
              </p>
            </div>
            <Link to='/posts/create' className='btn'>Criar novo post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

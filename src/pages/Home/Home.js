import styles from './Home.module.scss';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments, useTitle } from '../../hooks';
import { Icon } from '@iconify/react';
import { PostDetail } from '../../components/PostDetail/PostDetail';

export const Home = () => {
  useTitle('Tech Blog');

  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Busque por algum termo..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.postsWrapper}>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.hasNoPosts}>
            <div className="error">
              <p>
                <Icon className="dangerIcon" icon="jam:triangle-danger-f" />
                Não existe nada publicado.
              </p>
            </div>
            <Link to="/post/create" className="btn">
              Criar novo post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

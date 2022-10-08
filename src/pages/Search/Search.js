import { useFetchDocuments, useQuery, useTitle } from '../../hooks';

import { PostDetail } from '../../components/PostDetail/PostDetail';

import { Link } from 'react-router-dom';

import styles from './Search.module.scss';

export const Search = () => {
  const query = useQuery();
  const search = query.get('q').toLowerCase();

  useTitle(`Tech Blog | Resultados para ${search}`);

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className={styles.searchContainer}>
      {posts && posts.length === 0 ? (
        <>
          <p>
            Não foram encontrados posts com o termo{' '}
            <span className={styles.term}>{search}</span>
          </p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </>
      ) : (
        <div className={styles.results}>
          <h2>
            Resultados encontrados para{' '}
            <span className={styles.term}>{search}</span>
          </h2>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      <div>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

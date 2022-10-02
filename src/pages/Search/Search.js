import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

import { PostDetail } from '../../components/PostDetail/PostDetail';

import { Link } from 'react-router-dom';

import styles from './Search.module.scss';

export const Search = () => {
  const query = useQuery();
  const search = query.get('q').toLowerCase();

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
        <h2>
          Resultados encontrados para{' '}
          <span className={styles.term}>{search}</span>
        </h2>
      )}
      <div>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

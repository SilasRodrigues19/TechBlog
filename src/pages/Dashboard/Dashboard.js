import styles from './Dashboard.module.scss';

import { useTitle } from '../../hooks';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks';

export const Dashboard = () => {
  useTitle('Tech Blog | Painel');

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading} = useFetchDocuments('posts', null, uid);

  return (
    <div className={styles.postsWrapper}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.hasNoPosts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
        </div>
      ) : (
        <div>
          <p>Tem posts</p>
        </div>
      )}

      {posts && posts.map((post) => (
        <h3>{post.title}</h3>
      ))}
    </div>
  );
};

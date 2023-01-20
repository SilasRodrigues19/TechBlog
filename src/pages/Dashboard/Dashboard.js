import styles from './Dashboard.module.scss';

import { useTitle } from '../../hooks';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks';

export const Dashboard = () => {
  useTitle('Tech Blog | Painel');

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);
  const deleteDocument = (id) => { }
  
  if (loading) return <p>Carregando...</p>

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
          <>
            <div className={styles.postHeader}>
              <span>Título</span>
              <span>Ações</span>
            </div>
          </>
          
      )}

      {posts && posts.map(({ id, title }) => (
        <div key={id} className={styles.postRow}>
          <p>{title}</p>
          <div className={styles.dashboardBtns}>
            <Link to={`/posts/${id}`} className='btn btn-outline'>Ver</Link>
            <Link to={`/posts/edit/${id}`} className='btn btn-outline'>Editar</Link>
            <button onClick={() => deleteDocument(id)} className='btn btn-outline btn-danger'>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

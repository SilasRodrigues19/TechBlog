import styles from './Post.module.scss';

import { Link, useParams } from 'react-router-dom';

import { useFetchDocument, useTitle } from '../../hooks';

import { Loader } from '../../components';

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  useTitle('Tech Blog | Ver post');

  return (
    <div className={styles.postContainer}>
      {loading && <Loader />}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} loading="lazy" />
          <p className={post.body.length > 150 ? styles.content : ''}>{post.body}</p>
          <h3>Categorias associadas a este post:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>&nbsp;#</span>
                {tag}
              </p>
            ))}
          </div>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </>
      )}
    </div>
  );
};

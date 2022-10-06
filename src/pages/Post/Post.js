import styles from './Post.module.scss';

import { Icon } from '@iconify/react';

import { useParams } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  return (
    <div className={styles.postContainer}>
      {loading && (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '1.5rem',
          }}
        >
          Carregando post
          <Icon icon="eos-icons:bubble-loading" color="#272343" />
        </p>
      )}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Categorias associadas a este post:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>&nbsp;#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

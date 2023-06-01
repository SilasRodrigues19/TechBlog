import styles from './PostDetail.module.scss';

import { Link } from 'react-router-dom';

export const PostDetail = ({ post }) => {
  return (
    <div className={styles.postDetail}>
      <div className={styles.imgBox}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p className={styles.createdBy} key={tag}>
            <span>#</span> {tag}
          </p>
        ))}
      </div>
      <Link to={`/post/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

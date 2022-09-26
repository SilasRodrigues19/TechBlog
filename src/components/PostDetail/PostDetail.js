import styles from './PostDetail.module.scss';

import { Link } from 'react-router-dom';

export const PostDetail = ({ post }) => {
  return (
    <div className={styles.postDetail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p className={styles.createdBy} key={tag}>
            <span>#</span> {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

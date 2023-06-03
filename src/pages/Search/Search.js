import { useFetchDocuments, useQuery, useTitle } from '../../hooks';

import { PostDetail } from '../../components/PostDetail/PostDetail';

import { Link } from 'react-router-dom';

export const Search = () => {
  const query = useQuery();
  const search = query.get('q').toLowerCase();

  useTitle(`Tech Blog | Resultados para ${search}`);

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div>
      {posts && posts.length === 0 ? (
        <>
          <p>Não foram encontrados posts com o termo
            <p>{search}</p>
          </p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </>
      ) : (
        <div>
          <h2>
            Resultados encontrados para{' '}
            <span>{search}</span>
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

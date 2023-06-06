import { useFetchDocuments, useQuery, useTitle } from '../../hooks';

import { PostDetail } from '../../components/PostDetail/PostDetail';

import { Link } from 'react-router-dom';

export const Search = () => {
  const query = useQuery();
  const search = query.get('q').toLowerCase();

  useTitle(`Tech Blog | Resultados para ${search}`);

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className='max-w-screen-lg mx-auto px-4'>
      {posts && posts.length === 0 ? (
        <div className='flex justify-center flex-col items-center w-full'>
          <h1 className='text-3xl text-gray-700 font-bold text-center mb-8'>
            Não foram encontrados posts com o termo
            <p className='font-bold text-gray-500'>{search}</p>
          </h1>
          <Link
            to='/'
            className='inline-block bg-gray-700 hover:bg-gray-600 hover:text-white text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
          >
            Voltar
          </Link>
        </div>
      ) : (
        <div className='flex justify-center flex-col items-center w-full'>
          <h1 className='text-3xl text-gray-700 font-bold text-center mb-8'>
            Resultados encontrados para <span>{search}</span>
          </h1>
          <Link
            to='/'
            className='inline-block bg-gray-700 hover:bg-gray-600 hover:text-white text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
          >
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

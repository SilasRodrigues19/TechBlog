import { Link, useParams } from 'react-router-dom';

import { useFetchDocument, useTitle } from '../../hooks';

import { Loader } from '../../components';

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  useTitle('Tech Blog | Ver post');

  return (
    <div className='max-w-screen-lg mx-auto px-4'>
      {loading && <Loader />}
      {post && (
        <div className='flex justify-center flex-col items-center w-full'>
          <h1 className='text-3xl text-gray-700 font-bold text-center mb-8'>
            {post.title}
          </h1>
          <img
            src={post.image}
            alt={post.title}
            loading='lazy'
            className='w-full h-[10rem] mb-4 rounded-lg object-contain'
          />
          <p className='text-gray-800 mb-4'>{post.body}</p>
          <h3 className='text-lg font-bold mb-2'>
            Categorias associadas a este post:
          </h3>
          <div className='flex flex-wrap'>
            {post.tagsArray.map((tag) => (
              <p
                key={tag}
                className='bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 my-4'
              >
                #{tag}
              </p>
            ))}
          </div>
          <Link
            to='/'
            className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 hover:text-white'
          >
            Voltar
          </Link>
        </div>
      )}
    </div>
  );
};

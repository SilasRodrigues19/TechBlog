import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments, useTitle } from '../../hooks';
import { Icon } from '@iconify/react';
import { PostDetail } from '../../components/PostDetail/PostDetail';

export const Home = () => {
  useTitle('Tech Blog');

  const [query, setQuery] = useState('');
  const { documents: posts } = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) navigate(`/search?q=${query}`);
  };

  return (
    <div>
      <h1 className='text-3xl text-gray-700 font-bold text-center mb-8'>
        Veja os nossos posts mais recentes
      </h1>

      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className='w-full max-w-screen-lg'>
          <div className='flex items-center justify-center'>
            <input
              type='text'
              placeholder='Palavra-chave...'
              onChange={(e) => setQuery(e.target.value)}
              className='w-full px-12 py-4 mr-2 text-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500'
            />

            <button className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'>
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      <div className='flex justify-center'>
        <div className='w-full max-w-screen-lg'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {posts &&
              posts.map((post) => <PostDetail key={post.id} post={post} />)}
            {posts && posts.length === 0 && (
              <div>
                <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
                  <div className='flex items-center'>
                    <Icon
                      className='dangerIcon text-xl mr-2'
                      icon='jam:triangle-danger-f'
                    />
                    <p>Não existe nada publicado</p>
                  </div>
                </div>
                <Link to='/post/create' className='btn'>
                  Criar novo post
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

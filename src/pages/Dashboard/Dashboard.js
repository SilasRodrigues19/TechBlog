import { useTitle, useDeleteDocument } from '../../hooks';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks';
import { Icon } from '@iconify/react';



export const Dashboard = () => {
  useTitle('Tech Blog | Painel');

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);

  const { confirmDelete } = useDeleteDocument('posts');

  const handleDelete = (documentId) => {
    confirmDelete(documentId);
  };
  
  if (loading) return <p>Carregando...</p>


  return (
    <div className='max-w-screen-lg mx-auto px-4'>
      <h2 className='text-3xl text-gray-700 font-bold text-center my-4'>
        Dashboard
      </h2>

      {posts && posts.length === 0 ? (
        <>
          <p className='text-2xl text-gray-500 text-center mb-8'>
            Você ainda não possui nenhuma postagem publicada
          </p>
          <div className='border border-gray-200 bg-white bg-opacity-50 rounded p-4 mb-6'>
            <p className='text-gray-500 mb-2'>Não foram encontrados posts</p>
            <Link
              to='/post/create'
              className='btn btn-primary text-sm px-4 py-2'
            >
              Criar primeiro post
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className='text-2xl text-gray-500 text-center mb-8'>
            Gerencie os seus posts
          </p>
          <div>
            {posts &&
              posts.map(({ id, title }) => (
                <div
                  key={id}
                  className='flex justify-between items-center text-gray-400 border-2 border-gray-100 bg-white bg-opacity-50 rounded-lg p-4 mb-4 shadow-lg'
                >
                  <p className='text-gray-400 font-bold text-lg'>{title}</p>
                  <div className='flex space-x-4'>
                    <Link
                      to={`/post/${id}`}
                      className='text-sm px-4 py-2 text-gray-400 hover:text-gray-500'
                    >
                      <Icon icon='ph:eye-fill' className='h-6 w-6' />
                    </Link>
                    <Link
                      to={`/post/edit/${id}`}
                      className='text-sm px-4 py-2 text-gray-400 hover:text-gray-500'
                    >
                      <Icon
                        icon='material-symbols:edit-rounded'
                        className='h-6 w-6'
                      />
                    </Link>
                    <button
                      onClick={() => handleDelete(id)}
                      className='inline-block text-sm px-4 py-2 text-gray-400 hover:text-gray-500'
                    >
                      <Icon icon='ic:baseline-delete' className='h-6 w-6' />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );


};

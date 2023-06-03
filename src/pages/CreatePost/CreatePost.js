import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';
import { useInsertDocument, useTitle } from '../../hooks';

import { Icon } from '@iconify/react';

export const CreatePost = () => {
  useTitle('Tech Blog | Criar postagem');

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');
  const { insertDocument, response } = useInsertDocument('posts');

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos');
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL');
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate('/');
  };

  return (
    <div>
      <h2 className='text-3xl font-bold mb-4 text-center'>Criar post</h2>
      <p className='text-gray-500 mb-6 text-center'>
        Escreva sobre o que quiser e compartilhe seu conhecimento
      </p>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <label className='mb-4'>
          <span className='text-gray-800'>Título:</span>
          <input
            type='text'
            name='title'
            required
            placeholder='Pense em um bom título'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className='input'
          />
        </label>

        <label className='mb-4'>
          <span className='text-gray-800'>URL da imagem:</span>
          <input
            type='text'
            name='image'
            required
            placeholder='Insira uma imagem que representa o seu post'
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className='input'
          />
        </label>

        <label className='mb-4'>
          <span className='text-gray-800'>Conteúdo:</span>
          <textarea
            name='body'
            required
            placeholder='Insira o conteúdo do post'
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className='input'
          ></textarea>
        </label>

        <label className='mb-4'>
          <span className='text-gray-800'>Tags:</span>
          <input
            type='text'
            name='tags'
            required
            placeholder='Insira as tags separadas por vírgula'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className='input'
          />
        </label>

        {response.isLoading ? (
          <button
            className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
            disabled
          >
            <Icon
              icon='eos-icons:bubble-loading'
              className='m-auto h-6'
              width='24'
              height='24'
            />
          </button>
        ) : (
          <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'>
            Cadastrar
          </button>
        )}

        {response.error && (
          <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
            <div className='flex items-center'>
              <Icon
                className='dangerIcon text-xl mr-2'
                icon='jam:triangle-danger-f'
              />
              <p>{response.error}</p>
            </div>
          </div>
        )}
        {formError && (
          <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
            <div className='flex items-center'>
              <Icon
                className='dangerIcon text-xl mr-2'
                icon='jam:triangle-danger-f'
              />
              <p>{formError}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );

};

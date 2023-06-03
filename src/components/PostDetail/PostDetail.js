import { Link } from 'react-router-dom';

export const PostDetail = ({ post }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md p-4 transition duration-300 hover:shadow-lg"
    >
      <div className='mb-4'>
        <img
          className='w-full h-[10rem] object-contain'
          src={post.image}
          alt={post.title}
          loading='lazy'
        />
      </div>
      <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
      <p className='text-gray-600 mb-2'>{post.createdBy}</p>
      <div className='flex flex-wrap mb-2'>
        {post.tagsArray.map((tag) => (
          <p
            key={tag}
            className='text-gray-500 bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2'
          >
            #{tag}
          </p>
        ))}
      </div>
      <Link
        to={`/post/${post.id}`}
        className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:bg-gray-700 hover:text-white transition-colors duration-200'
      >
        Ler
      </Link>
    </div>
  );


};

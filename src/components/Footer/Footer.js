export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 py-8 text-white text-center'>
      <h3 className='text-2xl font-bold mb-2'>
        Explore o mundo da tecnologia!
      </h3>
      <p className='text-sm my-4'>
        Fique por dentro das últimas tendências, descubra dicas valiosas e
        compartilhe suas experiências no nosso Tech Blog.
      </p>
      <p className='text-sm my-4'>
        Tech Blog &copy; {currentYear} - Todos os direitos reservados
      </p>
    </footer>
  );
};

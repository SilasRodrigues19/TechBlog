import { Icon } from '@iconify/react';

export const Loader = () => {
  return (
    <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-75'>
      <Icon
        icon='line-md:loading-loop'
        color='white'
        width='150'
        height='150'
      />
    </div>
  );
};

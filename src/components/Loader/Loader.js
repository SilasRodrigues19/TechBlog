import styles from './Loader.module.scss';

import { Icon } from '@iconify/react';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Icon
        icon="line-md:loading-loop"
        color="white"
        width="150"
        height="150"
      />
    </div>
  );
};

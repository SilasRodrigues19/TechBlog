import styles from './Dashboard.module.scss';

import { useTitle } from '../../hooks';

export const Dashboard = () => {
  useTitle('Tech Blog | Painel');

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

import React from 'react';

import Table from '../../components/Table';
import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';

const RarityPage = (): JSX.Element => (
  <AppLayout headerText="Rarity handbook">
    <div className={styles.root}>
      <div className={styles.tableContainer}>
        <Table
          className={styles.table}
          header={['Figure', 'Rarity']}
          data={[
            ['Net', '44%'],
            ['Portal', '30%'],
            ['Star', '20%'],
            ['Eye', '5%'],
            ['Wave', '1%'],
          ]}
          size="md"
        />
      </div>
      <div className={styles.tableContainer}>
        <Table
          className={styles.table}
          header={['Color', 'Rarity']}
          data={[
            ['White', '40%'],
            ['Orange', '30%'],
            ['Red', '20%'],
            ['Magenta/Rainbow', '10%'],
          ]}
          size="md"
        />
      </div>
    </div>
  </AppLayout>
);

export default RarityPage;

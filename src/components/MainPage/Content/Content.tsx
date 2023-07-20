import React from 'react';
import styles from './content.css';
import { CardList } from './CardList';


export function Content() {

  return (
    <main className={styles.main}>
      <section className={styles.users}>
        <div className={['container', styles.container].join(' ')}>
          <CardList />
        </div>
      </section>
    </main>
  );
}

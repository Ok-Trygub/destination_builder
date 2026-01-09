import React from 'react';
import styles from './index.module.scss';


const PageTitle: React.FC = React.memo(() => {
    return (
        <h1 className={styles.title}>THIRD PARTY STORAGE</h1>
    );
});

export default PageTitle;
PageTitle.displayName = 'PageTitle';

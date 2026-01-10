import React from 'react';
import styles from "./index.module.scss";


interface IFormWrapperProps {
    children: React.ReactNode,
    isConfigurationPage: boolean
}

const FormWrapper: React.FC<IFormWrapperProps> = React.memo(({children, isConfigurationPage}) => {
    return (
        <div className={isConfigurationPage
            ? `${styles.formWrapper} ${styles.configFormWrapper}`
            : styles.formWrapper}>
            <div className={styles.formInner}>
                <h4 className={styles.formTitle}>Third-Party Storage</h4>
                {children}
            </div>
        </div>
    );
});

export default FormWrapper;
FormWrapper.displayName = 'FormWrapper';

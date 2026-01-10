import React from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import ProviderForm from "@pages/ProviderConfiguration/children/ProviderForm";


const ProviderConfiguration: React.FC = React.memo(() => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>
            <FormWrapper isConfigurationPage={true}>
                <ProviderForm/>
            </FormWrapper>
        </div>
    );
});

export default ProviderConfiguration;
ProviderConfiguration.displayName = 'Provider';

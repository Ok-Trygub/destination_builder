import React from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import FormActions from "@components/FormActions/FormActions";
import {useProviders} from "@pages/Provider/hooks/useProviders";


const Provider: React.FC = () => {
    const {selectedProvider, setSelectedProvider, handleSave, handleCancel, providersList} = useProviders();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>
            <FormWrapper isConfigurationPage={false}>
                <div className={styles.formContent}>
                    <div className={styles.providerInner}>
                        <p className={styles.providerLabel}>Choose Provider</p>
                        <div className={styles.buttonWrapper}>
                            {providersList.map(provider => (
                                <button
                                    key={provider.value}
                                    className={selectedProvider?.value === provider.value
                                        ? `${styles.providerBtn} ${styles.selectedProvider}`
                                        : styles.providerBtn
                                    }
                                    onClick={() => setSelectedProvider(provider)}
                                >
                                    <img src={provider.logo} alt="logo_icon"/>
                                    {provider.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <FormActions
                        isSaveBtnDisabled={!selectedProvider}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </div>
            </FormWrapper>
        </div>
    );
};

export default Provider;
Provider.displayName = 'Provider';

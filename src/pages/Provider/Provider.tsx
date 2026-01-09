import React, {useState} from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import type {IProvider} from "@helpers/providers";
import {providers} from "@helpers/providers";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@enums/appRoutes";


const Provider: React.FC = React.memo(() => {
    const [selectedProvider, setSelectedProvider] = useState<IProvider | undefined>(undefined);
    const navigate = useNavigate();

    const handleSave = () => {
        navigate(AppRoutes.PROVIDER_CONFIGURATION)
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>
            <FormWrapper
                isSaveBtnDisabled={!selectedProvider}
                handleSave={handleSave}
            >
                <div className={styles.providerInner}>
                    <span className={styles.providerLabel}>Choose Provider</span>
                    <div className={styles.buttonWrapper}>
                        {providers.map(provider => (
                            <button
                                className={selectedProvider?.id === provider.id
                                    ? `${styles.providerBtn} ${styles.selectedProvider}`
                                    : styles.providerBtn
                                }
                                onClick={() => setSelectedProvider(provider)}
                            >
                                <img src={provider.logo} alt="aws_icon"/>
                                {provider.name}
                            </button>
                        ))}
                    </div>
                </div>
            </FormWrapper>
        </div>
    );
});

export default Provider;
Provider.displayName = 'Provider';

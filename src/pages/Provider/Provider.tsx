import React, {useMemo, useState} from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import {providers} from "@helpers/providers";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@enums/appRoutes";
import FormActions from "@components/FormActions/FormActions";
import {formatSelectOptions, ISelectOption} from "@helpers/formatSelectOptions";


const Provider: React.FC = React.memo(() => {
    const [selectedProvider, setSelectedProvider] = useState<ISelectOption | undefined>(undefined);
    const navigate = useNavigate();

    const handleSave = (): void => {
        if (!selectedProvider) return;

        navigate(AppRoutes.PROVIDER_CONFIGURATION, {
            state: {
                provider: selectedProvider,
            },
        });
    };

    const handleCancel = (): void => {
        setSelectedProvider(undefined)
    }

    const providersList = useMemo(() => (formatSelectOptions(providers)), [providers]);

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
                                    className={selectedProvider?.value === provider.value
                                        ? `${styles.providerBtn} ${styles.selectedProvider}`
                                        : styles.providerBtn
                                    }
                                    onClick={() => setSelectedProvider(provider)}
                                >
                                    <img src={provider.logo} alt="aws_icon"/>
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
});

export default Provider;
Provider.displayName = 'Provider';

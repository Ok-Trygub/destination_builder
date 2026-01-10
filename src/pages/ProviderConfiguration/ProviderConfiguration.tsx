import React from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import {AppRoutes} from "@enums/appRoutes";
import {useNavigate} from "react-router-dom";


const ProviderConfiguration:React.FC = React.memo(() => {
    const navigate = useNavigate();


    const handleSave = (): void => {

    }

    const handleCancel = (): void => {
        navigate(AppRoutes.HOME)
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>
            <FormWrapper
                isSaveBtnDisabled={true}
                handleSave={handleSave}
                handleCancel={handleCancel}
            >
                <div className={styles.providerInner}>
                    <span className={styles.providerLabel}>Choose Provider</span>







                </div>
            </FormWrapper>
        </div>
    );
});

export default ProviderConfiguration;
ProviderConfiguration.displayName = 'Provider';

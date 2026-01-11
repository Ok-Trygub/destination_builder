import React, {useState} from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import ProviderForm, {IDestinationPayload} from "@pages/ProviderConfiguration/children/ProviderForm/ProviderForm";
import Destinations from "@pages/ProviderConfiguration/children/Destinations/Destinations";


const ProviderConfiguration: React.FC = React.memo(() => {
    const [savedDestinations, setSavedDestinations] = useState<IDestinationPayload[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>

            <FormWrapper isConfigurationPage={true}>
                <ProviderForm
                    setSavedDestinations={setSavedDestinations}
                    setSubmitError={setSubmitError}
                    setIsLoading={setIsLoading}
                />
            </FormWrapper>

            <Destinations
                destinations={savedDestinations}
                isLoading={isLoading}
                submitError={submitError}
            />
        </div>
    );
});

export default ProviderConfiguration;
ProviderConfiguration.displayName = 'ProviderConfiguration';

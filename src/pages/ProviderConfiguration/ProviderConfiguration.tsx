import React, {useState} from 'react';
import styles from './index.module.scss';
import PageTitle from "@components/PageTitle/PageTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import ProviderForm, {IDestinationPayload} from "@pages/ProviderConfiguration/children/ProviderForm";


const ProviderConfiguration: React.FC = React.memo(() => {
    const [savedProviders, setSavedProviders] = useState<IDestinationPayload[]>([]);
    console.log(savedProviders)
    const [submitError, setSubmitError] = useState<string | null>(null);


    return (
        <div className={styles.pageContainer}>
            <div className={styles.titleInner}>
                <PageTitle/>
            </div>
            <FormWrapper isConfigurationPage={true}>
                <ProviderForm
                    setSavedProviders={setSavedProviders}
                    setSubmitError={setSubmitError}
                />
            </FormWrapper>

            <pre>
            <code>{JSON.stringify(savedProviders, null, 2)}</code>
          </pre>
        </div>
    );
});

export default ProviderConfiguration;
ProviderConfiguration.displayName = 'Provider';

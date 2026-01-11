import React from 'react';
import styles from './index.module.scss';
import {IDestinationPayload} from "@/services/saveProviderDestination";


interface IDestinationsProps {
    destinations: IDestinationPayload[],
    isLoading: boolean,
    submitError: string | null
}

const Destinations: React.FC<IDestinationsProps> = React.memo((
    {
        destinations,
        isLoading,
        submitError
    }) => {

    return (
        <div className={styles.destinationsBox}>
            {submitError && <span>{submitError}</span>}

            {!submitError && isLoading && <span>Saving...</span>}
            {destinations.length > 0 &&
                <>
                    {!isLoading && <span>Destinations:</span>}
                    <div className={styles.destinationsWrapper}>
                        <pre>
                            <code>
                                {JSON.stringify(destinations, null, 2)}
                            </code>
                        </pre>
                    </div>
                </>
            }
        </div>

    );
});

Destinations.displayName = 'Destinations';
export default Destinations;

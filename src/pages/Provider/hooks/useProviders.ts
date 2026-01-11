import {useMemo, useState} from "react";
import {formatSelectOptions, ISelectOption} from "@helpers/formatSelectOptions";
import {AppRoutes} from "@enums/appRoutes";
import {providers} from "@helpers/providers";
import {useNavigate} from "react-router-dom";


export const useProviders = () => {
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

    const providersList = useMemo(() => (formatSelectOptions(providers)), []);

    return {
        handleSave,
        handleCancel,
        providersList,
        selectedProvider,
        setSelectedProvider
    }
}

import React, {useEffect, useMemo, useState} from 'react';
import styles from './index.module.scss';
import {Controller, useForm, useWatch} from "react-hook-form";
import {AppRoutes} from "@enums/appRoutes";
import {useLocation, useNavigate} from "react-router-dom";
import FormActions from "@components/FormActions/FormActions";
import SelectInput from "@components/SelectInput/SelectInput";
import {providers} from "@helpers/providers";
import {formatSelectOptions, ISelectOption} from "@helpers/formatSelectOptions";
import Input from "@components/Input/Input";
import {regions} from "@helpers/regions";
import {SingleValue} from "react-select";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {buildDestinationUrl} from "@pages/ProviderConfiguration/helpers/buildDestinationUrl";
import {Providers} from "@enums/providers";


interface IProviderForm {
    provider: SingleValue<ISelectOption>,
    bucketName: string,
    regionName: SingleValue<ISelectOption> | null,
    accessKeyId: string,
    secretAccessKey: string
}

interface IDestination {
    url: string,
    key: string,
    secret: string
}

export interface IDestinationPayload {
    destination: IDestination
}

interface IBackendError {
    field: string;
    message: string;
}

interface IProviderFormProps {
    setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
    setSavedDestinations: React.Dispatch<React.SetStateAction<IDestinationPayload[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProviderForm: React.FC<IProviderFormProps> = React.memo((
    {
        setSubmitError,
        setSavedDestinations,
        setIsLoading
    }) => {
    const [isVisibleKey, setIsVisibleKey] = useState(false);
    const {
        handleSubmit,
        control,
        formState: {errors, isValid},
        setValue,
        setError,
        clearErrors,
        reset
    } = useForm<IProviderForm>({
        mode: "onChange",
        defaultValues: {
            provider: undefined,
            bucketName: "",
            regionName: null,
            accessKeyId: "",
            secretAccessKey: ""
        }
    });
    const navigate = useNavigate();
    const location = useLocation();


    const selectedProvider = useWatch({control, name: "provider"});

    useEffect(() => {
        if (location.state) {
            const providerFromRoute = location.state.provider;

            if (providerFromRoute) {
                setValue("provider", providerFromRoute);
                navigate(AppRoutes.PROVIDER_CONFIGURATION, {replace: true, state: null});
            }
        }
    }, []);


    const handleSubmitForm = async (data: IProviderForm): Promise<void> => {
        setSubmitError(null);
        setIsLoading(true);
        clearErrors("accessKeyId");

        const provider = data.provider!.label;
        const key = data.accessKeyId.trim();
        const secret = data.secretAccessKey.trim();

        const url = buildDestinationUrl(provider, data.regionName, data.bucketName);

        const payload: IDestinationPayload = {
            destination: {url, key, secret}
        };

        try {
            await submitDestination(payload);
        } finally {
            setIsLoading(false);
        }
    };


    const saveProviderDestination = async (payload: IDestinationPayload): Promise<IDestinationPayload> => {
        await new Promise((r) => setTimeout(r, 2000));

        if (/\d/.test(payload.destination.key)) {
            throw {
                field: "accessKeyId",
                message: "Access Key ID must not contain digits.",
            };
        }
        return payload;
    };


    const submitDestination = async (payload: IDestinationPayload): Promise<void> => {
        try {
            const resp = await saveProviderDestination(payload);
            setSavedDestinations((prev) => [resp, ...prev]);

            reset({
                provider: selectedProvider,
                bucketName: undefined,
                regionName: null,
                accessKeyId: undefined,
                secretAccessKey: undefined,
            });
        } catch (e) {
            const err = e as IBackendError;
            if (err.field === "accessKeyId" && err.message) {
                setError("accessKeyId", {type: "server", message: err.message});
                return;
            }
            setSubmitError("Failed to save provider.");
        }
    };

    const handleCancel = (): void => {
        navigate(AppRoutes.HOME)
    }

    const providersOptions = useMemo(() => (formatSelectOptions(providers)), [providers]);
    const regionsOptions = useMemo(() => (formatSelectOptions(regions)), [regions]);

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
            {
                selectedProvider ?
                    <div className={styles.formContent}>
                        <div className={styles.inputLabel}>Choose Provider</div>
                        <Controller
                            control={control}
                            name="provider"
                            rules={{required: "Provider is required field"}}
                            render={({field: {value, onChange}}) => (
                                <SelectInput
                                    value={value}
                                    name={"provider"}
                                    onChange={(option) => {
                                        onChange(option)
                                    }}
                                    options={providersOptions}
                                />
                            )}
                        />
                        {errors.provider?.message && (
                            <div className={styles.formError}>{errors.provider.message}</div>
                        )}
                        <div className={styles.inputsInner}>
                            <div>
                                <label className={styles.inputLabel}>Bucket Name</label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "Provider is required field",
                                        minLength: {value: 3, message: "Bucket Name must be at least 3 characters"}
                                    }}
                                    name="bucketName"
                                    render={({field: {value, onChange}}) => (
                                        <Input
                                            onChange={(e) => onChange(e.target.value)}
                                            value={value}
                                            name="bucketName"
                                        />
                                    )}
                                />
                                {errors.bucketName?.message && (
                                    <div className={styles.formError}>{errors.bucketName.message}</div>
                                )}
                            </div>
                            {selectedProvider.label.includes(Providers.AWS) &&
                                <div>
                                    <label className={styles.inputLabel}>Region Name</label>
                                    <Controller
                                        control={control}
                                        name="regionName"
                                        rules={{required: "Region Name is required field"}}
                                        render={({field: {value, onChange}}) => (
                                            <SelectInput
                                                value={value}
                                                name={"regionName"}
                                                onChange={(option) => {
                                                    onChange(option)
                                                }}
                                                options={regionsOptions}
                                            />
                                        )}
                                    />
                                    {errors.regionName?.message && (
                                        <div className={styles.formError}>{errors.regionName.message}</div>
                                    )}
                                </div>
                            }
                        </div>

                        <div className={styles.inputsInner}>
                            <div>
                                <label className={styles.inputLabel}>Access Key ID</label>
                                <Controller
                                    control={control}
                                    name="accessKeyId"
                                    rules={{required: "Access Key ID is required field"}}
                                    render={({field: {value, onChange}}) => (
                                        <Input
                                            onChange={(e) => onChange(e.target.value)}
                                            value={value}
                                            name="accessKeyId"
                                        />
                                    )}
                                />
                                {errors.accessKeyId?.message && (
                                    <div className={styles.formError}>{errors.accessKeyId.message}</div>
                                )}
                            </div>
                            <div className={styles.inputInner}>
                                <label className={styles.inputLabel}>Secret Access Key</label>
                                <Controller
                                    control={control}
                                    name="secretAccessKey"
                                    rules={{required: "Secret Access Key is required field"}}
                                    render={({field: {value, onChange}}) => (
                                        <div className={styles.secretKeyBtn}>
                                            <Input
                                                onChange={(e) => onChange(e.target.value)}
                                                value={value}
                                                name="secretAccessKey"
                                                type={isVisibleKey ? "text" : "password"}
                                            />
                                            <button
                                                type="button"
                                                className={styles.eyeBtn}
                                                onClick={() => setIsVisibleKey(!isVisibleKey)}
                                            >
                                                {isVisibleKey
                                                    ? <AiOutlineEye size={16}/>
                                                    : <AiOutlineEyeInvisible size={16}/>
                                                }
                                            </button>
                                        </div>
                                    )}
                                />
                                {errors.secretAccessKey?.message && (
                                    <div className={styles.formError}>{errors.secretAccessKey.message}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    : <div className={styles.errorMessage}>
                        <p>Provider not selected.</p>
                        <p>Click the "Cancel" button and select a provider.</p>
                    </div>
            }
            <FormActions
                isSaveBtnDisabled={!selectedProvider || !isValid}
                handleCancel={handleCancel}
            />
        </form>
    );
});

export default ProviderForm;
ProviderForm.displayName = 'ProviderForm';

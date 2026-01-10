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
import {AiOutlineEye} from "react-icons/ai";
import {AiOutlineEyeInvisible} from "react-icons/ai";
import {buildDestinationUrl} from "@pages/ProviderConfiguration/helpers/buildDestinationUrl";
import {Providers} from "@enums/providers";


interface IProviderForm {
    provider: SingleValue<ISelectOption>,
    bucketName: string | undefined,
    regionName: SingleValue<ISelectOption>,
    accessKeyId: string | undefined,
    secretAccessKey: string | undefined
}

interface IDestination {
    url: string,
    key: string,
    secret: string
}

export interface IDestinationPayload {
    destination: IDestination
}

interface IProviderFormProps {
    setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
    setSavedProviders: React.Dispatch<React.SetStateAction<IDestinationPayload[]>>
}

const ProviderForm: React.FC<IProviderFormProps> = React.memo((
    {
        setSubmitError,
        setSavedProviders
    }) => {
    const [isVisibleKey, setIsVisibleKey] = useState(false);
    const {handleSubmit, control, formState: {errors, isValid}, setValue} = useForm<IProviderForm>({
        mode: "onChange",
        defaultValues: {
            provider: undefined,
            bucketName: undefined,
            regionName: undefined,
            accessKeyId: undefined,
            secretAccessKey: undefined
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


    const handleSubmitForm = (data: IProviderForm) => {
        setSubmitError(null);
        const provider = data.provider!.label;
        const bucket = data.bucketName ?? "";
        const key = data.accessKeyId ?? "";
        const secret = data.secretAccessKey ?? "";

        const url = buildDestinationUrl(provider, data.regionName, bucket);

        const payload: IDestinationPayload = {
            destination: {url, key, secret}
        };

        submitDestination(payload);
    };


    const saveProviderDestination = async (payload: IDestinationPayload): Promise<IDestinationPayload> => {
        await new Promise((r) => setTimeout(r, 5000));
        return payload;
    };

    const submitDestination = (payload: IDestinationPayload) => {
        (async () => {
            try {
                const resp = await saveProviderDestination(payload);
                setSavedProviders((prev) => [...prev, resp]);
            } catch {
                setSubmitError("Failed to save provider.");
            }
        })();
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
                            rules={{required: true}}
                            render={({field: {value, onChange}}) => (
                                <SelectInput
                                    value={value}
                                    name={"provider"}
                                    onChange={(options) => {
                                        onChange(options)
                                    }}
                                    options={providersOptions}
                                />
                            )}
                        />
                        {errors?.provider?.type === "required" &&
                            <div className={styles.formError}>Provider is required field</div>}
                        <div className={styles.inputsInner}>
                            <div>
                                <label className={styles.inputLabel}>Bucket Name</label>
                                <Controller
                                    control={control}
                                    rules={{
                                        minLength: 3,
                                        required: true
                                    }}
                                    name="bucketName"
                                    render={({field: {value, onChange}}) => (
                                        <Input
                                            onChange={(e) => onChange(e)}
                                            value={value}
                                            name="bucketName"
                                        />
                                    )}
                                />
                                {errors?.bucketName?.type === "minLength" &&
                                    <div className={styles.formError}>Bucket Name must be at least 3 characters</div>}
                                {errors?.bucketName?.type === "required" &&
                                    <div className={styles.formError}>Bucket Name is required field</div>}
                            </div>
                            {selectedProvider.label.includes(Providers.AWS) &&
                                <div>
                                    <label className={styles.inputLabel}>Region Name</label>
                                    <Controller
                                        control={control}
                                        name="regionName"
                                        render={({field: {value, onChange}}) => (
                                            <SelectInput
                                                value={value}
                                                name={"regionName"}
                                                onChange={(options) => {
                                                    onChange(options)
                                                }}
                                                options={regionsOptions}
                                            />
                                        )}
                                    />
                                    {errors?.regionName?.type === "required" &&
                                        <div className={styles.formError}>Region Name is required field</div>}
                                </div>
                            }
                        </div>

                        <div className={styles.inputsInner}>
                            <div>
                                <label className={styles.inputLabel}>Access Key ID</label>
                                <Controller
                                    control={control}
                                    name="accessKeyId"
                                    rules={{required: true}}
                                    render={({field: {value, onChange}}) => (
                                        <Input
                                            onChange={(e) => onChange(e)}
                                            value={value}
                                            name="accessKeyId"
                                        />
                                    )}
                                />
                                {errors?.accessKeyId?.type === "required" &&
                                    <div className={styles.formError}>Access Key ID is required field</div>}
                            </div>
                            <div className={styles.inputInner}>
                                <label className={styles.inputLabel}>Secret Access Key</label>
                                <Controller
                                    control={control}
                                    name="secretAccessKey"
                                    rules={{required: true}}
                                    render={({field: {value, onChange}}) => (
                                        <div className={styles.secretKeyBtn}>
                                            <Input
                                                onChange={(e) => onChange(e)}
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
                                {errors?.secretAccessKey?.type === "required" &&
                                    <div className={styles.formError}>Secret Access Key is required field</div>}
                            </div>
                        </div>
                    </div>
                    : <div className={styles.errorMessage}>
                        <p>Provider not selected.</p>
                        <p>Click the "Cancel" button and select a provider.</p>
                    </div>
            }
            <FormActions
                isSaveBtnDisabled={!isValid}
                handleCancel={handleCancel}
            />
        </form>
    );
});

export default ProviderForm;
ProviderForm.displayName = 'ProviderForm';

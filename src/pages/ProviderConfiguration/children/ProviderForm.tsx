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


interface IProviderForm {
    provider: SingleValue<ISelectOption>,
    bucketName: string | undefined,
    regionName: SingleValue<ISelectOption>,
    accessKeyId: string | undefined,
    secretAccessKey: string | undefined
}


const ProviderForm = React.memo(() => {
    const [isVisibleKey, setIsVisibleKey] = useState(false);
    const {handleSubmit, control, formState: {errors}, setValue} = useForm<IProviderForm>({
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


    const handleSubmitForm = (): void => {

    }

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
                        <div className={styles.inputsInner}>
                            <div>
                                <label className={styles.inputLabel}>Bucket Name</label>
                                <Controller
                                    control={control}
                                    rules={{
                                        minLength: 3
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
                            </div>
                            {selectedProvider.label.includes("Google Cloud") &&
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
                            </div>
                            <div className={styles.inputInner}>
                                <label className={styles.inputLabel}>Secret Access Key</label>
                                <Controller
                                    control={control}
                                    name="secretAccessKey"
                                    rules={{required: false}}
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
                            </div>
                        </div>
                    </div>
                    : <div className={styles.errorMessage}>
                        <p>Provider not selected.</p>
                        <p>Click the "Cancel" button and select a provider.</p>
                    </div>
            }
            <FormActions
                isSaveBtnDisabled={false}
                handleCancel={handleCancel}
            />
        </form>
    );
});

export default ProviderForm;
ProviderForm.displayName = 'ProviderForm';

import React from 'react';
import styles from "./index.module.scss";
import ActionButton from "@components/ActionButton/ActionButton";



interface IFormWrapperProps {
    children: React.ReactNode,
    isSaveBtnDisabled: boolean,
    handleSave: () => void,
}

const FormWrapper: React.FC<IFormWrapperProps> = React.memo((
    {
        children,
        isSaveBtnDisabled,
        handleSave
    }) => {
    return (
        <div className={styles.formWrapper}>
            <div className={styles.formContent}>
                <div>
                    <h4 className={styles.formTitle}>Third-Party Storage</h4>
                    {children}
                </div>
                <div className={styles.actionsWrapper}>
                    <ActionButton>Cancel</ActionButton>
                    <ActionButton
                        width={64}
                        disabled={isSaveBtnDisabled}
                        onClick={handleSave}
                    >
                        Save
                    </ActionButton>
                </div>
            </div>
        </div>
    );
});

export default FormWrapper;
FormWrapper.displayName = 'FormWrapper';

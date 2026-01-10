import React from 'react';
import styles from './index.module.scss';
import Button from "@components/Button/Button";


interface IFormActions {
    isSaveBtnDisabled: boolean,
    handleSave?: () => void,
    handleCancel: () => void,
}

const FormActions: React.FC<IFormActions> = React.memo((
    {
        isSaveBtnDisabled,
        handleSave,
        handleCancel
    }) => {
    return (
        <div className={styles.actionsWrapper}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
                width={64}
                disabled={isSaveBtnDisabled}
                onClick={handleSave}
            >
                Save
            </Button>
        </div>
    );
});

export default FormActions;
FormActions.displayName = 'FormActions';

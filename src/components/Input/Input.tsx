import React, {InputHTMLAttributes} from 'react';
import styles from "./index.module.scss";


export interface ICustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}


const Input: React.FC<ICustomInputProps> = ({label, ...props}) => {
    return (
        <input
            className={styles.input}
            id={label ? label : undefined}
            {...props}
        />
    );
};

Input.displayName = 'Input';
export default Input;

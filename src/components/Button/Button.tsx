import React, {memo} from "react";
import type {ButtonHTMLAttributes} from "react";
import styles from "./index.module.scss";

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    width?: number;
    children: React.ReactNode;
};

const Button = memo(({width, children, style, ...props}: IActionButton) => {
    return (
        <button
            {...props}
            className={styles.button}
            style={{width: width ?? 78}}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";
export default Button;

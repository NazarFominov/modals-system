import {FC, HTMLAttributes, PropsWithChildren} from 'react';
import clsx from 'clsx';

import styles from './index.module.css'

type ButtonProps = PropsWithChildren<{
    className?: string;
}> & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({children, className, ...props}) => {

    return (
        <button
            className={clsx(styles.button, className)}
            {...props}
        >
            {children}
        </button>
    );
};

import {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
} from 'react';
import {model} from '../model';
import styles from './index.module.css'
import {Button} from "shared/ui/atoms";

type ModalProps = PropsWithChildren<{
    onClose?: () => void;
    className?: string;
    title?: ReactNode;
}>;

export const Modal = ({
                          children,
                          onClose,
                          title,
                      }: ModalProps) => {
    const handleClose = useCallback(() => {
        if (onClose) {
            onClose?.();
        } else {
            model.closeActive();
        }
    }, [onClose]);

    const closeOnEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        },
        [handleClose],
    );

    useEffect(() => {
        window.addEventListener('keydown', closeOnEscape);

        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [closeOnEscape]);

    return (
        <div className={styles.modalWrap} onClick={handleClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    <h3>{title}</h3>
                    <Button onClick={handleClose}>
                        Крестик
                    </Button>
                </header>
                {children}
            </div>
        </div>
    );
};

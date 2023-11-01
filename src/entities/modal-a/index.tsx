import {Modal, modalsModel, ModalsRegistry} from "shared/lib";

import styles from './index.module.css'
import {Button} from "shared/ui/atoms";
import {useUnit} from "effector-react";

export const ModalA = () => {
    const addModal = useUnit(modalsModel.addModal)

    const openBModal = () => {
        addModal({name: ModalsRegistry.ModalB, props: {from: "из окна А"}})
    }

    const openCModal = () => {
        addModal({name: ModalsRegistry.ModalB})
    }


    return <Modal title="Модальное окно A">
        <p>Привет</p>
        <div className={styles.button}>
            <Button onClick={openBModal}>Открыть окно B</Button>
            <Button onClick={openCModal}>Открыть окно C</Button>
        </div>
    </Modal>
}

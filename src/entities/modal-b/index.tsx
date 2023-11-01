import {Modal, modalsModel, ModalsRegistry} from "shared/lib";

import styles from './index.module.css'
import {Button} from "shared/ui/atoms";
import {useUnit} from "effector-react";
import {FC} from "react";

type ModalBProps = {
    from: string
}

export const ModalB: FC<ModalBProps> = ({from}) => {
    const addModal = useUnit(modalsModel.addModal)

    const openAModal = () => {
        addModal({name: ModalsRegistry.ModalA})
    }

    const openCModal = () => {
        addModal({name: ModalsRegistry.ModalC})
    }


    return <Modal title="Модальное окно B">
        <p>Меня открыли из {from}</p>
        <div className={styles.button}>
            <Button onClick={openAModal}>Открыть окно A</Button>
            <Button onClick={openCModal}>Открыть окно C</Button>
        </div>
    </Modal>
}

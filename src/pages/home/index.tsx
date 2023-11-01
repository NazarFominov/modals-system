import {Button} from "shared/ui/atoms";
import styles from "./index.module.css"
import {useUnit} from "effector-react";
import {modalsModel, ModalsRegistry} from "../../shared/lib";

export const HomePage = () => {
    const addModal = useUnit(modalsModel.addModal)

    const openAModal = () => {
        addModal({name: ModalsRegistry.ModalA})
    }

    const openBModal = () => {
        addModal({name: ModalsRegistry.ModalB, props: {from: "главной страницы"}})
    }

    return <div className={styles.page}>
        <div className={styles.buttons}>
            <Button onClick={openAModal}>Открыть окно A</Button>
            <Button onClick={openBModal}>Открыть окно B</Button>
        </div>
    </div>
}

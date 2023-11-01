import {Modal, modalsModel} from "shared/lib";

import {Button} from "shared/ui/atoms";
import {useUnit} from "effector-react";
import {FC} from "react";


export const ModalC: FC = () => {
    const closeAll = useUnit(modalsModel.closeAll)

    return <Modal title="Модальное окно C">
        <p>Конечная</p>
        <Button onClick={closeAll}>Закрыть все окна</Button>
    </Modal>
}

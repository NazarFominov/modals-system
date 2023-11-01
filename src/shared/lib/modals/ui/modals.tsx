import { useStore } from 'effector-react';
import { Provider } from 'effector-react/scope';
import { modalsRegistry } from '../lib';
import { model } from '../model';

export const Modals = () => {
    const modal = useStore(model.$topViewModal);

    if (!modal) {
        return null;
    }

    const ModalComponent = modalsRegistry.get(modal.name);

    if (!ModalComponent) {
        console.error(`Modal ${modal.name} not found`);

        return null;
    }

    return (
        <Provider value={modal.scope}>
            <ModalComponent uuid={modal.uuid} {...modal.props} />
        </Provider>
    );
};

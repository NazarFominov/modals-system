import {register} from "shared/lib";
import {ModalA, ModalB, ModalC} from "entities";

[
    {name: 'Modals.ModalA', component: ModalA},
    {name: 'Modals.ModalB', component: ModalB},
    {name: 'Modals.ModalC', component: ModalC},
].forEach(register);

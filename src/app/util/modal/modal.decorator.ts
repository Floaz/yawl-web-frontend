
import { ModalContainer } from './modal-container';


export function Modal() {
    return function (target) {
        Object.assign(target.prototype,  ModalContainer.prototype);
    };
}

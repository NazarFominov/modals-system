import {v4 as uuidv4} from 'uuid';
import {allSettled, createEffect, createEvent, createStore, Event, fork, sample} from 'effector';
import {Modal} from './lib';

const closeAll = createEvent();
``
const $modals = createStore<Array<Modal>>([]).reset(closeAll);
const addModal = createEvent<{
    name: string;
    props?: Record<string, unknown>;
}>();
const replaceModal = createEvent<{
    name: string;
    props?: Record<string, unknown>;
}>();

sample({
    clock: addModal,
    source: $modals,
    fn: (modals, {name, props}) => [
        {
            uuid: uuidv4(),
            scope: fork(),
            name,
            props,
        },
        ...modals,
    ],
    target: $modals,
});

sample({
    clock: replaceModal,
    source: $modals,
    fn: (modals, {name, props}) => [
        {
            uuid: uuidv4(),
            scope: fork(),
            name,
            props,
        },
        ...modals.slice(1),
    ],
    target: $modals,
});

const $viewPosition = createStore<number>(0);
const $topViewModal = sample({
    source: [$modals, $viewPosition],
    fn: ([modals, viewPosition]: [Array<Modal, number>]) => modals?.[viewPosition] || null,
});

const switchLeft = createEvent();
const switchRight = createEvent();

sample({
    clock: $modals,
    source: $viewPosition,
    fn: (position, modals) => {
        if (position >= modals.length) {
            return 0;
        }

        return position;
    },
    target: $viewPosition,
});

sample({
    clock: switchLeft,
    source: {modals: $modals, position: $viewPosition},
    fn: ({modals, position}) => {
        const newPosition = position - 1;
        if (newPosition < 0) {
            return modals.length - 1;
        }

        return newPosition;
    },
    target: $viewPosition,
});

sample({
    clock: switchRight,
    source: {modals: $modals, position: $viewPosition},
    fn: ({modals, position}) => {
        const newPosition = position + 1;
        if (newPosition >= modals.length) {
            return 0;
        }

        return newPosition;
    },
    target: $viewPosition,
});

export const closeActive = createEvent();

sample({
    clock: closeActive,
    source: {modals: $modals, position: $viewPosition},
    fn: ({modals, position}) => [...modals.slice(0, position), ...modals.slice(position + 1)],
    target: $modals,
});

export const closeCount = createEvent<number>();

sample({
    clock: closeCount,
    source: {modals: $modals, position: $viewPosition},
    fn: ({modals, position}, count) => [
        ...modals.slice(0, position),
        ...modals.slice(position + count),
    ],
    target: $modals,
});

const callEventForAll = createEvent<{ event: Event<unknown>; params: unknown }>();
const callEventForAllFx = createEffect(
    async ({modals, event, params}: { modals: Array<Modal>; event: Event<unknown>; params: unknown }) => {
        await Promise.all(
            modals.map(async ({scope}) => {
                if (!scope) {
                    return;
                }

                await allSettled(event, {scope, params});
            }),
        );
    },
);

sample({
    clock: callEventForAll,
    source: $modals,
    fn: (modals, {event, params}) => ({modals, event, params}),
    target: callEventForAllFx,
});

const resetOverflowFx = createEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
        return;
    }

    body.style.removeProperty('overflow');
});

sample({
    source: $modals,
    filter: ({length}) => length === 0,
    target: resetOverflowFx,
});

export const model = {
    $modals,
    $topViewModal,
    addModal,
    replaceModal,
    switchLeft,
    closeActive,
    closeCount,
    closeAll,
    callEventForAll,
};

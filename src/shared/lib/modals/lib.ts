import { FC } from 'react';
import { Scope } from 'effector';

export type Modal = {
    uuid: string;
    name: string;
    scope?: Scope;
    props?: Record<string, unknown>;
};

export const modalsRegistry = new Map<string, FC<unknown>>();

export const register = ({ name, component }: { name: string; component: FC<unknown> }) => {
    modalsRegistry.set(name, component);
};

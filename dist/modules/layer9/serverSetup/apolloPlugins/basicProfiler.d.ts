import { genContextUtil } from '../../../layer3';
import * as types from '../types';
export interface IProfileNode {
    key: string;
    parentKey: string;
    startMs: number;
    endMs: number;
    totalMs: number;
}
export interface IOnExecutionDidEndInput {
    key2ProfileNode: Record<string, IProfileNode>;
}
export type FnOnExecutionDidEnd = (input: IOnExecutionDidEndInput) => void;
export declare function genFnGenPluginList<TContext extends genContextUtil.IAbstractContext>({ rootKey, onExecutionDidEnd }: {
    rootKey: string;
    onExecutionDidEnd: FnOnExecutionDidEnd;
}): types.FnGenPluginList<TContext>;

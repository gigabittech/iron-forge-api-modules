import { genContextUtil } from '../../layer3';
import * as types from './types';
export * from './types';
export * as apolloPlugins from './apolloPlugins';
export declare function startServer<TContext extends genContextUtil.IAbstractContext>(config: types.IConfig<TContext>): Promise<void>;

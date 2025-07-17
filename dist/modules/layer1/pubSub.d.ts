import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub, withFilter } from 'graphql-subscriptions';
export interface IElastiCache {
    path?: string;
    host?: string;
    port?: number;
    enableTls?: boolean;
}
export interface IConfig {
    aws: {
        elastiCache?: IElastiCache;
    };
}
export declare function init(config: IConfig): void;
export declare function getPubSub(): PubSub | RedisPubSub;
export declare function iterator2Iterable<T>(iterator: AsyncIterator<T>): AsyncIterable<T>;
export declare function withFilter2Iterable<TParent, TVariables, TContext, TInfo>(withFilterReturnValue: ReturnType<typeof withFilter>, parent?: TParent, variables?: TVariables, context?: TContext, info?: TInfo): AsyncIterable<any>;

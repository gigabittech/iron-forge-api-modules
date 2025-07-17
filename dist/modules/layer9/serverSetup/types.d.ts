import { ApolloServerPlugin } from '@apollo/server';
import { GraphQLSchema } from 'graphql';
import http from 'http';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import { IMocks } from '@graphql-tools/mock';
import { WebSocketServer } from 'ws';
import { pubSub } from '../../layer1';
import { genContextUtil } from '../../layer3';
import { resolverUtil } from '../../layer4';
export type IResolverAuthenticationGuardConfig = resolverUtil.IAuthenticationGuardConfig;
export type FnCallableGenContext = ReturnType<typeof genContextUtil.init>['callableGenContext'];
export interface IGenPluginListInput {
    disableRequestLoggerPlugin?: IConfigNonGenericBase['disableRequestLoggerPlugin'];
    resolverAuthenticationGuardConfig?: IConfigNonGenericBase['resolverAuthenticationGuardConfig'];
    isProd: IConfigNonGenericBase['isProd'];
    httpServer: http.Server;
    schema: GraphQLSchema;
    callableGenContext: FnCallableGenContext;
    webSocketServer: WebSocketServer;
}
export type FnGenPluginList<TContext extends genContextUtil.IAbstractContext> = (input: IGenPluginListInput) => ApolloServerPlugin<TContext>[];
export type IResolvers = NonNullable<IExecutableSchemaDefinition['resolvers']>;
export interface ISchemaMockConfig {
    enabled: boolean;
    scalarMocks?: IMocks;
}
export interface IConfigNonGenericBase {
    name: string;
    isProd: boolean;
    pubSubConfig: pubSub.IConfig;
    gqlSchemaDirectory: string;
    schemaMockConfig?: ISchemaMockConfig;
    resolvers: IResolvers;
    bodyParserLimit?: string;
    resolverAuthenticationGuardConfig?: IResolverAuthenticationGuardConfig;
    disableRequestLoggerPlugin?: boolean;
}
export type IFullGenContextUtilConfig<TContext extends genContextUtil.IAbstractContext> = genContextUtil.IConfig<TContext>;
export type IPartialGenContextUtilConfig<TContext extends genContextUtil.IAbstractContext> = Pick<IFullGenContextUtilConfig<TContext>, 'fnGenContextFromBase' | 'allowProxyUserRequests' | 'fnCheckUserCanIssueProxyUserRequests'>;
export interface IConfig<TContext extends genContextUtil.IAbstractContext> extends IConfigNonGenericBase {
    genContextUtilConfig: IPartialGenContextUtilConfig<TContext>;
    fnGenPluginList?: FnGenPluginList<TContext>;
}
export declare function calcFullGenContextUtilConfig<TContext extends genContextUtil.IAbstractContext>(config: IConfig<TContext>): IFullGenContextUtilConfig<TContext>;

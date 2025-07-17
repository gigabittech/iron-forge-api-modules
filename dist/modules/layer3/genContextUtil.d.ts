import { IncomingHttpHeaders } from 'http';
import { dbUtil } from '../layer2';
export interface IBaseContext {
    userId: string;
    authProviderUserId: string;
    clientIp: string;
}
export interface IAbstractContext extends Record<string, unknown> {
    base: IBaseContext;
}
export interface IConfig<TContext extends IAbstractContext> {
    environmentName: string;
    isProd: boolean;
    fnGenContextFromBase: (baseContext: IBaseContext, accessToken: string) => Promise<TContext>;
    allowProxyUserRequests?: boolean;
    fnCheckUserCanIssueProxyUserRequests?: (authProviderUserIdFromToken: string) => Promise<boolean>;
}
export declare function init<TContext extends IAbstractContext>(config: IConfig<TContext>): {
    genContext: import("@apollo/server").ContextFunction<[import("@apollo/server/express4").ExpressContextFunctionArgument], TContext>;
    callableGenContext: (headers: IncomingHttpHeaders) => Promise<TContext>;
};
export declare function context2UserData(context: IAbstractContext): dbUtil.IUserData;

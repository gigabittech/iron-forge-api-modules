export interface IConfig {
    generalAppName: string;
    tableNames: {
        audit: {
            graphqlQueryLogEntry: string;
        };
        security: {
            requestAlert: string;
        };
    };
}
export declare function init(config: IConfig): void;
export declare function checkAndNotifyForMultipleAccessDeniedErrors(ipAddress: string, userId: string, authProviderUserId: string): Promise<void>;

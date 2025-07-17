export interface IConfig {
    aws: {
        cognito: {
            region: string;
            userPoolId: string;
        };
    };
}
export declare function init(config: IConfig): void;
/**
 *
 * @param accessToken
 *
 * @returns
 *    Auth provider user ID.
 */
export declare function decodeJwt(accessToken: string): Promise<string>;

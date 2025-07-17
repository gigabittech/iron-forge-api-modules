import { DateTime } from 'luxon';
export interface IConfig {
    aws: {
        region: string;
        cognito: {
            region: string;
            userPoolId: string;
            clientId: string;
        };
        credentials?: {
            accessKeyId: string;
            secretAccessKey: string;
        };
    };
}
export declare function init(config: IConfig): void;
export interface IUserData {
    cognitoId: string;
    email: string;
    phoneNumber: string;
}
export declare function getUserData(id: string): Promise<IUserData | null>;
export declare function getAuthProviderUserId2Email(filterIds?: string[]): Promise<{
    [x: string]: string;
}>;
export type IUserStatus = 'UNCONFIRMED' | 'CONFIRMED' | 'EXTERNAL_PROVIDER' | 'ARCHIVED' | 'UNKNOWN' | 'RESET_REQUIRED' | 'FORCE_CHANGE_PASSWORD';
export interface IListUsersOptions {
    filterUserStatus?: IUserStatus;
}
export declare function listUsers(options?: IListUsersOptions): Promise<IUserFromList[]>;
export interface IUserFromList {
    username: string;
    email: string;
    enabled: boolean;
    userStatus: string;
    createdAt: DateTime | null;
}
export declare function setUserLoginCodePhoneNumber(authProviderUserId: string, phoneNumber: string): Promise<import("@aws-sdk/client-cognito-identity-provider").AdminUpdateUserAttributesCommandOutput>;
export type IMfaMethod = 'sms' | 'softwareToken';
export declare function setUserPreferredMfaMethod(authProviderUserId: string, mfaMethod: IMfaMethod | null): Promise<import("@aws-sdk/client-cognito-identity-provider").AdminSetUserMFAPreferenceCommandOutput>;
export declare function getAuthProviderUserIdFromEmail(email: string): Promise<string>;
export declare function resendRegistrationConfirmationCode(email: string): Promise<void>;
export declare function resetPasswordForUser(authProviderUserId: string): Promise<void>;
export declare function deleteUser(id: string): Promise<void>;

import { Knex } from 'knex';
export interface IConfig {
    generalAppName: string;
    webAppUrl: string;
    tableNames: {
        invite: string;
    };
}
export declare function init(config: IConfig): void;
export type FnGenSubject = (generalAppName: string) => string;
export type FnGenUrl = (webAppUrl: string, inviteCode: string) => string;
export type FnGenBody = (generalAppName: string, inviteUrl: string) => string;
export interface ISendUserInviteEmailArgs {
    trx?: Knex.Transaction;
    inviteId: string;
    fnGenSubject?: FnGenSubject;
    fnGenUrl?: FnGenUrl;
    fnGenBody?: FnGenBody;
}
export declare function sendUserInviteEmail({ trx, inviteId, fnGenSubject, fnGenUrl, fnGenBody }: ISendUserInviteEmailArgs): Promise<void>;
export declare function sendAllUnsentInvites(): Promise<void>;

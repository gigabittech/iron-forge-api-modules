import { cognitoUtil, dbService, jwtUtil, pubSub, dbUtil, appConfigUtil, emailService, fileService, inviteService, securityCheck } from './modules';
export * from './modules';
export interface IInitAllExceptServerConfig {
    cognitoUtil: cognitoUtil.IConfig;
    dbService: dbService.IDatabaseConfig;
    jwtUtil: jwtUtil.IConfig;
    pubSub: pubSub.IConfig;
    dbUtil: dbUtil.IConfig;
    appConfigUtil: appConfigUtil.IConfig;
    emailService: emailService.IConfig;
    fileService: fileService.IConfig;
    inviteService: inviteService.IConfig;
    securityCheck?: securityCheck.IConfig;
}
export declare function initAllExceptServer(config: IInitAllExceptServerConfig): void;

export interface IConfig {
    aws: {
        region: string;
        credentials?: {
            accessKeyId: string;
            secretAccessKey: string;
        };
        ses: {
            fromEmail: string;
        };
    };
    tableNames: {
        emailNotification: string;
    };
}
export declare function init(config: IConfig): void;
export declare function sendEmail({ toEmail, subject, body }: {
    toEmail: string;
    subject: string;
    body: string;
}): Promise<void>;
export declare function fileAndSendNotification({ toEmail, subject, body }: {
    toEmail: string;
    subject: string;
    body: string;
}): Promise<string>;

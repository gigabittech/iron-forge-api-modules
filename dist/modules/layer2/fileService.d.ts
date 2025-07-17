import { Knex } from 'knex';
import { Readable } from 'stream';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { encodedFileUtil } from '../layer1';
export interface IConfig {
    aws: {
        region: string;
        s3: {
            bucketName: string;
            directoryName: string;
        };
        credentials?: {
            accessKeyId: string;
            secretAccessKey: string;
        };
    };
    tableNames: {
        apiFile: string;
        apiFilePresignedUrl?: string;
    };
    fileServiceConfig?: {
        apiFileTableConfig?: {
            useSizeColumn?: boolean;
            usePublicUrlColumn?: boolean;
            useMimeTypeColumn?: boolean;
        };
    };
}
export declare function init(config: IConfig): void;
export declare function getS3KeyFromFileId(fileId: string): Promise<string>;
export interface IGetFileStreamReturn {
    contentType: string;
    rawBody: GetObjectCommandOutput['Body'];
    body: Readable;
}
export declare function getFileStream(s3Key: string): Promise<IGetFileStreamReturn>;
export interface IEncodedFileFileInput {
    type: 'encodedFile';
    encodedFile: encodedFileUtil.EncodedFile;
}
export interface IFileContentStringFileInput {
    type: 'fileContent';
    content: IFileContent;
    tempDirectory?: string;
    encoding?: BufferEncoding;
}
export interface IFileContent {
    fileName: string;
    mimeType: string;
    content: string;
}
export type IFileInput = IEncodedFileFileInput | IFileContentStringFileInput;
export interface IStoreFileArgs {
    fileInput: IFileInput;
    allowPublicAccess?: boolean;
    trx?: Knex.Transaction;
    /**
     * Only meant to be used for debugging purposes.
     */
    disableDeleteLocalFileAfterSuccess?: boolean;
}
export declare function storeFile({ fileInput, allowPublicAccess, trx, disableDeleteLocalFileAfterSuccess }: IStoreFileArgs): Promise<string>;
export declare const defaultPresignedUrlExpiresInS = 900;
export declare function requestPresignedUrl({ requestUserId, userSpecifiedId, fileName, mimeType, allowPublicAccess, expiresInS }: {
    requestUserId: string;
    userSpecifiedId: string;
    fileName: string;
    mimeType: string;
    allowPublicAccess: boolean;
    expiresInS?: number;
}): Promise<{
    apiFileId: string;
    presignedUrl: string;
}>;
export declare function processExpiredPresignedUrls(): Promise<void>;
export declare function completePresignedUrlUpload({ requestUserId, presignedUrlId }: {
    requestUserId: string;
    presignedUrlId: string;
}): Promise<void>;

import { Knex } from 'knex';
export interface IUserData {
    userId: string;
    authProviderUserId: string;
    clientIp: string;
}
export interface IConfig {
    disable: boolean;
    tableNames: {
        audit: {
            logEntry: string;
            graphqlQueryLogEntry: string;
        };
    };
}
export declare function init(config: IConfig): void;
export declare function logInsert<TRowInput extends Record<string, any>>({ trx, userData, tableName, inputData, returnedRowId }: {
    trx: Knex.Transaction;
    userData: IUserData;
    tableName: string;
    inputData: TRowInput;
    returnedRowId: string;
}): Promise<void>;
export declare function logUpdate<TRow extends Record<string, any>>({ trx, userData, tableName, rowId, oldRow, newRow }: {
    trx: Knex.Transaction;
    userData: IUserData;
    tableName: string;
    rowId: string;
    oldRow: TRow;
    newRow: TRow;
}): Promise<void>;
export declare function logDeletes<TRow extends Record<string, any>>({ trx, userData, tableName, oldRows }: {
    trx: Knex.Transaction;
    userData: IUserData;
    tableName: string;
    oldRows: TRow[];
}): Promise<void>;
export interface IGqlError {
    path: (string | number)[];
    originalErrorName: string;
    originalErrorMessage: string;
}
export declare function logGraphqlQuery({ userData, gqlQuery, gqlVariables, response }: {
    userData: IUserData;
    gqlQuery: string;
    gqlVariables: any;
    response: any;
}): Promise<void>;

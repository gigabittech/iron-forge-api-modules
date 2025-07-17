import { Knex } from 'knex';
export interface IConfig {
    tableNames: {
        appConfig: string;
    };
}
export declare function init(config: IConfig): void;
export declare function getConfigValue(key: string, trx?: Knex.Transaction): Promise<any>;

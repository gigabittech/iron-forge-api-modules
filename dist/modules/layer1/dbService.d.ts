import { Knex } from 'knex';
export interface IDatabaseConfig {
    connection: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    pool: {
        min: number;
        max: number;
    };
    debugMode?: boolean;
}
export declare function init(config: IDatabaseConfig): void;
export declare function getDb(): Knex<any, any[]>;

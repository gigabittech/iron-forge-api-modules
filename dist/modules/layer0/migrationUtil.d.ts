import { Knex } from 'knex';
export type IDirection = 'up' | 'down';
export declare function migrateUsingFile(knex: Knex, fileName: string, direction: IDirection): Promise<void>;

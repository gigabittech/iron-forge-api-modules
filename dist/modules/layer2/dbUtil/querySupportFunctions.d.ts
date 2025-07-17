import { Knex } from 'knex';
import * as audit from './shared/audit';
export type FnPreProcessAllQuery = (params: {
    trx: Knex.Transaction;
    builder: Knex;
    userData: audit.IUserData;
}) => Promise<void>;
export type FnPreProcessByIdQuery = (params: {
    trx: Knex.Transaction;
    builder: Knex;
    userData: audit.IUserData;
    ids: readonly string[];
}) => Promise<void>;
export type FnAugmentQuery = (params: {
    trx?: Knex.Transaction;
    builder: Knex;
    query: Knex.QueryBuilder;
    userData: audit.IUserData;
    tableName: string;
}) => void;
export type FnGenAugmentedQuery = (params: {
    trx?: Knex.Transaction;
    builder: Knex;
    query: Knex.QueryBuilder;
    userData: audit.IUserData;
    tableName: string;
}) => Knex.QueryBuilder;
export type FnGetById<TObject> = (params: {
    trx?: Knex.Transaction;
    userData: audit.IUserData;
    id: string;
}) => Promise<TObject | null>;
export type FnGetByIds<TObject> = (params: {
    trx?: Knex.Transaction;
    userData: audit.IUserData;
    ids: ReadonlyArray<string>;
}) => Promise<TObject[]>;
export interface IFnGenRawColumnInput {
    builder: Knex;
    userData: audit.IUserData;
    tableName: string;
}
export type FnGenRawColumn = (input: IFnGenRawColumnInput) => Knex.Raw;
export type FnDbRow2Object<TKeyMap extends Record<string, string | FnGenRawColumn>, TObject> = (row: Record<keyof TKeyMap, any>) => TObject;
export interface PageInfo {
    nextPage?: string | null;
    pages: string[];
    previousPage?: string | null;
    totalRows: number;
}
export interface PaginationInput {
    after?: string | null;
    first?: number | null;
}
export interface IOffsetBasedPaginationInput {
    offset: number;
    limit: number;
}
export declare function gqlPaginationInput2OffsetBasedPaginationInput(gqlPaginationInput?: PaginationInput): IOffsetBasedPaginationInput | null;
/**
 * @returns
 *    An object with several support functions. Notes:
 *    * `__makeBaseSelectQuery()` returns a query builder object that you can add to.
 *    * `__runSelectQueryReturningOne()` adds `.first()` to the query builder, runs
 *      the query, and returns either an object or `null`.
 *    * `__runSelectQueryReturningMany()` runs the query and returns a list of objects.
 */
export declare function genQuerySupportFunctionsWithUserData<TKeyMap extends Record<string, string | FnGenRawColumn>, TObject>({ tableName, objectKey2SqlColumn, fnPreProcessAllQuery, fnPreProcessByIdQuery, fnAugmentBaseQuery, fnGenAugmentedBaseQuery, dbRow2Object }: {
    /**
     * For column names in `objectKey2SqlColumn` that have `.` as the first character,
     * `tableName` will be added as a prefix.
     *
     * Example:
     * With `tableName` set to `site_user`, then the following column name transformations
     * would occur:
     * - `.id` changes to `site_user.id`
     * - `.full_name` changes to `site_user.full_name`
     * - `invite.code` stays the same, since it doesn't start with `.`
     */
    tableName: string;
    objectKey2SqlColumn: TKeyMap;
    /**
     * If specified, runs before `exportable.getAll()`.
     */
    fnPreProcessAllQuery?: FnPreProcessAllQuery;
    /**
     * If specified, runs before `exportable.getById()` and `exportable.getByIds()`.
     */
    fnPreProcessByIdQuery?: FnPreProcessByIdQuery;
    fnAugmentBaseQuery?: FnAugmentQuery;
    fnGenAugmentedBaseQuery?: FnGenAugmentedQuery;
    dbRow2Object: FnDbRow2Object<TKeyMap, TObject>;
}): {
    __genColumns: (builder: Knex, userData: audit.IUserData, baseTableName?: string) => { [P in keyof TKeyMap]: string | Knex.Raw<any>; };
    __genColumnsArray: (builder: Knex, userData: audit.IUserData, baseTableName?: string) => (string | Knex.Raw<any>)[];
    __dbRow2Object: FnDbRow2Object<TKeyMap, TObject>;
    __makeBaseSelectQuery: (userData: audit.IUserData, trx?: Knex.Transaction, disableSelect?: "disableSelect") => Knex.QueryBuilder<{}, ({
        _base: {};
        _hasSelection: boolean;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[] | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    __runSelectQueryReturningOne: (params: {
        trx?: Knex.Transaction;
        userData: audit.IUserData;
        fnAugmentQuery?: FnAugmentQuery;
    }) => Promise<TObject | null>;
    __runSelectQueryReturningMany: (params: {
        trx?: Knex.Transaction;
        userData: audit.IUserData;
        fnAugmentQuery?: FnAugmentQuery;
        /**
         * Same intent as `fnAugmentQuery`, except that instead of using the `query` object handed in,
         * we will use the return value as the query.
         *
         * Most of the time, this is unnecessary. Sometimes, however, you might need to wrap the query
         * being constructed inside of a `WITH` and an outer query. That's where this parameter comes in.
         *
         * If both `fnAugmentQuery` and `fnGenAugmentedQuery` are specified, `fnGenAugmentedQuery` will
         * be used.
         */
        fnGenAugmentedQuery?: FnGenAugmentedQuery;
        /**
         * If given, will override `offsetBasedPaginationInput`.
         */
        gqlPaginationInput?: PaginationInput;
        offsetBasedPaginationInput?: IOffsetBasedPaginationInput;
    }) => Promise<{
        nodes: TObject[];
        pageInfo: PageInfo;
    }>;
    __runSelectQueryReturningCount: (params: {
        trx?: Knex.Transaction;
        userData: audit.IUserData;
        fnAugmentQuery?: FnAugmentQuery;
        /**
         * Same intent as `fnAugmentQuery`, except that instead of using the `query` object handed in,
         * we will use the return value as the query.
         *
         * Most of the time, this is unnecessary. Sometimes, however, you might need to wrap the query
         * being constructed inside of a `WITH` and an outer query. That's where this parameter comes in.
         *
         * If both `fnAugmentQuery` and `fnGenAugmentedQuery` are specified, `fnGenAugmentedQuery` will
         * be used.
         */
        fnGenAugmentedQuery?: FnGenAugmentedQuery;
        /**
         * If given, will override `offsetBasedPaginationInput`.
         */
        gqlPaginationInput?: PaginationInput;
        offsetBasedPaginationInput?: IOffsetBasedPaginationInput;
    }) => Promise<number>;
    exportable: {
        getAll: ({ trx, userData, paginationInput }: {
            trx?: Knex.Transaction;
            userData: audit.IUserData;
            paginationInput?: PaginationInput | null;
        }) => Promise<{
            nodes: TObject[];
            pageInfo: PageInfo;
        }>;
        makeDataLoader: ({ trx, userData }: {
            trx?: Knex.Transaction;
            userData: audit.IUserData;
        }) => import("dataloader")<string, TObject & {
            id: string;
        }, string>;
        getById: FnGetById<TObject>;
        getByIds: FnGetByIds<TObject>;
        archive: (userData: audit.IUserData, id: string, trx?: Knex.Transaction) => Promise<void>;
    };
};
export declare function makeBuilder(trx?: Knex.Transaction): Knex<any, any[]>;
export interface IOffsetBasedPaginationInput {
    offset: number;
    limit: number;
}
export declare function encryptNumber(n: number): string;
export declare function decryptNumber(encrypted: string): number;
export declare function genFnArchive({ tableName, columnName, fnGenQueryGetId, fnPostProcess }: {
    tableName: string;
    columnName?: string;
    fnGenQueryGetId?: (trx: Knex.Transaction, id: string) => Knex.QueryBuilder;
    fnPostProcess?: (trx: Knex.Transaction, userData: audit.IUserData, id: string) => Promise<void>;
}): (userData: audit.IUserData, id: string, trx?: Knex.Transaction) => Promise<void>;
export declare function updateReturningOldAndNew({ trx, tableName, idColumn, id, columnName2Value }: {
    trx: Knex.Transaction;
    tableName: string;
    idColumn?: string;
    id: string | Knex.QueryBuilder;
    columnName2Value: Record<string, any>;
}): Promise<{
    oldRow: any;
    newRow: any;
} | null>;

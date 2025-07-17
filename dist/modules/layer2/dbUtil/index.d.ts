import { Knex } from 'knex';
import * as audit from './shared/audit';
import * as mLock from './lock';
export type { IUserData } from './shared/audit';
export * as audit from './shared/audit';
export * as mLock from './lock';
export * as querySupportFunctions from './querySupportFunctions';
export * as valuesList from './valuesList';
export declare const lock: typeof mLock.lock;
export declare const lockWithRelationshipChecks: typeof mLock.lockWithRelationshipChecks;
export interface IConfig {
    auditConfig: audit.IConfig;
    tableLockingOrder?: string[];
    /**
     * Not recommended. This should only be used as an escape hatch in case the
     * multi-call lock tracking logic has a bug.
     */
    disableMultiCallLockTracking?: boolean;
}
export declare function init(config: IConfig): void;
export interface PageInfo {
    nextPage?: string | null;
    pages: string[];
    previousPage?: string | null;
    totalRows: number;
}
export type PaginationInput = {
    after?: string | null;
    first?: number | null;
};
export declare const dateFormat = "YYYY-MM-DD";
export declare const timeFormat = "HH:mm:ss";
export declare function genDateString(date: Date): string;
export declare function makeBuilder(trx?: Knex.Transaction): Knex<any, any[]>;
/**
 * Intended to be used as the first argument to a `query.whereRaw()` call. The second argument
 * should be an object that includes a key equal to the value of `freeTextIdentifier`.
 *
 * @example
 * ```
 *    query
 *      .whereRaw(dbUtil.genFreeTextMatchRawString(`${tableName}.display_name`, 'freeText'), {
 *        freeText: options.filter.omniFreeText
 *      });
 * ```
 */
export declare function genFreeTextMatchRawString(column: string | Knex.Raw, freeTextIdentifier: string): string;
/**
 * @deprecated
 *    Use `addOmniFreeTextFilter()` instead.
 */
export declare function addFreeTextMatchAcrossMultipleColumnsWhereClause(query: Knex.QueryBuilder, columns: (string | Knex.Raw)[], freeText: string): void;
/**
 * This function adds a filter to the existing query designed to search for a substring
 * across multiple columns.
 *
 * @param builder
 *    A builder given by `makeBuilder()`.
 *
 * @param query
 *    The existing query to which the filter will be added.
 *
 * @param columns
 *    The columns over which to search.
 *    If a string (recommended), the column will have `LOWER()` applied before the search
 *    is performed.
 *    If a `Knex.Raw`, the column will be taken as-is. This is provided as an escape hatch
 *    and should not be necessary in most cases.
 *
 * @param freeText
 *    The substring for which to search. This function will trim the string and convert it
 *    to lowercase before the search is performed.
 */
export declare function addOmniFreeTextFilter(builder: Knex, query: Knex.QueryBuilder, columns: (string | Knex.Raw)[], freeText: string): void;
export type IVariableName2Column = Record<string, string>;
export declare function genRawConcatenationFromColumns(joinString: string, variableName2Column: IVariableName2Column, trx?: Knex.Transaction): Knex.Raw<any>;
export type ISortDirection = 'ascending' | 'descending';
export declare function addSortToQuery<TGqlFields extends string>({ query, gqlField2DbColumn, sortDirection, gqlSortField }: {
    query: Knex.QueryBuilder;
    gqlField2DbColumn: Record<TGqlFields, string | Knex.Raw>;
    sortDirection: ISortDirection;
    gqlSortField: TGqlFields;
}): void;
export declare function makeLowerCaseColumn(builder: Knex, column: string): Knex.Raw<any>;
export declare function genEmptyPageInfo(): PageInfo;
export type IRow<Fn extends (...args: any) => any> = Record<keyof ReturnType<Fn>, any>;
export interface ISaveSets<T extends {
    id?: string | null;
}> {
    idsToDelete: string[];
    valuesToUpdate: (T | null)[];
    valuesToInsert: (T | null)[];
}
export declare function genSaveSets<T extends {
    id?: string | null;
}>(existingValueIds: string[], inputValues: T[]): ISaveSets<T>;
export declare function genSaveSetsByFnGetId<T>({ existingValueIds, objects, fnGetIdFromObject }: {
    existingValueIds: string[];
    objects: T[];
    fnGetIdFromObject: (object: T) => string;
}): {
    idsToDelete: string[];
    valuesToUpdate: (T | null)[];
    valuesToInsert: (T | null)[];
};
export declare function genColumnsForEnum(tableName: string, additionalRawRowKey2DbColumn?: Record<string, string>): {
    id: string;
    name: string;
    displayName: string;
};
export declare function dbRow2GqlObjectForEnum<T>(fnGenShell: (name: string) => T, row: any, additionalGqlObjectKey2FnGenGqlObjectValue?: Record<string, (row: any) => any>): T;
export declare function getEnumObjectsByName<T>(tableName: string, fnGenColumns: () => any, fnDbRow2GqlObject: (row: any) => T, names: string[] | ReadonlyArray<string>): Promise<T[]>;
export declare function getAllEnumValues<T>(tableName: string, fnGenColumns: () => any, fnDbRow2GqlObject: (row: any) => T, fnAugmentBaseQuery?: (query: Knex.QueryBuilder, tableName: string) => void, disableSort?: 'disableSort'): Promise<T[]>;
export declare function genEnumFunctions<TGqlEnum extends string, TGqlObject extends {
    name: TGqlEnum;
}>({ tableName, genShell, additionalRawRowKey2DbColumn, additionalGqlObjectKey2FnGenGqlObjectValue, fnAugmentBaseQuery, disableSort }: {
    tableName: string;
    genShell: (name: TGqlEnum) => TGqlObject;
    additionalRawRowKey2DbColumn?: Record<string, string>;
    additionalGqlObjectKey2FnGenGqlObjectValue?: Record<string, (value: any) => any>;
    fnAugmentBaseQuery?: (query: Knex.QueryBuilder, tableName: string) => void;
    disableSort?: 'disableSort';
}): {
    genColumns: () => {
        id: string;
        name: string;
        displayName: string;
    };
    dbRow2GqlObject: (row: any) => TGqlObject;
    getOptionsByName: (names: string[] | ReadonlyArray<string>) => Promise<TGqlObject[]>;
    getAllValues: () => Promise<TGqlObject[]>;
    makeDataLoader: () => import("dataloader")<string, TGqlObject, string>;
};
export declare function runFunctionsInChunks(fns: (() => Promise<any>)[], chunkSize?: number): Promise<void>;
export declare function mapFunctionsInChunks<T>(fns: (() => Promise<T>)[], chunkSize?: number): Promise<Awaited<T>[]>;
export type FnDbRow2GqlObject<TFnGenColumns extends (...args: any) => any, TGqlObject> = (row: IRow<TFnGenColumns>) => TGqlObject;
export type FnAugmentQuery = (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => void;
export type FnGenAugmentedBaseQuery = (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => Knex.QueryBuilder;
export interface IOffsetBasedPaginationInput {
    offset: number;
    limit: number;
}
export declare function gqlPaginationInput2OffsetBasedPaginationInput(gqlPaginationInput?: PaginationInput): IOffsetBasedPaginationInput | null;
/**
 * Takes an existing query and applies pagination input from GraphQL to it so that
 * the query returns only the specified page.
 *
 * Queries from `genQuerySupportFunctions()` already provide this functionality.
 * `paginateQuery()` exists to provide the same functionality for queries not made
 * from `genQuerySupportFunctions()`.
 */
export declare function paginateQuery({ query, gqlPaginationInput, trx }: {
    query: Knex.QueryBuilder;
    gqlPaginationInput?: PaginationInput;
    trx?: Knex.Transaction;
}): {
    query: Knex.QueryBuilder<any, any>;
    genPageInfoGblObject: () => Promise<PageInfo>;
};
export declare function genFnLock(tableName: string): (trx: Knex.Transaction, idOrIds: string | string[]) => Promise<void>;
/**
 * @returns
 *    An object with several support functions. Notes:
 *    * `__makeBaseSelectQuery()` returns a query builder object that you can add to.
 *    * `__runSelectQueryReturningOne()` adds `.first()` to the query builder, runs
 *      the query, and returns either a GraphQL object or `null`.
 *    * `__runSelectQueryReturningMany()` runs the query and returns a list of GraphQL
 *      objects.
 */
export declare function genQuerySupportFunctions<TKeyMap extends Record<string, string>, TGqlObject>({ tableName, gqlObjectKey2SqlColumn, fnPreProcessAllQuery, fnPreProcessByIdQuery, fnAugmentBaseQuery, fnGenAugmentedBaseQuery, dbRow2GqlObject }: {
    /**
     * For column names in `gqlObjectKey2SqlColumn` that have `.` as the first character,
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
    gqlObjectKey2SqlColumn: TKeyMap;
    /**
     * If specified, runs before `exportable.getAll()`.
     */
    fnPreProcessAllQuery?: (trx: Knex.Transaction, userData?: audit.IUserData) => Promise<void>;
    /**
     * If specified, runs before `exportable.getById()` and `exportable.getByIds()`.
     */
    fnPreProcessByIdQuery?: (trx: Knex.Transaction, ids: readonly string[], userData?: audit.IUserData) => Promise<void>;
    fnAugmentBaseQuery?: FnAugmentQuery;
    fnGenAugmentedBaseQuery?: FnGenAugmentedBaseQuery;
    dbRow2GqlObject: (row: Record<keyof TKeyMap, any>) => TGqlObject;
}): {
    __genColumns: (baseTableName?: string) => { [P in keyof TKeyMap]: string; };
    __genColumnsArray: (baseTableName?: string) => string[];
    __dbRow2GqlObject: (row: Record<keyof TKeyMap, any>) => TGqlObject;
    __makeBaseSelectQuery: (trx?: Knex.Transaction, disableSelect?: "disableSelect") => Knex.QueryBuilder<{}, ({
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
    __runSelectQueryReturningOne: (params?: {
        fnAugmentQuery?: (query: Knex.QueryBuilder, tableName: string) => void;
        trx?: Knex.Transaction;
    } | undefined) => Promise<TGqlObject | null>;
    __runSelectQueryReturningMany: (params?: {
        fnAugmentQuery?: (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => void;
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
        fnGenAugmentedQuery?: (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => Knex.QueryBuilder;
        /**
         * If given, will override `offsetBasedPaginationInput`.
         */
        gqlPaginationInput?: PaginationInput;
        offsetBasedPaginationInput?: IOffsetBasedPaginationInput;
        trx?: Knex.Transaction;
    }) => Promise<{
        nodes: TGqlObject[];
        pageInfo: PageInfo;
    }>;
    __runSelectQueryReturningCount: (params?: {
        fnAugmentQuery?: (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => void;
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
        fnGenAugmentedQuery?: (query: Knex.QueryBuilder, tableName: string, trx?: Knex.Transaction) => Knex.QueryBuilder;
        /**
         * If given, will override `offsetBasedPaginationInput`.
         */
        gqlPaginationInput?: PaginationInput;
        offsetBasedPaginationInput?: IOffsetBasedPaginationInput;
        trx?: Knex.Transaction;
    }) => Promise<number>;
    __lock: (trx: Knex.Transaction, idOrIds: string | string[]) => Promise<void>;
    exportable: {
        getAll: ({ trx, userData, paginationInput }: {
            trx?: Knex.Transaction;
            userData?: audit.IUserData;
            paginationInput?: PaginationInput | null;
        }) => Promise<{
            nodes: TGqlObject[];
            pageInfo: PageInfo;
        }>;
        getById: (id: string, trx?: Knex.Transaction, userData?: audit.IUserData) => Promise<TGqlObject | null>;
        getByIds: (ids: readonly string[], trx?: Knex.Transaction, userData?: audit.IUserData) => Promise<TGqlObject[]>;
        archive: (userData: audit.IUserData, id: string, trx?: Knex.Transaction) => Promise<void>;
    };
};
export interface IGenFnSaveOnConflictOptions {
    column: string;
    resolution: 'ignore';
}
export type IColumnName2FnGetValue<TInput> = Record<string, (input: TInput, id: string) => any>;
export type FnPreProcessReturn<TInput> = Promise<IColumnName2FnGetValue<TInput> | void> | void;
export type ISaveMode = 'create' | 'edit';
export type FnSave<TInput> = (userData: audit.IUserData, input: TInput, trx?: Knex.Transaction<any, any[]> | undefined) => Promise<string>;
export declare function genFnSave<TInput extends {
    id?: string | null;
}>({ fnGetParentId, fnGetSelfId, tableName, editColumnName2FnGetValue, createColumnName2FnGetValue, requiredFieldsForCreate, onConflictOptions, fnPreProcess, fnPostProcess }: {
    tableName: string;
    fnGetParentId?: (input: TInput, trx: Knex.Transaction, userData: audit.IUserData) => string | Promise<string>;
    fnGetSelfId: (input: TInput, trx: Knex.Transaction, userData: audit.IUserData) => string | Promise<string>;
    editColumnName2FnGetValue: IColumnName2FnGetValue<TInput>;
    /**
     * This will be merged with `editColumnName2FnGetValue`.
     */
    createColumnName2FnGetValue: IColumnName2FnGetValue<TInput>;
    requiredFieldsForCreate?: (keyof TInput)[];
    onConflictOptions?: IGenFnSaveOnConflictOptions;
    /**
     * If this returns a value, it will be merged into the `editColumnName2FnGetValue` and `createColumnName2FnGetValue` objects.
     * Note that this does not run before `fnGetParentId()` and `fnGetSelfId()` are called.
     */
    fnPreProcess?: (trx: Knex.Transaction, userData: audit.IUserData, input: TInput, mode: ISaveMode) => FnPreProcessReturn<TInput>;
    fnPostProcess?: (trx: Knex.Transaction, userData: audit.IUserData, id: string, input: TInput, mode: ISaveMode) => Promise<void>;
}): FnSave<TInput>;
export interface ISaveMultipleArgs<TInput> {
    trx?: Knex.Transaction;
    userData: audit.IUserData;
    inputObjects: TInput[];
    fnSave: FnSave<TInput>;
}
export declare function saveMultiple<TInput>(args: ISaveMultipleArgs<TInput>): Promise<string[]>;
export type FnSaveChildren<TInput> = (trx: Knex.Transaction, inputObjects: TInput[], userData: audit.IUserData, parentId?: string) => Promise<void>;
export interface IForeignDependency {
    foreignTable: string;
    /**
     * Default: `'id'`
     */
    foreignIdColumn?: string;
    sourceColumn: string;
}
export declare function genFnSaveChildren<TInput>({ tableName, parentIdColumn, fnGetParentId, columnName2FnGetValue, optionsForUpdateExistingMethod, rankingColumn, rankingGroupByKey, archiveInsteadOfDelete, postDeleteDependencies, fnPreProcess, fnPostProcess }: {
    tableName: string;
    parentIdColumn: string;
    fnGetParentId: (input: TInput) => string;
    columnName2FnGetValue: IColumnName2FnGetValue<TInput>;
    /**
     * If this object is not specified, the "delete and add" method will be used, which
     * will delete all existing children and add the incoming set of children.
     *
     * If this object is specified, the "update existing" method will be used. This method
     * works by comparing the incoming set to the existing set using each child's ID to
     * check equality. (Empty string IDs in the incoming set indicate a new child should
     * be created.)
     * - Any child in the existing set but not in the incoming set will be deleted.
     * - Any child in the incoming set but not in the existing set will be added.
     * - Any child both sets will be updated to reflect the incoming child's values.
     */
    optionsForUpdateExistingMethod?: {
        childIdColumn: string;
        fnGetSelfId: (input: TInput) => string;
    };
    /**
     * Don't set if children aren't ranked.
     */
    rankingColumn?: string;
    /**
     * Pass a value to set rankings based on groups within the input array.
     * Objects belong to the same group if they have the same value for this key.
     */
    rankingGroupByKey?: keyof TInput;
    /**
     * @deprecated
     * If `true`, rows will be marked as archived instead of being deleted.
     */
    archiveInsteadOfDelete?: boolean;
    /**
     * If specified, and if `optionsForUpdateExistingMethod` is not specified (thus meaning
     * the "delete and add" method is to be used), then after we delete a row, we will
     * delete the given dependencies.
     */
    postDeleteDependencies?: IForeignDependency[];
    /**
     * You can return a new value to use as `inputObjects` that will be used for
     * main processing.
     */
    fnPreProcess?: (trx: Knex.Transaction, userData: audit.IUserData, inputObjects: TInput[], parentId: string) => Promise<TInput[]>;
    fnPostProcess?: (trx: Knex.Transaction, userData: audit.IUserData, id2InputObject: Record<string, TInput>, parentId: string) => Promise<void>;
}): FnSaveChildren<TInput>;
export declare function processValuePreservingNil<T, R>(inputValue: T | null | undefined, fnProcess: (value: T) => R): R | null | undefined;
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
export declare function genFnArchive({ tableName, columnName, fnGenQueryGetId, fnPostProcess }: {
    tableName: string;
    columnName?: string;
    fnGenQueryGetId?: (trx: Knex.Transaction, id: string) => Knex.QueryBuilder;
    fnPostProcess?: (trx: Knex.Transaction, userData: audit.IUserData, id: string) => Promise<void>;
}): (userData: audit.IUserData, id: string, trx?: Knex.Transaction) => Promise<void>;
export interface IDeleteAndLogArgs {
    userData: audit.IUserData;
    tableName: string;
    ids: string[];
}
export declare function deleteAndLog(args: IDeleteAndLogArgs, trx?: Knex.Transaction): Promise<void>;
export declare function withTransaction<T>(fn: (trx: Knex.Transaction) => Promise<T>, trx?: Knex.Transaction): Promise<T>;
export declare function toStringType(value: any): string;
export interface IGetAbstractObjectIdCreateIfNotExistsInput {
    tableName: string;
    specificIdsRow: Record<string, string | boolean | null | undefined | Knex.QueryBuilder>;
}
export declare function getAbstractObjectIdCreateIfNotExists(input: IGetAbstractObjectIdCreateIfNotExistsInput): Promise<string>;

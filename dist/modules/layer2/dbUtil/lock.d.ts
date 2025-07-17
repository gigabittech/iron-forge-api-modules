import { Knex } from 'knex';
export interface IConfig {
    tableLockingOrder: string[];
    disableMultiCallLockTracking?: boolean;
    debug?: boolean;
}
export declare function init({ tableLockingOrder, disableMultiCallLockTracking, debug }: IConfig): void;
export type ITableName2RowIdsInput = Record<string, (string | null | undefined) | (string | null | undefined)[]>;
export declare function lock(trx: Knex.Transaction, tableName2RowIds: ITableName2RowIdsInput): Promise<void>;
export interface IFnGetRelatedIdsReturn<T> {
    tableName2RowIds: ITableName2RowIdsInput;
    output?: T;
}
export type FnGetRelatedIds<T> = (trx: Knex.Transaction) => Promise<IFnGetRelatedIdsReturn<T>>;
export interface ILockWithRelationshipChecksOptions {
    debug?: boolean;
    disableRetryRelationshipChecks?: boolean;
    maxNumChecks?: number;
}
/**
 * This function should be used instead of `lock()` if some of the rows you
 * are trying to lock are only being considered because some other row you
 * are trying to lock makes reference to them, and those references are mutable.
 * A problematic situation occurs when you query the database for these references,
 * use those references to decide which rows to lock, and before the lock query
 * occurs, the references are changed by another client.
 *
 * ## Example
 *
 * Consider a messenger module of functionality in which users participate in
 * message threads. Further consider a situation in which you are attempting to
 * ban a user, thereby removing them from all threads. You can take the user's ID
 * as a given, but from there, you need to find all threads in which they are a
 * member. Once you have a list of thread IDs, you will lock the user and these
 * threads before removing the user from those threads.
 *
 * Let's say that you find that the user is in Threads A and B. After this, some
 * other client adds the user to an additional thread, Thread C. Because you only
 * know about Threads A and B at this point, you proceed to lock the user and
 * Threads A and B. You then remove the user from A and B and release the locks.
 * Unfortunately, because of the timing of these operations, the user is still
 * present in Thread C.
 *
 * The reason this scenario causes a problem is because we must query the database
 * to figure out which rows to lock. Between the time of that query and the time
 * of the lock, the relationships might have changed. A solution is to run the query
 * twice: one query before the lock, to figure out which rows to lock, and one query
 * after the lock, to check that the relationships haven't been changed.
 *
 * If you use `lockWithRelationshipChecks()` in the above scenario, you could provide
 * a function that queries the user's thread IDs to the `fnGetRelatedIds`
 * parameter. `lockWithRelationshipChecks()` will check the return value before
 * and after the lock; if the return values don't match, the operation fails.
 *
 * @param fnGetRelatedIds
 *    This function returns an object that has a mapping from table name to row IDs
 *    and, optionally, an output value.
 *
 *    The return value's `tableName2RowIds` value will be merged into `tableName2RowIds`
 *    before locking. The function will be called once before and once after the lock.
 *    If these two results don't match, an error is thrown.
 *
 *    `lockWithRelationshipChecks()` will return the `output` value from the most
 *    recent invocation of `fnGetRelatedIds()`.
 */
export declare function lockWithRelationshipChecks<TGetRelatedIdsOutput>({ trx, tableName2RowIds, fnGetRelatedIds, options }: {
    trx: Knex.Transaction;
    tableName2RowIds: ITableName2RowIdsInput;
    fnGetRelatedIds: FnGetRelatedIds<TGetRelatedIdsOutput>;
    options?: ILockWithRelationshipChecksOptions;
}): Promise<TGetRelatedIdsOutput | undefined>;

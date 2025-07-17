/**
 * Do not `await` this function call! Otherwise, it will not
 * run in parallel.
 *
 * Wrap asynchronous logic in a call to this function to ensure
 * the entire system is not brought down when that logic throws
 * an error. Be sure to use `await` for asynchronous calls within
 * your logic.
 */
export declare function runInParallel<T>(fn: () => Promise<T>): Promise<void>;

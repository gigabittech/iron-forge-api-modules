export declare function wrapCanThrowAwsError<T>(fn: () => Promise<T>, fnDestroyClient?: () => void): Promise<T>;
export declare function wrapCanThrowAwsErrorSync<T>(fn: () => T): T;

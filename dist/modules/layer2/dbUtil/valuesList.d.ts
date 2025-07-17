export type ISqlValue = string | number | boolean | null | undefined;
export type IValue = ISqlValue | {
    value: ISqlValue;
    sqlType?: string;
};
export type FnObject2Values<T> = (object: T) => IValue[];
/**
 * This function will format data for use in creating a `VALUES` list
 * in SQL.
 *
 * @param objects
 *    A list of objects to convert to SQL values.
 *
 * @param fnObject2Values
 *    This function will be called to convert an object from `objects`
 *    into an array of SQL values.
 *
 *    You can optionally return some values
 *    as objects that additionally specify an SQL type into which the
 *    value should be coerced in the SQL query.
 *
 *    Each array returned from this function should have the same length.
 *
 * @returns
 *    `qMarkString` is meant to be used in the string of a raw query.
 *    `valueList` is meant to be passed as arguments to the raw query.
 */
export declare function genValuesList<T>(objects: T[], fnObject2Values: FnObject2Values<T>): {
    qMarkString: string;
    valueList: ISqlValue[];
};

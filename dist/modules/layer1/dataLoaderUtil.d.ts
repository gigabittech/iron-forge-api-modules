import DataLoader from 'dataloader';
export declare function makeDataLoader<T extends {
    id: string;
}>(fnGetObjectsById: (ids: ReadonlyArray<string>) => Promise<T[]>): DataLoader<string, T, string>;
export declare function makeDataLoaderUsingNameKey<T extends {
    name: string;
}>(fnGetObjectsByName: (names: ReadonlyArray<string>) => Promise<T[]>): DataLoader<string, T, string>;
export declare function filterNonErrors<T>(results: (T | Error)[]): T[];

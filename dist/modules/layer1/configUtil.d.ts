import { Schema } from 'jsonschema';
export declare function getConfig<TConfigOptions>(): TConfigOptions;
export declare function getEnvName(): string;
export declare const nonEmptyStringSchema: Schema;
export declare const portSchema: Schema;
export interface IOptions {
    configOptionsSchema: Schema;
    fullPathToConfigFile?: string;
    configOptionsObject?: any;
}
export interface IInitOptions {
    overrideEnvName?: string;
}
export declare function init(configSchema: Schema, options?: IInitOptions): void;

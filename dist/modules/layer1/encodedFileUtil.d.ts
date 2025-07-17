export interface IMetadata {
    /**
     * Includes file name.
     */
    fullPath: string;
    filename: string;
    mimeType: string;
    tempDirectoryName: string;
}
export declare class EncodedFile {
    encodedFile: string;
    tempDirectory: string;
    metadata: IMetadata | null;
    constructor(encodedString: string, tempDirectory?: string);
    writeToFileSystem: () => IMetadata | null;
    delete: () => void;
}
export declare function encodeStringAsFile(fileName: string, mimeType: string, content: string): string;

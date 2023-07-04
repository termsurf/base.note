import type { RedType, SiteProcessInputType } from '~';
export declare function assertRecord(object: unknown): asserts object is Record<string, unknown>;
export declare function getNestedProperty(object: Record<string, unknown>, path: Array<string>): unknown;
export declare function getProperty(object: Record<string, unknown>, path: string): unknown;
export declare function getWithObjectDefault(obj: Record<string, unknown>, name: string): Record<string, unknown>;
export declare function insertIntoRed(input: SiteProcessInputType, value: RedType): void;
export declare function isObjectWithType(object: unknown): boolean;
export declare function isRecord(object: unknown): object is Record<string, unknown>;
export declare const mergeObjects: {
    <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
    <TObject_1, TSource1, TSource2>(object: TObject_1, source1: TSource1, source2: TSource2): TObject_1 & TSource1 & TSource2;
    <TObject_2, TSource1_1, TSource2_1, TSource3>(object: TObject_2, source1: TSource1_1, source2: TSource2_1, source3: TSource3): TObject_2 & TSource1_1 & TSource2_1 & TSource3;
    <TObject_3, TSource1_2, TSource2_2, TSource3_1, TSource4>(object: TObject_3, source1: TSource1_2, source2: TSource2_2, source3: TSource3_1, source4: TSource4): TObject_3 & TSource1_2 & TSource2_2 & TSource3_1 & TSource4;
    (object: any, ...otherArgs: any[]): any;
};
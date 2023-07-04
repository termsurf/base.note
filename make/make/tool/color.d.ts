import { BlackType, BlueArrayType, BlueBooleanLinkType, BlueBooleanType, BlueMapType, BlueNodeType, BluePossibleType, BlueStringArrayType, BlueStringType, BlueTextType, BlueType, Distributive, DistributiveOmit, LinkNodeType, LinkTextType, Mesh, Red, RedGatherType, RedNodeType, RedType, RedValueType, SiteBlueType, SiteColorsType, SiteProcessInputType, SiteRedType } from '~';
export declare function assertBlue<T extends Mesh>(object: unknown, type: T | Array<T>, name?: string): asserts object is BlueNodeType<T>;
export declare function assertBlueArray<T extends Mesh>(array: Array<unknown>, type: T | Array<T>, name?: string): asserts array is Array<BlueNodeType<T>>;
export declare function assertBlueBoolean(object: unknown): asserts object is BlueBooleanLinkType;
export declare function assertBlueOrUndefined<T extends Mesh>(object: unknown, type: T | Array<T>, name?: string): asserts object is BlueNodeType<T> | undefined;
export declare function assertBluePath(object: unknown): asserts object is BlueNodeType<Mesh.StringArray | Mesh.Path>;
export declare function assertBlueStepArray(array: Array<unknown>): asserts array is Array<BlueNodeType<Mesh.Call | Mesh.Assertion | Mesh.Constant>>;
export declare function assertBlueString(object: unknown): asserts object is BlueStringType;
export declare function assertBlueTerm(object: unknown): asserts object is BlueNodeType<Mesh.String | Mesh.Term>;
export declare function assertBlueText(object: unknown): asserts object is BlueNodeType<Mesh.Text | Mesh.String>;
export declare function assertGenericBlue<T extends Mesh>(object: unknown, name?: string): asserts object is BlueNodeType<T>;
export declare function assertRed<T extends Red>(object: unknown, type: T, property?: string): asserts object is RedNodeType<T>;
export declare function attachBlue(input: SiteProcessInputType, property: string, node: DistributiveOmit<BlueType | BlueArrayType<BlueType> | BlueMapType<Record<string, BluePossibleType>>, 'color' | 'state'>): SiteBlueType;
export declare function attachBlueValue(input: SiteProcessInputType, property: string, node: BluePossibleType): void;
export declare function createBlue(input: SiteProcessInputType, node: DistributiveOmit<BluePossibleType, 'color' | 'state' | 'attachedAs'>): SiteBlueType;
export declare function createBlueArray<T extends BlueType>(input: SiteProcessInputType, value?: Array<T>): BlueArrayType<T>;
export declare function createBlueBoolean(value: boolean): BlueBooleanType;
export declare function createBlueMap<T extends Record<string, BluePossibleType>>(input: SiteProcessInputType, value: T): BlueMapType<T>;
export declare function createBlueString(value: string): BlueStringType;
export declare function createBlueStringArray(value: Array<string>): BlueStringArrayType;
export declare function createBlueText(input: SiteProcessInputType, value: LinkTextType): BlueTextType;
export declare function createRedGather(input: SiteProcessInputType, name: string | undefined, children?: Array<Distributive<BlackType | LinkNodeType>>): RedGatherType;
export declare function createRedValue(input: SiteProcessInputType, name: string | undefined, value: BlackType | LinkNodeType): RedValueType;
export declare function createTopBlue(): SiteBlueType;
export declare function createTopRed(node: DistributiveOmit<RedType, 'color' | 'state'>): SiteRedType;
export declare function getBlueValue(input: SiteProcessInputType, property: string): unknown;
export declare function hasBlueValue(input: SiteProcessInputType, property: string): boolean;
export declare function isBlue<T extends Mesh>(object: unknown, type: T | Array<T>): object is BlueNodeType<T>;
export declare function isGenericBlue<T extends Mesh>(object: unknown): object is BlueNodeType<T> | BlueArrayType<BlueNodeType<T>> | BlueMapType;
export declare function isRed<T extends Red>(object: unknown, type: T | Array<T>): object is RedNodeType<T>;
export declare function pushBlue(input: SiteProcessInputType, property: string, node: DistributiveOmit<BluePossibleType, 'color' | 'state' | 'attachedAs'>): SiteBlueType;
export declare function pushRed(input: SiteProcessInputType, node: DistributiveOmit<RedType, 'color' | 'state'>): SiteRedType;
export declare function withColors(input: SiteProcessInputType, { red, blue }: SiteColorsType): SiteProcessInputType;
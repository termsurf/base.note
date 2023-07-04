import { BlueNodeType, Mesh, RedGatherType } from '../..';
import type { SiteProcessInputType } from '../..';
export declare function filterBlue<T extends Mesh>(input: SiteProcessInputType, type: T | Array<T>): Array<BlueNodeType<T>>;
export declare function filterRed(input: SiteProcessInputType, name: string): Array<RedGatherType>;
export declare function findBlue<T extends Mesh>(input: SiteProcessInputType, type: T | Array<T>): BlueNodeType<T> | undefined;
export declare function findRed(input: SiteProcessInputType, name: string): RedGatherType | undefined;
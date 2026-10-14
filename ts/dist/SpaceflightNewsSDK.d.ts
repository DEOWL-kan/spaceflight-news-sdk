import { ArticleEntity } from './entity/ArticleEntity';
import { BlogEntity } from './entity/BlogEntity';
import { InfoEntity } from './entity/InfoEntity';
import { ReportEntity } from './entity/ReportEntity';
export type * from './SpaceflightNewsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SpaceflightNewsEntityBase } from './SpaceflightNewsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class SpaceflightNewsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Article(entopts?: Record<string, any>): ArticleEntity;
    Blog(entopts?: Record<string, any>): BlogEntity;
    Info(entopts?: Record<string, any>): InfoEntity;
    Report(entopts?: Record<string, any>): ReportEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SpaceflightNewsSDK;
    tester(testopts?: any, sdkopts?: any): SpaceflightNewsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SpaceflightNewsSDK;
export { stdutil, config, BaseFeature, SpaceflightNewsEntityBase, SpaceflightNewsSDK, SDK, };
export type { DirectResult };

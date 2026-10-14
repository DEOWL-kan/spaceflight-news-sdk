import { SpaceflightNewsEntityBase } from '../SpaceflightNewsEntityBase';
import type { SpaceflightNewsSDK } from '../SpaceflightNewsSDK';
import type { Control } from '../types';
import type { Blog, BlogLoadMatch, BlogListMatch } from '../SpaceflightNewsTypes';
declare class BlogEntity extends SpaceflightNewsEntityBase<Blog> {
    constructor(client: SpaceflightNewsSDK, entopts: any);
    make(this: BlogEntity): BlogEntity;
    load(this: any, reqmatch?: BlogLoadMatch, ctrl?: Control): Promise<BlogEntity>;
    list(this: any, reqmatch?: BlogListMatch, ctrl?: Control): Promise<BlogEntity[]>;
}
export { BlogEntity };

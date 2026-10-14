import { SpaceflightNewsEntityBase } from '../SpaceflightNewsEntityBase';
import type { SpaceflightNewsSDK } from '../SpaceflightNewsSDK';
import type { Control } from '../types';
import type { Article, ArticleLoadMatch, ArticleListMatch } from '../SpaceflightNewsTypes';
declare class ArticleEntity extends SpaceflightNewsEntityBase<Article> {
    constructor(client: SpaceflightNewsSDK, entopts: any);
    make(this: ArticleEntity): ArticleEntity;
    load(this: any, reqmatch?: ArticleLoadMatch, ctrl?: Control): Promise<ArticleEntity>;
    list(this: any, reqmatch?: ArticleListMatch, ctrl?: Control): Promise<ArticleEntity[]>;
}
export { ArticleEntity };

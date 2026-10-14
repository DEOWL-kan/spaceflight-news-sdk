import { SpaceflightNewsEntityBase } from '../SpaceflightNewsEntityBase';
import type { SpaceflightNewsSDK } from '../SpaceflightNewsSDK';
import type { Control } from '../types';
import type { Info, InfoListMatch } from '../SpaceflightNewsTypes';
declare class InfoEntity extends SpaceflightNewsEntityBase<Info> {
    constructor(client: SpaceflightNewsSDK, entopts: any);
    make(this: InfoEntity): InfoEntity;
    list(this: any, reqmatch?: InfoListMatch, ctrl?: Control): Promise<InfoEntity[]>;
}
export { InfoEntity };

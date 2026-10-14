import { SpaceflightNewsEntityBase } from '../SpaceflightNewsEntityBase';
import type { SpaceflightNewsSDK } from '../SpaceflightNewsSDK';
import type { Control } from '../types';
import type { Report, ReportLoadMatch, ReportListMatch } from '../SpaceflightNewsTypes';
declare class ReportEntity extends SpaceflightNewsEntityBase<Report> {
    constructor(client: SpaceflightNewsSDK, entopts: any);
    make(this: ReportEntity): ReportEntity;
    load(this: any, reqmatch?: ReportLoadMatch, ctrl?: Control): Promise<ReportEntity>;
    list(this: any, reqmatch?: ReportListMatch, ctrl?: Control): Promise<ReportEntity[]>;
}
export { ReportEntity };

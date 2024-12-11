import buildInfoModule from 'src/project-info.json';

import { TBuildInfo } from 'src/core/types/app/TBuildInfo';

const buildInfo: TBuildInfo = buildInfoModule;

const { projectInfo } = buildInfo;

const match = projectInfo.match(/^\(\S\+\)/);
const version = match ? match[1] : 'UNKNOWN';

export { projectInfo, version };

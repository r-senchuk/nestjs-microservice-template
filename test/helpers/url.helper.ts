import { GLOBAL_ROUTE_PREFIX, VERSIONS } from '../../src/constants';

export const createUrl = (
  route: string,
  version: string = VERSIONS.V1,
): string => `${GLOBAL_ROUTE_PREFIX}/${VERSIONS.prefix}${version}/${route}`;

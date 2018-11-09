export enum ENTITY_TYPE {
  CUSTOMER = 1,
  EMPLOYEE = 2,
}

export enum NODE_ENV_TYPE {
  /** test mode */
  TEST = 'test',
  /** production mode */
  PROD = 'production',
  /** development mode */
  DEV = 'development',
}

export const DEFAULT_PAGER = {
  limit: 10,
  offset: 0,
}

export enum STATE_TYPE {
  ENABLED = 1,
  DISABLED = -1,
}

export enum DATE_CONST {
  SECOND = 1000,
  MINUTE = 1000 * 60,
  HOUR = 1000 * 60 * 60,
  DAY = 1000 * 60 * 60 * 24,
  MONTH = 1000 * 60 * 60 * 24 * 30,
  YEAR = 1000 * 60 * 60 * 24 * 365,
}

export enum GUIDE_KEY {
  MEMBER_LIST = 'MEMBER_LIST',
  MEMBER_VIEW = 'MEMBER_VIEW',
}

export enum PAGE_STATE_KEY {
  CUSTOMER_LIST_VIEW = 'PS_CUSTOMER_LIST_VIEW',
  EMPLOYEE_LIST_VIEW = 'PS_EMPLOYEE_LIST_VIEW',
}

export const drawerWidth = 260
export const menuHeight = 64

export enum TRAINING_TYPE {
  PT = 1,
  GT = 2,
}

export enum CACHE_KEY {
  GT_SEARCH = 1,
  TAGS_DATA = 'TAGS_DATA',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  SESSION = 'SESSION',
  GUIDE_KEY = 'GUIDE_KEY',
}

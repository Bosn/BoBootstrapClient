export enum ACCESS_TYPE {
  /** 用户一般权限 */
  MEMBER_ACCESS = 10000,

  /** 管理员权限 */
  ADMIN_ACCESS = 30101,

  /** 超级管理员权限 */
  SUPER_ADMIN_ACCESS = 30201,

  /** 系统管理员 */
  GOD_ACCESS = 99999,
}

export const EMPLOYEE_NORMAL_ACCESS_TYPE_LIST = [
  { label: '管理员 - 单组织最高权限，可配置员工权限', value: ACCESS_TYPE.ADMIN_ACCESS },
  { label: '超级管理员 - 公司最高权限，可管理所有分公司员工权限', value: ACCESS_TYPE.SUPER_ADMIN_ACCESS },

]

export enum ROLE_TYPE {
  MEMBER_ACCESS = 'MEMBER_ACCESS',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export const ROLE_TYPE_LIST = [
  { label: '用户', value: ROLE_TYPE.MEMBER_ACCESS },
  { label: '管理员', value: ROLE_TYPE.ADMIN },
  { label: '超级管理员', value: ROLE_TYPE.SUPER_ADMIN },
]

export const MAP_ROLE_TYPE_TO_ACCESS_TYPE_LIST: { [key: string]: number[] } = {
  [ROLE_TYPE.MEMBER_ACCESS]: [
    ACCESS_TYPE.MEMBER_ACCESS,
  ],
  [ROLE_TYPE.ADMIN]: [
    ACCESS_TYPE.ADMIN_ACCESS,
  ],
  [ROLE_TYPE.SUPER_ADMIN]: [
    ACCESS_TYPE.SUPER_ADMIN_ACCESS,
  ],
}

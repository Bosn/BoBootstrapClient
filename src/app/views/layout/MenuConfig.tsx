import { IMenuItem, ILoginInfo } from '@app/types'
import config from '@app/../config'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import FaceIcon from '@material-ui/icons/Face'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import * as _ from 'lodash'
import StarIcon from '@material-ui/icons/Star'
import React from 'react'

const V = config.VERSION

export const EmployeeMenuData: IMenuItem[] = [
  {
    label: '我的主页',
    url: `/${V}/smart/`,
    requiredAccessList: [],
  },
  {
    label: '用户管理',
    subList: [
      {
        label: '用户(beta)',
        url: `/${V}/smart/customer/list`,
        requiredAccessList: [],
      },
    ],
  },
  {
    label: '员工管理',
    subList: [
      {
        label: '员工资料',
        url: `/${V}/smart/employee/list`,
        requiredAccessList: [],
      },
    ],
  },
]

export function getMenuLabels(list: IMenuItem[]): string[] {
  const result: string[] = []
  for (const item of list) {
    if (item.url) {
      result.push(item.label)
    }
    if (item.subList) {
      for (const subItem of item.subList) {
        if (subItem.url) {
          result.push(subItem.label)
        }
      }
    }
  }
  return result
}

export function getMenuItem(label: string, list: IMenuItem[]): IMenuItem | undefined {
  for (const item of list) {
    if (item.url && item.label === label) {
      return item
    }
    if (item.subList) {
      for (const subItem of item.subList) {
        if (subItem.url && subItem.label === label) {
          return subItem
        }
      }
    }
  }
  return
}

export function getMenuItemIcon(label: string) {
  switch (label) {
    case '我的主页':
      return <HomeIcon />
    case '关于我的':
      return <TagFacesIcon />
    case '我的账户':
      return <AccountCircleIcon />
    case '用户管理':
      return <PeopleIcon />
    case '用户':
    case '用户(beta)':
      return <PersonIcon />
    case '员工管理':
      return <PeopleIcon />
    case '员工资料':
    case '员工资料(beta)':
      return <FaceIcon />
  }
  return <StarIcon />
}

export function menuItemOnClick(
  url: string,
  old: boolean,
  loginInfo: ILoginInfo
): string {
  if (url.indexOf(':companyId') > -1) {
    url = url.replace(/:companyId/g, String(loginInfo.companyId))
  }
  if (old) {
    return `/${V}/common/loadOldPage/${encodeURIComponent(url)}`
    // props.loadOldPage(url)
  } else {
    return url
  }
}

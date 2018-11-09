import { ENTITY_TYPE } from "@app/state/const"
import { MSG_TYPE } from "@app/views/components/common/Message";
import { ACCESS_TYPE } from "@app/state/sharedConsts/access";
import { SpawnSyncOptionsWithStringEncoding } from "child_process";

declare interface IOption {
  text: string
  value: string | number
}

declare interface INumItem {
  value: number
  label: string
}

declare interface IStrItem {
  value: string
  text: string
}

declare interface IItem {
  value: string | number
  text: string
}

declare interface IAsync {
  isFetching: boolean
}

declare interface IPager {
  limit: number
  offset: number
  order?: TOrder
  orderBy?: string
  query?: string
}

declare interface IMenuItem {
  label: string
  requiredAccessList?: ACCESS_TYPE[]
  url?: string
  old?: boolean
  subList?: IMenuItem[]
}

declare interface ILoginInfo extends IAsync {
  id: number
  sex: boolean
  entityType: ENTITY_TYPE
  name: string
  nickname: string
  title: string
  accessList: ACCESS_TYPE[]
  avatarImg: string
  companyId: number
  weChatAppId: string
  signature: string
}

declare interface IEntitySummary {
  id: number
  sex: boolean
  name: string
  avatarImg: string
  companyId?: number
  desc?: string
  mobile?: string
  memberCardId?: string
}

declare interface IEmployeeSummary {
  id: number
  sex: boolean
  name: string
  avatarImg: string
}

declare interface IMessage {
  message: string
  type: MSG_TYPE
  timestamp: number
}

declare interface TListState<T> extends IAsync {
  result: number[],
  entities: {
    [key: string]: { [key: number]: T }
  }
}

declare interface TPagerListState<T> {
  data: TListState<T>
  count: number
  timestamp?: Date
}

declare type TItemState<T> = T & IAsync

declare interface IConfigOptions {
  VERSION: string
  CDN_CONFIG: {
    ROOT: string
  },
  WEB_CONFIG: {
    ROOT: string
  }
  API_CONFIG: {
    ROOT: string
  }
}

declare type TOrder = 'asc' | 'desc'

declare type TCommonError = { isOk: false, errMsg: string }

declare interface IUIPager {
  count: number
  page: number
  rowsPerPage: number
}

declare interface IDateRange {
  begin: Date
  end: Date
}

declare interface IName {
  id: number
  name: string
}

/** normal callback */
export type TCB = (isOk: boolean) => void

declare interface IListState<T> extends IAsync {
  list: T[]
}

declare interface IItemState<T> extends IAsync {
  item: T
}
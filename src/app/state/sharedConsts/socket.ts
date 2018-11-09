export const getRoomCompanyKey = (companyId: number) => `ROOM_COMPANY_${companyId}`

export const JOIN_ROOM = 'JOIN_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'

export enum SOCKET_EVENT {
  /** fired when newly signIn created */
  SIGN_IN = 'SIGN_IN',
}

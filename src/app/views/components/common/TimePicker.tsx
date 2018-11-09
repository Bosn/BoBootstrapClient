import * as React from 'react'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import { default as TimePickerCore } from 'material-ui-pickers/TimePicker'
import moment from 'moment'
import 'moment/locale/zh-cn'
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider'
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal'

moment.locale('zh-cn')

interface Props extends DatePickerModalProps {
  label?: string
  name?: string
  className?: string
  required?: boolean
}

const TimePicker = (props: Props) => {
  const extraProps: any = { disableOpenOnEnter: true }
  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      moment={moment}
      locale="zh-cn"
    >
      <TimePickerCore
        okLabel="确定"
        cancelLabel="取消"
        {...extraProps}
        {...props}
      />
    </MuiPickersUtilsProvider>
  )
}

export default TimePicker

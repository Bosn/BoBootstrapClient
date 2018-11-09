import * as React from 'react'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import { default as DatePickerCore } from 'material-ui-pickers/DatePicker'
import EventIcon from '@material-ui/icons/Event'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
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

const DatePicker = (props: Props) => {
  const extraProps: any = { disableOpenOnEnter: true }
  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      moment={moment}
      locale="zh-cn"
    >
      <DatePickerCore
        format="YYYY/MM/DD"
        placeholder="YYYY/MM/DD"
        keyboardIcon={<EventIcon />}
        leftArrowIcon={<LeftIcon />}
        rightArrowIcon={<RightIcon />}
        okLabel="确定"
        cancelLabel="取消"
        mask={(value: string) =>
          value
            ? [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]
            : []
        }
        animateYearScrolling={false}
        {...extraProps}
        {...props}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker

import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import moment, { Moment } from 'moment'
import 'moment/locale/zh-cn'
import Today from '@material-ui/icons/Today'
import { default as DatePicker } from 'material-ui-pickers/DatePicker'
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal'
import EventIcon from '@material-ui/icons/Event'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider'

moment.locale('zh-cn')

const styles = () => createStyles({
  root: {
  },
  picker: {
    display: 'none',
  },
})

interface Props extends WithStyles<typeof styles> {
  value: Date
  onChange: (date: Date) => void
}

const CalendarButton = withStyles(styles)(
  class extends React.Component<Props> {
    picker: React.Component<DatePickerModalProps, any, any> | null = null

    pick = () => {
      this.picker && (this.picker as any).open()
    }

    onChangeHandler = (moment: Moment) => {
      this.props.onChange(moment.toDate())
    }

    render() {
      const { classes, value } = this.props
      return (
        <div className={classes.root}>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            moment={moment}
            locale="zh-cn"
          >
            <Today onClick={this.pick} color="primary" />
            <div className={classes.picker}>
              <DatePicker
                ref={(node) => { this.picker = node as any }}
                value={value}
                onChange={this.onChangeHandler}
                format="YYYY/MM/DD"
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
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
      )
    }
  }
)

export default CalendarButton

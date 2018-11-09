import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core'
import DatePicker from '@app/views/components/common/DatePicker'
import { Moment } from 'moment'
import FormatUtils from '@app/utilities/format'

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 2,
  },
  picker: {
    marginRight: theme.spacing.unit,
    width: 100,
  },
})
interface Props extends WithStyles<typeof styles> {
  startDate: string
  endDate: string
  onChange: (key: 'startDate' | 'endDate', val: string) => void
}

interface States {
}

const DateRanagePicker = withStyles(styles)(
  class extends React.Component<Props, States> {

    onChange = (key: 'startDate' | 'endDate') => (val: Moment) => {
      this.props.onChange(key, FormatUtils.date(val.toDate()))
    }

    render() {
      const { classes, startDate, endDate } = this.props
      return (
        <div className={classes.root}>
          <DatePicker
            className={classes.picker}
            required={true}
            label="开始日期"
            value={startDate}
            onChange={this.onChange('startDate')}
          />
          <DatePicker
            className={classes.picker}
            required={true}
            label="结束日期"
            value={endDate}
            onChange={this.onChange('endDate')}
          />
        </div>
      )
    }
  }
)
export default DateRanagePicker

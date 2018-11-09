import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import DateUtils, { QUICK_DATE_LIST, QUICK_DATE } from '@app/utilities/date'
import { IDateRange } from '@app/types'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'inline-block',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit * 2}px 0`,
    display: 'flex',
    flexDirection: 'row',
  },
})
interface Props extends WithStyles<typeof styles> {
  startDate: string
  endDate: string
  onChange: (range: IDateRange) => void
}

interface States {
}

const QuickDateRanagePicker = withStyles(styles)(
  class extends React.Component<Props, States> {

    onChangeHandler = (event: any) => {
      const range = DateUtils.getDateRangeByQuickDate(event.target.value)
      this.props.onChange(range)
    }

    getRadioChecked = (x: { text: string, value: QUICK_DATE }) => {
      const { startDate, endDate } = this.props
      const quickDateMap: { [key: number]: IDateRange } = {}
      for (const item of QUICK_DATE_LIST) {
        quickDateMap[item.value] = DateUtils.getDateRangeByQuickDate(item.value)
      }
      const result = +quickDateMap[x.value].begin === +new Date(startDate) && +quickDateMap[x.value].end === +new Date(endDate)
      return result
    }

    render() {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            onChange={this.onChangeHandler}
          >
            {QUICK_DATE_LIST.map(x => <FormControlLabel
              key={x.value}
              value={String(x.value)}
              control={<Radio checked={this.getRadioChecked(x)} />}
              label={x.text}
            />)}
          </RadioGroup>
        </div>
      )
    }
  }
)
export default QuickDateRanagePicker

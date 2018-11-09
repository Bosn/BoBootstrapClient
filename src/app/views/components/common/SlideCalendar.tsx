import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core'
import moment from 'moment'
import classnames from 'classnames'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    backgroundColor: '#ffffff',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    padding: spacing.unit,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  on: {
    backgroundColor: palette.primary.main,
    color: '#ffffff',
  },
  label: {
  },
  date: {
  },
})

interface Props extends WithStyles<typeof styles> {
  now: Date
  value: Date
  onChange: (date: Date) => void
}

interface States {
}

const SliderCalendar = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
      }
    }

    getItems = () => {
      const items: Array<{ date: string, label: string, value: Date }> = []
      const { now } = this.props
      for (let i = -1; i < 7; i++) {
        const m = moment(now).add(i, 'days')
        const label = m.format('dd')
        const date = m.format('DD')
        const value = m.toDate()
        items.push({ label, date, value })
      }
      return items
    }

    onChangeHandler = (date: Date) => () => {
      this.props.onChange(date)
    }

    render() {
      const { classes, value } = this.props
      const on = classnames(classes.item, classes.on)
      const off = classes.item
      return (
        <div className={classes.root}>
          <div className={classes.list}>
            {this.getItems().map(x => (
              <div
                className={x.value.getDate() === value.getDate() ? on : off}
                onClick={this.onChangeHandler(x.value)}
                key={+x.value}
              >
                <div className={classes.date}>{x.date}</div>
                <div className={classes.label}>{x.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
)

export default SliderCalendar

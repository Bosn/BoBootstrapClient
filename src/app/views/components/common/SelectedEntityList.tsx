import { Employee } from '@app/state/ducks/smart/employee/types'
import URLUtils from '@app/utilities/url'
import { Avatar, Chip, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    margin: spacing.unit,
    marginTop: spacing.unit * 2,
  },
  selectedChip: {
    margin: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  selected: Employee[]
}

const SelectedEntityList = withStyles(styles)(
  class extends React.Component<Props> {
    public render() {
      const { classes, selected } = this.props

      return (
        <div className={classes.root}>
          {selected.map(x =>
            <Chip
              key={x.id}
              className={classes.selectedChip}
              avatar={
                <Avatar src={URLUtils.getAvatarUrl(x.avatarImg, x.sex)} />}
              label={x.name}
            />
          )
          }
        </div>
      )
    }
  }
)

export default SelectedEntityList

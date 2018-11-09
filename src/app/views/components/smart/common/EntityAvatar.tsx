import URLUtils from '@app/utilities/url'
import { Avatar, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
  },
  label: {
    marginTop: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  entity: {
    avatarImg: string
    id: number
    name: string
    sex: boolean,
  }
}

const EntityAvatar = withStyles(styles)(
  class extends React.Component<Props> {
    public render() {
      const { entity, classes } = this.props
      return (
        <div className={classes.root}>
          <Avatar
            src={URLUtils.getAvatarUrl(entity.avatarImg, entity.sex)}
            className={classes.avatar}
          />
          <Typography variant="caption" className={classes.label}>{entity.name}</Typography>
        </div>
      )
    }
  }
)

export default EntityAvatar

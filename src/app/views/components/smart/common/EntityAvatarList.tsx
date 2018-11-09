import EntityAvatar from '@app/views/components/smart/common/EntityAvatar'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItem: 'middle',
  },
  item: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  entityList: Array<{
    avatarImg: string
    name: string
    sex: boolean
    id: number,
  }>
}

const EntityAvatarList = withStyles(styles)(
  class extends React.Component<Props> {
    public render() {
      const { entityList, classes } = this.props
      return (
        <div className={classes.root}>
          {entityList.map(entity => <div className={classes.item} key={entity.id}><EntityAvatar entity={entity} /></div>)}
        </div>
      )
    }
  }
)

export default EntityAvatarList

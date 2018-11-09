import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = () => createStyles({
  root: {
    backgroundColor: '#ffffff',
  },
})

interface Props extends WithStyles<typeof styles> {
  title?: string
  content?: string
}

const NoData = withStyles(styles)(({ title, classes, content }: Props) => (
  <ListItem className={classes.root}>
    <ListItemText primary={content || (`暂无${title || '数据'}`)} />
  </ListItem>
))

export default NoData

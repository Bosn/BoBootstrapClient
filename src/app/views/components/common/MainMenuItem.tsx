
import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme, Chip } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import * as _ from 'lodash'
import { ACCESS_TYPE } from '@app/state/sharedConsts/access'
import { IMenuItem } from '@app/types'
import { getMenuItemIcon } from '@app/views/layout/MenuConfig'
import { grey } from '@material-ui/core/colors'

const styles = (theme: Theme) => createStyles({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: grey[100],
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
  },
  subList: {
  },
})

interface Props extends WithStyles<typeof styles> {
  item: IMenuItem
  accessList: ACCESS_TYPE[]
  onClick: (url: string, old: boolean) => void
}

interface States {
  open: boolean
}

export function passAny(curAccessList: ACCESS_TYPE[], requiredAccessList: ACCESS_TYPE[] | undefined) {
  if (curAccessList && curAccessList.includes(ACCESS_TYPE.GOD_ACCESS)) { return true }
  if (!requiredAccessList || !curAccessList) { return false }
  if (requiredAccessList.length === 0) { return true }
  if (_.intersection(curAccessList, [
    ACCESS_TYPE.ADMIN_ACCESS,
    ACCESS_TYPE.SUPER_ADMIN_ACCESS,
  ]).length > 0) {
    return true
  }
  return _.intersection(requiredAccessList, curAccessList).length > 0
}

const MainMenuItem = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        open: false,
      }
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState(state => ({ open: !state.open }))
    }

    /**
     * access judge
     * @param requiredAccessList see rules below
     *          []         => always pass
     *          undefined  => always deny except GOD_ACCESS
     *          admin      => always pass if not undefined
     *          others     => pass if match any one access
     */
    passAny(requiredAccessList: ACCESS_TYPE[] | undefined) {
      const curAccessList = this.props.accessList
      return passAny(curAccessList, requiredAccessList)
    }

    render() {
      const { classes, item, onClick } = this.props
      const { open } = this.state

      if (!item.subList || item.subList.length === 0) {
        if (!this.passAny(item.requiredAccessList)) {
          return null
        }
        return (
          <ListItem button={true} onClick={() => { item.url && onClick(item.url, !!item.old) }}>
            <ListItemIcon>{getMenuItemIcon(item.label)}</ListItemIcon>
            <ListItemText
              primary={item.label.indexOf('(beta)') > -1 ? item.label.replace(/\(beta\)/, '') : item.label}
            />
            {item.label.indexOf('(beta)') > -1 && <Chip color="default" className={classes.chip} label="beta" />}
          </ListItem>
        )
      }

      let anySubItemPassed = false
      for (const subItem of item.subList) {
        if (this.passAny(subItem.requiredAccessList)) {
          anySubItemPassed = true
          break
        }
      }

      if (!anySubItemPassed) {
        return null
      }

      return (
        <>
          <ListItem button={true} onClick={this.handleClick}>
            <ListItemIcon>{getMenuItemIcon(item.label)}</ListItemIcon>
            <ListItemText inset={true} primary={item.label} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit={true} className={classes.subList}>
            <List component="div" disablePadding={true}>
              {item.subList.map(x => (
                this.passAny(x.requiredAccessList) ?
                  <ListItem key={x.label} button={true} className={classes.nested} onClick={() => { x.url && onClick(x.url, !!x.old) }}>
                    <ListItemIcon>{getMenuItemIcon(x.label)}</ListItemIcon>
                    <ListItemText
                      inset={true}
                      primary={x.label.indexOf('(beta)') > -1 ? x.label.replace(/\(beta\)/, '') : x.label}
                    />
                    {x.label.indexOf('(beta)') > -1 && <Chip color="default" className={classes.chip} label="beta" />}
                  </ListItem> : null
              ))
              }
            </List>
          </Collapse>
        </>
      )
    }
  }
)

export default MainMenuItem

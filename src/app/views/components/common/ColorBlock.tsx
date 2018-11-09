import * as React from 'react'
import { createStyles, WithStyles, withStyles, Color } from '@material-ui/core'
import Done from '@material-ui/icons/Done'

const styles = () => createStyles({
  root: {
    width: 35,
    height: 35,
    display: 'inline-block',
    overflow: 'hidden',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#ffffff',
  },
})

interface Props extends WithStyles<typeof styles> {
  checked: boolean
  color: Color
  onChange: (color: Color) => void
}

const ColorBlock = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { classes, color, onChange, checked } = this.props
      return (
        <div
          className={classes.root}
          style={{ backgroundColor: color[500] }}
          onClick={() => onChange(color)}
        >
          {checked && <Done style={{ marginTop: 3 }} />}
        </div>
      )
    }
  }
)
export default ColorBlock

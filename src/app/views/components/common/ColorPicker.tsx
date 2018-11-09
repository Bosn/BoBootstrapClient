import * as React from 'react'
import { createStyles, WithStyles, withStyles, Color } from '@material-ui/core'
import { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey } from '@material-ui/core/colors'
import ColorBlock from './ColorBlock'
import classnames from 'classnames'
import Slider from '@material-ui/lab/Slider'

export const GRADE_LIST = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700']
export const COLOR_LIST: Color[] = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen,
  lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey]

const styles = () => createStyles({
  root: {
    width: 750,
  },
})

interface Props extends WithStyles<typeof styles> {
  className?: string
  curColor: Color
  curGrade: string
  onColorChange: (color: Color) => void
  onGradeChange: (grade: string) => void
}

const ColorPicker = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { classes, className, onColorChange, curColor, curGrade, onGradeChange } = this.props
      let rootCls = classes.root
      if (className) {
        rootCls = classnames(className, rootCls)
      }
      return (
        <div className={rootCls}>
          {COLOR_LIST.map(color => <ColorBlock
            key={color[500]}
            color={color}
            onChange={color => { onColorChange(color) }}
            checked={color === curColor}
          />)}
          <Slider
            max={GRADE_LIST.length - 1}
            min={0}
            value={GRADE_LIST.indexOf(curGrade)}
            step={1}
            onChange={(_e, val) => { onGradeChange(GRADE_LIST[val]) }}
          />
        </div>
      )
    }
  }
)

export default ColorPicker

import { INumItem, IEntitySummary } from '@app/types'
import { createStyles, withStyles, WithStyles, Theme, Chip, Typography, MenuItem, TextField, NoSsr } from '@material-ui/core'
import * as React from 'react'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import classNames from 'classnames'
const debounce = require('debounce-promise')
const AsyncSelect = require('react-select/lib/Async').default
const Select = require('react-select').default

export type SelectedItem = Pick<IEntitySummary, 'id' | 'name'>

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      ),
    },
    noOptionsMessage: {
      fontSize: 16,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
  })

function NoOptionsMessage(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }: any) {
  return <div ref={inputRef} {...props} />
}

function Control(props: any) {
  return (
    <TextField
      style={{ minWidth: 350 }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          ref: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
    />
  )
}

function Option(props: any) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props: any) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer(props: any) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function MultiValue(props: any) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={event => {
        props.removeProps.onClick()
        props.removeProps.onMouseDown(event)
      }}
    />
  )
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
}

interface Props extends WithStyles<typeof styles> {
  loadOptions?: (input: string) => Promise<INumItem[]>
  options?: INumItem[]
  isMulti?: boolean
  selected?: INumItem[]
  value?: INumItem[]
  onChange: (selected: SelectedItem[]) => void
}

interface States {
  inputValue: string
}

const EntityACList = withStyles(styles)(
  class extends React.Component<Props, States> {
    public state = { inputValue: '' }
    public render() {
      const { classes, loadOptions, isMulti, onChange, options, selected, value } = this.props
      const commonProps = {
        cacheOptions: true,
        defaultValue: selected || [],
        isMulti: isMulti || false,
        noOptionsMessage: ({ inputValue }: { inputValue: string }) => {
          return inputValue && inputValue.trim()
            ? '搜不到数据'
            : '请输入检索关键字'
        },
        onChange: (vals: INumItem[] | INumItem) => {
          if (Array.isArray(vals)) {
            onChange(vals.map(x => ({ id: x.value, name: x.label })))
          } else {
            onChange([{ id: vals.value, name: vals.label }])
          }
        },
        placeholder: `请选择(${isMulti ? '多选' : '单选'})`,
        styles: {
          menu: () => ({
            zIndex: 100,
          }),
        },
      }

      if (value) {
        (commonProps as any).value = value
      }

      if (loadOptions) {
        return (
          <div className={classes.root}>
            <NoSsr>
              <AsyncSelect
                classes={classes}
                loadOptions={debounce(loadOptions, 250)}
                components={components}
                {...commonProps}
              />
            </NoSsr>
          </div>
        )
      } else if (options) {
        return (
          <div className={classes.root}>
            <NoSsr>
              <Select
                classes={classes}
                options={options}
                components={components}
                {...commonProps}
              />
            </NoSsr>
          </div>
        )
      } else {
        throw new Error(
          'One of props.options and props.loadOptions is required.'
        )
      }
    }
  }
)

export default EntityACList

import { TOrder } from '@app/types'
import { columnData, ColumnKey } from '@app/views/components/smart/customer/CustomerTable'
import Checkbox from '@material-ui/core/Checkbox'
import Hidden from '@material-ui/core/Hidden'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import * as React from 'react'

interface Props {
  onSelectAllClick: any
  order: TOrder
  orderBy: ColumnKey
  numSelected: number
  rowCount: number
  isBatchEditMode: boolean
  onRequestSort: any
  className?: string
}

class CustomerTableHead extends React.Component<Props> {
  public createSortHandler = (property: ColumnKey) => (event: any) => {
    this.props.onRequestSort(event, property)
  }

  public render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, isBatchEditMode, className } = this.props

    return (
      <TableHead className={className}>
        <TableRow>
          {isBatchEditMode &&
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          }
          {columnData.filter(column => !isBatchEditMode || column.id !== 'id').map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
          <Hidden xsDown={true}>
            <TableCell>性别</TableCell>
          </Hidden>
          <Hidden xsDown={true}>
            <TableCell>电话</TableCell>
          </Hidden>
        </TableRow>
      </TableHead>
    )
  }
}

export default CustomerTableHead

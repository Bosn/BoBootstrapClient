import * as React from 'react'
import MaskedInput from 'react-text-mask'
const NumberFormat = require('react-number-format')

export function MobileMask(props: any) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      guide={false}
      mask={[/[1-9]/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask={true}
    />
  )
}

export function MoneyFormat(props: any) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(values: any) => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator={true}
      prefix="￥"
    />
  )
}

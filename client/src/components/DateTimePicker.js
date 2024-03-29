import { KeyboardDatePicker } from '@material-ui/pickers'
import moment from "moment"
import React, { PureComponent } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

class _DatePickerInput extends PureComponent {
  render () {
    const { input, label, className, meta: { error, touched }, required, ...rest } = this.props

    return (
        <KeyboardDatePicker 
          required={required}
          {...rest}
          {...input}
          autoOk
          fullWidth
          clearable
          disableFuture={rest.disableFuture || true}
          placeholder="19.05.1919"
          format="dd.MM.yyyy"
          label={label}
          invalidDateMessage={"Geçersiz tarih"}
          InputLabelProps={{shrink: true}}
          //className={classnames(className, { 'form-control-danger': error })}
          onChange={(date) => { input.onChange(date) }}
          onBlur={() => input.onBlur(input.value)}
          value={input.value || null} />
    )
  }
}

class _StaticDatePickerInput extends PureComponent {
    render () {
      const { input, label, defaultValue, className, required, ...rest } = this.props
  
      return (
          <KeyboardDatePicker
              {...rest}
              maxDate={moment().add(2, 'month').toDate()}
              autoOk
              fullWidth
              clearable
              variant="static"
              disableFuture={false}
              disablePast={true}
              placeholder={this.props.placeholder || "19.05.1919"}
              format="dd.MM.yyyy"
              label={label}
              invalidDateMessage={"Geçersiz tarih"}
              InputLabelProps={{shrink: true}}
              disableToolbar={true}
              views={["year", "month", "date"]}
              //className={classnames(className, { 'form-control-danger': error })}
              onChange={(date) => this.props.onChange(date)}
              value={this.props.value || null} />
      )
    }
  }

 export const DatePickerInput = _DatePickerInput;
 export const StaticDatePickerInput = _StaticDatePickerInput;
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { I18n, Translate } from 'react-redux-i18n'
import classnames from 'classnames'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker  } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class DatePickerInput extends PureComponent {
  render () {
    const { input, label, className, meta: { error, touched }, required, ...rest } = this.props

    return (
        <KeyboardDatePicker 
            {...rest}
            {...input}
            autoOk
            fullWidth
            clearable
            disableFuture={true}
            placeholder="29.10.1923"
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

DatePickerInput.propTypes = {
  className: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool
}

DatePickerInput.defaultProps = {
  className: 'form-control',
  required: false
}

export default DatePickerInput
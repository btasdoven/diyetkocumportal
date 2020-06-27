import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MaskedInput from 'react-text-mask';
import { Field, reduxForm } from "redux-form";




const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: 'calc(50% - 12px)',
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'relative',
    width: '100%',
  },
});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      {...input}
      {...custom}
      InputLabelProps={{color: 'primary', shrink: true}}
      error={touched && error != undefined}
      helperText={touched && error ? error : undefined}
    />
  )
};

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', '9', '0', ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
      guide={false}
      showMask={true}
      placeholder={"+90 "}
    />
  );
}

const renderMaskedTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      {...input}
      {...custom}
      InputLabelProps={{color: 'primary', shrink: true}}
      InputProps={{inputComponent: TextMaskCustom}}
      error={touched && error != undefined}
      helperText={touched && error ? error : undefined}
    />
  )
};

const ReduxFormCheckBox = ({name, label, ...props}) => (
  <Field
    name={name}
    label={label}
    component={renderCheckBox}
    {...props}
  />
)

const renderCheckBox = props => {
const { input, label, ...rest } = props;

return (
    <FormControlLabel
      control={<Checkbox 
        {...input} 
        {...rest}
        size="small"
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)} 
        value={input.value}
        checked={input.value == true}
        color="primary"/> 
      }
      label={label}
    />
)
}

const validPhone = value => value && !/^\+90 [1-9][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/i.test(value) ? 'Geçerli bir telefon numarası değil' : undefined;
const validEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Geçerli bir e-posta adresi değil' : undefined;
const required = value => value ? undefined : 'Zorunlu'
const matchPasswords = (pass1, allValues) => pass1 !== allValues.password ? 'Girdiğin şifreler eşleşmiyor' : undefined;

const SigninForm = props => {
  const { auth, handleSubmit, onSubmit, classes } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {/* <FormControl margin="normal" fullWidth>
        <Field
          required
          id="name"
          name="name"
          component={renderTextField}
          label="Adın ve soyadın"
          autoComplete="name"
          autoFocus={false}
          validate={[required]}
        />
      </FormControl> */}
      <FormControl margin="normal" fullWidth>
        <Field
          required
          id="username"
          name="username"
          component={renderTextField}
          label="Instagram kullanıcı adın"
          autoComplete="username"
          autoFocus={false}
          validate={[required]}
        />
      </FormControl>
      {/* <FormControl margin="normal" fullWidth>
        <Field
          required
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          component={renderTextField}
          label="Şifre Yeniden"
          validate={[required, matchPasswords]}
        />
      </FormControl> */}
      <FormControl margin="normal" fullWidth>
        <Field
          required
          id="email"
          name="email"
          component={renderTextField}
          label="E-posta adresin"
          autoComplete="email"
          autoFocus={false}
          validate={[required, validEmail]}
        />
      </FormControl>
      {/* <FormControl margin="normal" fullWidth>
        <Field
          required
          id="tel"
          name="tel"
          component={renderMaskedTextField}
          label="Telefon numaran"
          autoComplete="mobile"
          autoFocus={false}
          validate={[required, validPhone]}
        />
      </FormControl> */}

      {auth && auth.error && (
        <Typography color="error" variant="body1" className={classes.registerTypo}>
            {auth.error}
        </Typography>
      )}

      <div className={classes.buttonRoot}>
      <div className={classes.buttonWrapper}>
        <Button
          type="submit"
          disableElevation
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={props.pristine || props.invalid || (auth && auth.sendingForgotPasswordEmail)}
        >
          ŞİFREMİ YENİLE
        </Button>
        {auth && auth.sendingForgotPasswordEmail && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      </div>
    </form>
  );
};

export default reduxForm({
  initialValues: {
    // username: 'demo',
    // password: '1234'
  },
  form: "sendForgotPasswordEmail"
})(withStyles(styles)(SigninForm));

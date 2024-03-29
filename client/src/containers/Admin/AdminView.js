import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { withSnackbar } from 'material-ui-snackbar-provider';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field } from "redux-form";
import { getLinkInfo } from '../../store/reducers/api.links';
import AddBlogPost from './AddBlogPost';
import AddMapLocation from './AddMapLocation';
import AddPayment from './AddPayment';
import AddPhoto from './AddPhoto';

const DietitianList = React.lazy(() => import('./DietitianList'));

const styles = theme => ({
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      //height: 'calc(100vh - 48px)',
      padding: theme.spacing(1),
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
  text: {
      height: "inherit",
      width: '100%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
  },
  content: {
    //flexGrow: 1,
    //marginLeft: theme.spacing(7),
    //padding: theme.spacing(1),
    marginTop: theme.spacing(6),
    //overflowX: "hidden",
    //paddingBottom: '48px',
    //height: '100vh',
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 
  
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



const ReduxFormSelect = ({name, label, values, ...props}) => (
  <FormControl
    //margin="normal"
    style={{width: '100%'}}
  >
    <InputLabel shrink={true} id={label}>{label}</InputLabel>

    <Field
      name={name}
      options={values}
      component={renderSelect}
      {...props}
    />
  </FormControl>
)

const renderSelect = props => {
  const { input, options } = props;

  return (
    <Select 
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      value={input.value}
    >
      {options.map((val) => <MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>)}
    </Select>
  )
}

const ReduxFormTextField = ({name, label, ...props}) => (
  <Field
      name={name}
      component={renderTextField}
      label={label}
      {...props}
  />)

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  // <InputBase
  //     label={label}
  //     placeholder={label}
  //     error={touched && invalid}
  //     {...input}
  //     {...custom}
  //     fullWidth
  // />
  <TextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    fullWidth
    color="primary"
    InputLabelProps={{color: 'primary', shrink: true}}
  />
)

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

class Envanter extends React.Component {

  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);

    this.state = {
      value: 0,
    }
  }

  handleValueChange = (ev, newVal) => {
    if (this.state.value != newVal) {
      this.setState({value: newVal})
    }
  }

  isLoaded() {
    var loaded = this.props.apiLinks != undefined &&
      this.props.apiLinks[this.state.linkId] != undefined &&
      this.props.apiLinks[this.state.linkId].isGetLoading != true &&
      this.props.apiLinks[this.state.linkId].data != undefined;

      return true;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      //this.props.getLinkInfo(this.state.linkId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    if (showLoader)
      return renderLoadingButton(classes)
    else
      return (
        <span>
          <Tabs
            value={this.state.value}
            onChange={this.handleValueChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="FOTO YÜKLE" {...a11yProps(0)} />
            <Tab label="POST YÜKLE" {...a11yProps(1)} />
            <Tab label="DİYETİSYENLER" {...a11yProps(2)} />
            <Tab label="HARITA EKLE" {...a11yProps(3)} />
            <Tab label="ÖDEME EKLE" {...a11yProps(3)} />
          </Tabs>
          <main className={classes.content}>
            <TabPanel value={this.state.value} index={0}>
              <AddPhoto />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <AddBlogPost />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <DietitianList />
            </TabPanel>
            <TabPanel value={this.state.value} index={3}>
              <AddMapLocation />
            </TabPanel>
            <TabPanel value={this.state.value} index={4}>
              <AddPayment />
            </TabPanel>
          </main>
        </span>
      )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiLinks: state.apiLinks,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLinkInfo: (linkId) => getLinkInfo(linkId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar()(Envanter)));

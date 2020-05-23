import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDanisanDietList, putDanisanDietList } from '../../store/reducers/api.danisanDietList';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Badge from '@material-ui/core/Badge';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import DateTimePicker from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';

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
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
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
      readOnly={true}
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
    InputProps={{disableUnderline: true}}
    label={label}
    error={touched && invalid}
    {...input}
    {...custom}
    fullWidth
    color="primary"
    readOnly={true}
    inputProps={{
      readOnly: true,
    }}
  />
)
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
  }

  isLoaded() {
    var loaded = this.props.apiDanisanDietList != undefined &&
      this.props.apiDanisanDietList[this.props.userId] != undefined &&
      this.props.apiDanisanDietList[this.props.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanDietList[this.props.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanDietList[this.props.userId][this.props.danisanUserName].data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanDietList(this.props.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
      console.log(formValues);
      this.props.putDanisanDietList(this.props.userId, this.props.danisanUserName, formValues);
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var doesDietListExist = showLoader ? undefined : Object.keys(this.props.apiDanisanDietList[this.props.userId][this.props.danisanUserName].data).length > 1
    
    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && !doesDietListExist && (
          <div className={classes.rootLoading}>
            <Typography style={{textAlign: 'center', marginTop: '8px'}} variant="body2">Diyetisyeniniz diyet programınızı daha paylaşmadı.</Typography>
          </div>
        )}
        { !showLoader && doesDietListExist && 
          <span>
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
              {this.props.apiForm && this.props.apiForm[this.props.form] && this.props.apiForm[this.props.form].values && this.props.apiForm[this.props.form].values.free_format_diet == true && (
                <Card variant="outlined" className={classes.card}>
                  <CardHeader
                    title={
                      <Typography color="secondary" variant="button" gutterBottom>
                        DİYET PROGRAMI
                      </Typography>
                    }
                  />
                  <CardContent style={{paddingTop:0}}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ReduxFormTextField 
                            multiline
                            name="free_format_program"
                            // placeholder="Programın detaylarını, beklediğiniz fiziksel aktiviteleri, tüketilecek su miktarını vs. buraya yazabilirsiniz..."
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
              
              {this.props.apiForm && this.props.apiForm[this.props.form] && this.props.apiForm[this.props.form].values && this.props.apiForm[this.props.form].values.free_format_diet != true && (
                <span>
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          PROGRAM
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="program"
                              // placeholder="Programın detaylarını, beklediğiniz fiziksel aktiviteleri, tüketilecek su miktarını vs. buraya yazabilirsiniz..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          KAHVALTI
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="kahvalti"
                              // placeholder="Kahvaltıda danışanınızın tüketmesini beklediğiniz besinleri buraya yazabilirsiniz.."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          1. ARA ÖĞÜN
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="ara_ogun_1"
                              // placeholder="Kahvaltı ile öğle yemeği arası..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          ÖĞLE YEMEĞİ
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="ogle_yemegi"
                              // placeholder="Öğle yemeği..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          2. ARA ÖĞÜN
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="ara_ogun_2"
                              // placeholder="Öğle yemeği ile akşam yemeği arası..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          AKŞAM YEMEĞİ
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="aksam_yemegi"
                              // placeholder="Akşam yemeği..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      title={
                        <Typography color="secondary" variant="button" gutterBottom>
                          SON ÖĞÜN
                        </Typography>
                      }
                    />
                    <CardContent style={{paddingTop:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ReduxFormTextField 
                              multiline
                              name="son_ogun"
                              // placeholder="Akşam yemeğinden sonra ve yatmadan önce..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </span>
              )}
            </Form>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiForm: state.form,
    apiDanisanDietList: state.apiDanisanDietList,
    initialValues: 
      state.apiDanisanDietList[ownProps.userId] != undefined && 
      state.apiDanisanDietList[ownProps.userId][ownProps.danisanUserName] != undefined
        ? state.apiDanisanDietList[ownProps.userId][ownProps.danisanUserName].data
        : {},
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanDietList: (userId, danisanUserName) => getDanisanDietList(userId, danisanUserName),
      putDanisanDietList: (userId, danisanUserName, danisanDietList) => putDanisanDietList(userId, danisanUserName, danisanDietList)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanDiyetListesiForm', enableReinitialize: true })(withStyles(styles)(Envanter)));

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withSnackbar } from 'material-ui-snackbar-provider'
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Switch from '@material-ui/core/Switch';

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDietitianProfile, putDietitianProfile } from '../../store/reducers/api.dietitianProfile';

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
import { Form, Field, reduxForm } from "redux-form";
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import DateTimePicker from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import MaskedInput from 'react-text-mask';

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
      width: '100%',
      maxWidth: '800px',
      margin: 'auto'
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
  
const ReduxFormSwitch = ({name, label, ...props}) => (
    <Field
      name={name}
      label={label}
      component={renderSwitch}
      {...props}
    />
)

const renderSwitch = props => {
  const { input, label, ...rest } = props;
  return (
    <FormControlLabel
      control={
        <Switch  
          onChange={value => input.onChange(value)}
          value={input.value}
          checked={input.value == true}
        />
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

const ReduxFormMaskedTextField = ({name, label, ...props}) => (
  <Field
      name={name}
      component={renderMaskedTextField}
      label={label}
      {...props}
  />)

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
  
const ApptDays = () => {
  return [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ]
}

const ApptHours = () => {
  var s = 7;
  var e = 18;
  var ret = []
  for (var i = s; i <= e; ++i) {
    var hour = i < 10 ? "0" + i.toString() : i.toString();
    var hour1 = i+1 < 10 ? "0" + (i+1).toString() : (i+1).toString();
    ret.push(hour + ":00 - " + hour + ":30");
    ret.push(hour + ":30 - " + hour1 + ":00");
  }

  return ret;
}
class Envanter extends React.Component {

  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    this.handleExpand = this.handleExpand.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      user: JSON.parse(localStorage.getItem('user')),
      linkCopied: false,
      expandList: {},
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianProfile != undefined &&
      this.props.apiDietitianProfile[this.state.userId] != undefined &&
      this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianProfile[this.state.userId].data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianProfile(this.state.userId);
    }
  }

  onSubmitInternal(formValues) {
      this.props.putDietitianProfile(this.state.userId, formValues);
  }

  handleLinkCopied() {
    this.setState({ linkCopied: true })
    this.props.snackbar.showMessage(
      'Randevu linkiniz panoya kopyalandı.',
      //'Undo', () => handleUndo()
    )
  }

  handleExpand(panel) {
    return (event, isExpanded) => {
      console.log(isExpanded, panel)
      this.setState({ 
        expandList: {
          ...this.state.expandList,
          [panel]: isExpanded
        }
      });
    };
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitianProfile = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data;

    var multipleOffices = 
      this.props.apiForm && 
      this.props.apiForm[this.props.form] && 
      this.props.apiForm[this.props.form].values && 
      this.props.apiForm[this.props.form].values.address_2 != undefined &&
      this.props.apiForm[this.props.form].values.address_2 != "";

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <SpeedDial
                icon={<SaveIcon />}
                iconText={"KAYDET"}
                hidden={this.props.pristine}
                onClickFab={this.props.handleSubmit(this.onSubmitInternal)}
                // actions={[
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
                // ]}
              />

            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
              <Card variant="outlined" className={classes.card}>
                <CardHeader
                  avatar={
                      <Avatar className={classes.avatar} alt={this.state.user.name} src={this.state.user.url} />
                  }
                  // action={
                  //   <div>
                  //     <IconButton aria-label="settings" onClick={this.handleClick}>
                  //       <MoreVertIcon />
                  //     </IconButton>
                  //     <Menu
                  //       id="simple-menu"
                  //       anchorEl={this.state.anchorEl}
                  //       keepMounted
                  //       open={this.state.anchorEl != undefined}
                  //       onClose={this.handleClose}
                  //     >
                  //       <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                  //     </Menu>
                  //   </div>
                  // }
                  title={<Typography variant="h5" component="h2">{this.state.user.name}</Typography>}
                  //subheader={JSON.stringify(user)}
                />
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
                /> */}
                {/* <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {userLocalInfo.isClaimed ? "hh" : "aa"}
                    </Typography>
                </CardContent>
                */}
                {/* <Divider />
                <CardActions disableSpacing>
                  <Button disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
                    KAYDET
                  </Button>
                  <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton>
                  <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                  >
                      <ExpandMoreIcon />
                  </IconButton>
                </CardActions>  */}
              </Card>

              <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                  title={
                    <Typography color="secondary" variant="button" gutterBottom>
                     KİŞİSEL SAYFAM
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">Kendini tanıtabileceğin, danışanların senden randevu alabileceği ve blog yazıları paylaşabileceğin kişisel sayfanın linkini buradan kopyalayabilir ve instagram sayfana koyabilirsin.</Typography>
                      </div>
                    </Grid>

                    <Grid style={{textAlign:'center'}} item xs={12}>
                      <CopyToClipboard text={dietitianProfile.link != undefined ? dietitianProfile.link : "diyetkocum.net/d/" + this.state.user.username} >
                        <span>
                          <Chip
                            //avatar={<Avatar>M</Avatar>}
                            label={dietitianProfile.link != undefined ? dietitianProfile.link : "diyetkocum.net/d/" + this.state.user.username}
                            clickable
                            color="primary"
                            onClick={this.handleLinkCopied}
                            onDelete={this.handleLinkCopied}
                            deleteIcon={this.state.linkCopied ? <DoneIcon color="primary" /> : <FileCopyIcon  color="primary"/>}
                            variant="outlined"
                          />
                        </span>
                      </CopyToClipboard>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: '8px'}}>
                      <Typography variant="body2">Kişisel sayfanın nasıl gözüktüğünü görmek ister misin?</Typography>
                      <div style={{marginTop: '16px', textAlign: 'center'}}>
                        <Button style={{borderRadius: '16px'}} href={"https://diyetkocum.net/d/" + this.state.user.username} component="a" size="small" color="primary" variant="outlined">KİŞİSEL SAYFAMI GÖR</Button>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('kisisel_bilg')} expanded={this.state.expandList['kisisel_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button" gutterBottom>
                    KİŞİSEL BİLGİLERİM
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="unvan" label="Ünvanım" />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField name="instagram" label="Instagram kullanıcı adım" />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField rows={3} rowsMax={6} multiline name="ozgecmis" label="Öz geçmişim" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('iletisim_bilg')} expanded={this.state.expandList['iletisim_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button" gutterBottom>
                    İLETİŞİM BİLGİLERİM
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">İletişim bilgilerinizi eksiksiz girmeniz sizden randevu alan danışanların size daha kolay bir şekilde ulaşmasını sağlar.</Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField name="email" label="E-posta adresim" />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormMaskedTextField fullWidth name="tel" label="Telefon numaram" />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField name="address" label="Ofis adresim" />
                    </Grid>

                    {this.props.apiForm && 
                      this.props.apiForm[this.props.form] && 
                      this.props.apiForm[this.props.form].initial && 
                      this.props.apiForm[this.props.form].initial.address != undefined && 
                      this.props.apiForm[this.props.form].initial.address != "" && (
                        <Grid item xs={12}>
                          <ReduxFormTextField name="address_2" label="2. Ofis adresim" />
                        </Grid>
                      )}
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('online_diy')} expanded={this.state.expandList['online_diy'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button" gutterBottom>
                    ONLİNE DİYET
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                      <ReduxFormSwitch name="online_diyet" label={<Typography variant="body2">Online Diyet istekleri gelsin</Typography>}/>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_saat')} expanded={this.state.expandList['randevu_saat'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button" gutterBottom>
                  YÜZ YÜZE RANDEVU SAATLERİM
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">Yukarıdaki linki paylaştığınız danışanlarınız aşağıda seçtiğiniz saat aralıklarına göre randevu isteklerini otomatik olarak sizin e-posta adresinize onayınız için gönderebilirler.</Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        { ApptHours().map( (h, i) =>
                          <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} key={i} item xs={6}>
                            <ReduxFormCheckBox name={h} label={h}/>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_gun')} expanded={this.state.expandList['randevu_gun'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button" gutterBottom>
                    RANDEVU GÜNLERİM {multipleOffices ? "(1. Ofis)" : ""}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    { ApptDays().map( (h, i) => {
                      return (
                          <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} key={i} item xs={12}>
                            <ReduxFormCheckBox name={h} label={h}/>
                          </Grid>
                      )}
                    )}
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              { multipleOffices && (
                <ExpansionPanel className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_gun_2')} expanded={this.state.expandList['randevu_gun_2'] || false}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography color="secondary" variant="button" gutterBottom>
                      RANDEVU GÜNLERİM (2. Ofis)
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                      { ApptDays().map( (h, i) => {
                        return (
                            <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} key={i} item xs={12}>
                              <ReduxFormCheckBox name={h + "_2"} label={h}/>
                            </Grid>
                        )}
                      )}
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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
    apiDietitianProfile: state.apiDietitianProfile,
    initialValues: 
      state.apiDietitianProfile[ownProps.userId] != undefined
        ? state.apiDietitianProfile[ownProps.userId].data
        : { },
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianProfile: (userId) => getDietitianProfile(userId),
      putDietitianProfile: (userId, dietitianProfile) => putDietitianProfile(userId, dietitianProfile)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenProfileForm', enableReinitialize: true })(withStyles(styles)(withSnackbar()(Envanter))));

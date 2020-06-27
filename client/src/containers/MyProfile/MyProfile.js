
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';
import { withSnackbar } from 'material-ui-snackbar-provider';
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import ExtendedLink from '../../components/ExtendedLink';
import NewAddressDialog from '../../components/NewAddressDialog';
import SelectAddressDialog from '../../components/SelectAddressDialog';
import ShowAddressOnMap from '../../components/ShowAddressOnMap';
import UzmanlikAlanlariAutocomplete from '../../components/UzmanlikAlanlariAutocomplete';
import { userService } from '../../services/user.service';
import { getDietitianProfile, putDietitianProfile, uploadProfilePhoto } from '../../store/reducers/api.dietitianProfile';
import SpeedDial from '../SpeedDial/SpeedDial';










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
    borderRadius: '4px',
    '&::before': {
      backgroundColor: 'transparent'
    }
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


class FieldFileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { onChange } = this.props
    onChange(e.target.files[0])
  }

  render() {
    return(
      <Button size="small" component="label" color="default" startIcon={<AddAPhotoIcon />}>
        PROFİL FOTOĞRAFI DEĞİŞTİR
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </Button>
    )
  }
}

class Envanter extends React.Component {

  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);

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

  onChangeProfilePicture(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file)

    this.props.uploadProfilePhoto(this.state.userId, formData);
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

    console.log(this.props)

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
                eventText={"DiyetisyenProfilKaydet"}
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
              <Card className={classes.card} style={{marginTop: '8px'}}>
                <CardHeader
                  avatar={
                      <Avatar className={classes.avatar} alt={this.state.user.name} src={userService.getStaticFileUri(dietitianProfile.url)} />
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
                {/* <Divider /> */}
                <CardActions disableSpacing>
                  <FieldFileInput
                    onChange={this.onChangeProfilePicture}
                  />
                  {/* <IconButton aria-label="add to favorites">
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
                  </IconButton> */}
                </CardActions> 
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
                        <Typography variant="body2">Kendini tanıtabileceğin, danışanların senden randevu alabileceği ve blog yazıları paylaşabileceğin kişisel sayfanın linkini buradan kopyalayabilir ve Instagram sayfana koyabilirsin.</Typography>
                      </div>
                    </Grid>

                    <Grid style={{textAlign:'center'}} item xs={12}>
                      <CopyToClipboard text={dietitianProfile.link != undefined ? dietitianProfile.link : "diyetkocum.net/" + this.state.user.username} >
                        <span>
                          <Chip
                            //avatar={<Avatar>M</Avatar>}
                            label={dietitianProfile.link != undefined ? dietitianProfile.link : "diyetkocum.net/" + this.state.user.username}
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
                        <Button style={{borderRadius: '16px'}} to={"/" + this.state.user.username} component={ExtendedLink} size="small" color="primary" variant="outlined">
                          KİŞİSEL SAYFAMI GÖR
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('kisisel_bilg')} expanded={this.state.expandList['kisisel_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    KİŞİSEL BİLGİLERİM
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="unvan" label="Ünvanım" />
                    </Grid>
{/* 
                    <Grid item xs={12}>
                      <ReduxFormTextField name="instagram" label="Instagram kullanıcı adım" />
                    </Grid> */}

                    {/* <Grid item xs={12}>
                      <ReduxFormTextField multiline name="uzmanlik_alanlari" label="Uzmanlık alanlarım" />
                    </Grid> */}

                    
                    <Grid item xs={12}>
                      <Field
                        name="uzmanlik_alanlari_v2"
                        label="Uzmanlık alanlarım"
                        component={UzmanlikAlanlariAutocomplete}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField multiline name="university" label="Mezun olduğum okul" />
                    </Grid>

                    <Grid item xs={12}>
                      <ReduxFormTextField rows={3} rowsMax={6} multiline name="ozgecmis" label="Hakkımda" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('iletisim_bilg')} expanded={this.state.expandList['iletisim_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
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
                      <ReduxFormTextField disabled InputProps={{ readOnly: true }} name="instagram" label="Instagram kullanıcı adım" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('online_diy')} expanded={this.state.expandList['online_diy'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
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

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_saat')} expanded={this.state.expandList['randevu_saat'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                  YÜZ YÜZE RANDEVU
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                      <ReduxFormSwitch name="yuzyuze_diyet" label={<Typography variant="body2">Yüz yüze randevu istekleri gelsin</Typography>}/>
                    </Grid>

                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">Yüz yüze randevu verebilmek için sistemimizde en az bir ofis adresinizin kayıtlı bulunması gerekmektedir.</Typography>
                      </div>
                    </Grid>

                    {/* <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">Yukarıdaki linki paylaştığınız danışanlarınız aşağıda seçtiğiniz saat aralıklarına göre randevu isteklerini otomatik olarak sizin e-posta adresinize onayınız için gönderebilirler.</Typography>
                      </div>
                    </Grid> */}

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

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('ofisler')} expanded={this.state.expandList['ofisler'] || true}>
                <ExpansionPanelSummary
                  // expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    OFİS ADRESLERİM
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                  {Object.keys(dietitianProfile.addresses).map((ad, idx) => {
                    var address = dietitianProfile.addresses[ad];

                    return (
                      <Fragment key={ad}>
                        <Card elevation={0} style={{width: '100%'}}>
                          {/* <CardHeader
                            avatar={
                              <Avatar square aria-label="recipe" className={classes.avatar}>
                                R
                              </Avatar>
                            }
                            action={
                              <IconButton
                                // className={clsx(classes.expand, {
                                //   [classes.expandOpen]: expanded,
                                // })}
                                onClick={() => this.handleExpand('ofis_' + ad)(null, !(this.state.expandList['ofis_' + ad] || false))}
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            }
                            title={address.address}
                            subheader="September 14, 2016"
                          /> */}

                          {address.latlng && <ShowAddressOnMap latlng={address.latlng}/>}
                          <div style={{display:'flex', alignItems: 'center', marginTop: '16px'}}>
                            {this.state.expandList['ofis_' + ad] == true && <ReduxFormTextField name={`addresses["${ad}"].address`} label="Adres" />}
                            {this.state.expandList['ofis_' + ad] != true && <Typography variant="body1" >{address.address}</Typography>}
                            <IconButton
                              style={
                                (this.state.expandList['ofis_' + ad] || false) 
                                  ? {marginLeft: 'auto', transform: 'rotate(180deg)'}
                                  : {marginLeft: 'auto', transform: 'rotate(0deg)'}
                              }
                              onClick={() => this.handleExpand('ofis_' + ad)(null, !(this.state.expandList['ofis_' + ad] || false))}
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </div>

                          {/* <CardActions style={{padding: 0}} disableSpacing>
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                              <ShareIcon />
                            </IconButton>
                          </CardActions> */}
                          <Collapse in={this.state.expandList['ofis_' + ad] || false} timeout="auto" unmountOnExit>
                            <Grid container spacing={2} style={{paddingTop: '24px'}}>
                              {/* <Grid style={{paddingTop: '8px', paddingBottom: '8px', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                                <ReduxFormTextField name={`addresses["${ad}"].address`} label="Adres" />
                              </Grid> */}
                              <Grid style={{paddingTop: '8px', paddingBottom: '8px', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                                <Field component="input" name={`addresses["${ad}"].latlng.lat`} label="Lat" type="hidden" />
                                <Field component="input" name={`addresses["${ad}"].latlng.lng`} label="Lng" type="hidden" />
                                <Field component="input" name={`addresses["${ad}"].latlng.zoom`} label="Zoom" type="hidden" />
                                <Button variant="outlined" color="secondary" onClick={() => this.setState({openDialog: `address_${ad}_map`})}>
                                  HARİTADAN KONUM SEÇ
                                </Button>                        

                                {this.state.openDialog == `address_${ad}_map` && 
                                  <SelectAddressDialog 
                                    latlng={address.latlng}
                                    handleClose = {(latlng) => {
                                      if (latlng != undefined) {
                                        this.props.change(`addresses["${ad}"].latlng.lat`, latlng.lat)
                                        this.props.change(`addresses["${ad}"].latlng.lng`, latlng.lng)
                                        this.props.change(`addresses["${ad}"].latlng.zoom`, latlng.zoom)
                                        setTimeout(() => {
                                          const submitter = this.props.handleSubmit(this.onSubmitInternal);
                                          submitter()
                                        }, 0);
                                      }
                                      this.setState({openDialog: undefined})
                                    }}
                                  />
                                }
                              </Grid>
                              { ApptDays().map( (h, i) => {
                                return (
                                  <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} key={i} item xs={12} sm={6} md={4} lg={3}>
                                    <ReduxFormCheckBox name={`addresses["${ad}"].days["${h}"]`} label={h}/>
                                  </Grid>
                                )}
                              )}
                            </Grid>
                          </Collapse>
                        </Card>
                        <Divider style={{marginTop: '16px', marginBottom: '16px'}} />
                      </Fragment>
                    )
                  })}

                  {this.state.openDialog == `address_new_map` && 
                    <NewAddressDialog 
                      form={this.props.form}
                      // latlng={address.latlng}
                      handleClose = {(ad, latlng) => {
                        if (latlng != undefined) {
                          this.props.change(`addresses["${ad}"].latlng.lat`, latlng.lat)
                          this.props.change(`addresses["${ad}"].latlng.lng`, latlng.lng)
                          this.props.change(`addresses["${ad}"].latlng.zoom`, latlng.zoom)
                          setTimeout(() => {
                            const submitter = this.props.handleSubmit(this.onSubmitInternal);
                            submitter()
                          }, 0);
                        }
                        this.setState({openDialog: undefined})
                      }}
                    />
                  }
                  <Button variant="contained" color="secondary" size="large" onClick={() => this.setState({openDialog: `address_new_map`})}>YENİ OFİS ADRESİ EKLE</Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              
              {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_gun')} expanded={this.state.expandList['randevu_gun'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
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
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('randevu_gun_2')} expanded={this.state.expandList['randevu_gun_2'] || false}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography color="secondary" variant="button">
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
              )} */}
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
      uploadProfilePhoto: (userId, files) => uploadProfilePhoto(userId, files),
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

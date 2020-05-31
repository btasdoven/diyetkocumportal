import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

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
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { withSnackbar } from 'material-ui-snackbar-provider'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { logout } from "../../store/reducers/authenticate";

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDanisanProfile, putDanisanProfile } from '../../store/reducers/api.danisanProfile';
import { getDanisanFiles, addDanisanFiles } from '../../store/reducers/api.danisanFiles'
import moment from "moment";
import { userService } from '../../services/user.service'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import KanTahlili from './KisiselBilgilerKanTahlili'

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
import AddIcon from '@material-ui/icons/Add';
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

import { DatePickerInput } from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
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
    borderRadius: '4px',
    '&::before': {
      backgroundColor: 'transparent'
    }
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      margin: theme.spacing(1),
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
  text: {
      height: "inherit",
      width: '100%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
  },
  divCategory: {
    marginTop: theme.spacing(3),
  }
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
      fullWidth
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
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    this.handleExpand = this.handleExpand.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      expandList: {},
    }
  }

  isLoaded() {

    var loaded = this.props.apiDanisanProfile != undefined &&
      this.props.apiDanisanProfile[this.state.userId] != undefined &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanProfile(this.state.userId, this.props.danisanUserName);
      //this.props.getDanisanFiles(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
      console.log(formValues);
      this.props.putDanisanProfile(this.state.userId, this.props.danisanUserName, formValues);
  }

  handleLinkCopied() {
    this.setState({ linkCopied: true })
    this.props.snackbar.showMessage(
      'Anamnez formu linki panoya kopyalandı.',
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

    const danisanProfile = showLoader ? undefined : this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].data;

    if (!showLoader && Object.keys(danisanProfile).length == 0) {
      return (
        <div className={classes.root} style={{textAlign: 'center'}}>
          <div style={{padding: '8px'}}>Ulaşmaya çalışığınız danışan giriş yapmış olduğunuz hesaba ait değildir.</div>
          <div style={{padding: '8px'}}>Giriş yapmış olduğunuz hesap: {this.state.userId}</div>
          <Button style={{padding: '8px'}} color="primary" variant="contained" onClick={this.props.logout}>ÇIK ve YENİDEN GİRİŞ YAP</Button>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Button style={{marginRight: '8px'}} variant="outlined" size="small" color="primary" startIcon={<ShareIcon />}>
          DANIŞAN İLE PAYLAŞ
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
              <SpeedDial
                icon={<SaveIcon />}
                iconText={"KAYDET"}
                eventText={"DanisanKisiselBilgilerKaydet"}
                hidden={this.props.pristine}
                onClickFab={this.props.handleSubmit(this.onSubmitInternal)}
                // actions={[
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
                // ]}
              />

              <Card variant="outlined" className={classes.card}>
                <CardHeader
                  avatar={
                      <Avatar className={classes.avatar} alt={danisanProfile.name} src={danisanProfile.url} />
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
                  title={<Typography variant="h5" component="h2">{danisanProfile.name}</Typography>}
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
                  <Button size="small" color="primary" component={Link} to={"/l/" + danisanProfile.hash} startIcon={<SaveIcon />}>
                   {danisanProfile.hash} 
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
                      ÖZEL DANIŞAN LİNKİ
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">
                          Danışanının aşağıdaki tüm bilgileri online olarak doldurmasını ya da hazırladığın diyet programını görmesini istersen bu linki onlarla paylaşabilirsin. 
                          Danışanın link üzerinden bilgileri doldurduğunda bilgileri bu sayfadan görebileceksin.
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} style={{textAlign: 'center'}}>
                      <CopyToClipboard text={"https://diyetkocum.net/l/" + danisanProfile.hash} >
                        <span>
                          <Chip
                            //avatar={<Avatar>M</Avatar>}
                            label={"https://diyetkocum.net/l/" + danisanProfile.hash}
                            clickable
                            color="primary"
                            onClick={this.handleLinkCopied}
                            onDelete={this.handleLinkCopied}
                            deleteIcon={this.state.linkCopied ? <DoneIcon fontSize="small" color="primary" /> : <FileCopyIcon fontSize="small" color="primary"/>}
                            variant="outlined"
                          />
                        </span>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* </div> */}
              </Card>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('diyet_paketi')} expanded={this.state.expandList['diyet_paketi'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    DİYET PAKETİ
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='start_date' label="Diyet başlangıçı" component={DatePickerInput} />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="ucret_paketi" label="Diyet paketi adı" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField helperText={<Typography variant="caption" color="primary">Ücreti danışanınız göremez</Typography>} name="ucret_paketi_ucreti" label="Diyet paketi ücreti" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('kisisel_bilg')} expanded={this.state.expandList['kisisel_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    KİŞİSEL BİLGİLER
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field name='birthday' label="Doğum tarihi" component={DatePickerInput} />
                    </Grid>
                    <Grid item xs={6}>
                      <ReduxFormSelect
                        name="cinsiyet"
                        label="Cinsiyeti"
                        values={[
                          {
                          label: 'Kadın',
                          value: 'Kadın',
                          },
                          {
                          label: 'Erkek',
                          value: 'Erkek',
                          },
                          {
                          label: 'Diğer',
                          value: 'Diğer',
                          },
                        ]}
                      />
                    </Grid>
                    {/* <Grid item xs={3} sm={3} md={3} lg={3}>
                      <ReduxFormTextField name="kilo" label="Kilosu" type="number" InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}} />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <ReduxFormTextField name="boy" label="Boyu" type="number" InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}} />
                    </Grid> */}
                    <Grid item xs={12}>
                      <ReduxFormTextField name="email" label="E-posta adresi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormMaskedTextField name="tel" label="Telefon numarası" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="address" label="Adresi" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('kan_tahlili')} expanded={this.state.expandList['kan_tahlili'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    KAN TAHLİLLERİ
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <KanTahlili danisanUserName={this.props.danisanUserName} />
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('saglik_bilg')} expanded={this.state.expandList['saglik_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    SAĞLIK BİLGİLERİ
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="hastalıklar" label="Tanısı Konmuş Hastalıkları" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="ilaclar" label="Düzenli Alınan İlaçlar" />
                    </Grid>
                    <Grid item xs={12} >
                      <ReduxFormTextField name="alerji" label="Besin Alerjileri" />
                    </Grid>
                    <Grid item xs={12} >
                      <ReduxFormTextField name="ishal_kabizlik" label="Kabızlık, gaz, şişkinlik ya da diyare var mı?" />
                    </Grid>
                    <Grid item xs={6}>
                      <ReduxFormSelect
                        name="uyanma_saati"
                        label="Uyanma Saati"
                        values={[
                          {
                            label: "05:00'ten önce",
                            value: "05:00'ten önce",
                          },
                          {
                            label: '05:00 - 07:00',
                            value: '05:00 - 07:00',
                          },
                          {
                            label: '07:00 - 09:00',
                            value: '07:00 - 09:00',
                          },
                          {
                            label: '09:00 - 11:00',
                            value: '09:00 - 11:00',
                          },
                          {
                            label: "11:00'den sonra",
                            value: "11:00'den sonra",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ReduxFormSelect
                        name="uyuma_saati"
                        label="Uyuma Saati"
                        values={[
                          {
                            label: "21:00'den önce",
                            value: "21:00'den önce",
                          },
                          {
                            label: '21:00 - 23:00',
                            value: '21:00 - 23:00',
                          },
                          {
                            label: '23:00 - 01:00',
                            value: '23:00 - 01:00',
                          },
                          {
                            label: "01:00'den sonra",
                            value: "01:00'den sonra",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ReduxFormSelect
                        name="uyku_duzeni"
                        label="Günlük Uyku Düzeni"
                        values={[
                          {
                            label: 'Düzenli',
                            value: 'Düzenli',
                          },
                          {
                            label: 'Düzensiz',
                            value: 'Düzensiz',
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ReduxFormSelect
                        name="regl_duzeni"
                        label="Regl Düzeni"
                        values={[
                          {
                            label: 'Düzenli',
                            value: 'Düzenli',
                          },
                          {
                            label: 'Düzensiz',
                            value: 'Düzensiz',
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="haftalik_spor"
                        label="Haftalık egzersiz miktarı"
                        values={[
                          {
                            label: 'Her gün',
                            value: 'Her gün',
                          },
                          {
                            label: 'Haftada 3-5 defa',
                            value: 'haftada 3-5 defa',
                          },
                          {
                            label: 'Haftada 1-2 defa',
                            value: 'Haftada 1-2 defa',
                          },
                          {
                            label: 'Hiç',
                            value: 'Hiç',
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <ReduxFormTextField name="spor_suresi" label="Her egzersizin süresi" />
                    </Grid>
                    <Grid item xs={12} >
                      <ReduxFormTextField name="spor_tipi" label="Egzersizin türü" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('beslenme_alis')} expanded={this.state.expandList['beslenme_alis'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    BESLENME ALIŞKANLIKLARI
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="kahvalti_saati"
                        label="Kahvaltı Saati"
                        values={[
                          {
                            label: "Yapmıyorum",
                            value: "Yapmıyorum",
                          },
                          {
                            label: "07:00'den önce",
                            value: "07:00'den önce",
                          },
                          {
                            label: '07:00 - 09:00',
                            value: '07:00 - 09:00',
                          },
                          {
                            label: '09:00 - 11:00',
                            value: '09:00 - 11:00',
                          },
                          {
                            label: "11:00'den sonra",
                            value: "11:00'den sonra",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="ogle_yemegi_saati"
                        label="Öğle Yemeği Saati"
                        values={[
                          {
                            label: "Yapmıyorum",
                            value: "Yapmıyorum",
                          },
                          {
                            label: "11:00'den önce",
                            value: "11:00'den önce",
                          },
                          {
                            label: '11:00 - 13:00',
                            value: '13:00 - 13:00',
                          },
                          {
                            label: '13:00 - 15:00',
                            value: '13:00 - 15:00',
                          },
                          {
                            label: "15:00'ten sonra",
                            value: "15:00'ten sonra",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="aksam_yemegi_saati"
                        label="Akşam Yemeği Saati"
                        values={[
                          {
                            label: "Yapmıyorum",
                            value: "Yapmıyorum",
                          },
                          {
                            label: "17:00'den önce",
                            value: "17:00'den önce",
                          },
                          {
                            label: '17:00 - 19:00',
                            value: '17:00 - 19:00',
                          },
                          {
                            label: '19:00 - 21:00',
                            value: '19:00 - 21:00',
                          },
                          {
                            label: "21:00'den sonra",
                            value: "21:00'den sonra",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="atlanan_ogunler" label="Atlanan Öğünler" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="tuketilmeyen_besinler" label="Tüketilmeyen Besinler" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="sevilen_besinler" label="En Sevdiğiniz Besinler" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="disarida_yemek" label="Dışarıda Yemek Yeme Sıklığı" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="gece_yemek" label="Gece Yemek Yeme Sıklığı" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="gunluk_su" label="Günlük Su Tüketimi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="gunluk_cay" label="Günlük Çay\Kahve Tüketimi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="gunluk_seker" label="Günlük Şeker Tüketimi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="gunluk_tereyag" label="Günlük Tereyağı/Margarin Tüketimi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="gunluk_sigara"
                        label="Sigara Tüketimi"
                        values={[
                          {
                            label: 'Her gün',
                            value: 'Her gün',
                          },
                          {
                            label: 'Haftada 3-5 defa',
                            value: 'haftada 3-5 defa',
                          },
                          {
                            label: 'Haftada 1-2 defa',
                            value: 'Haftada 1-2 defa',
                          },
                          {
                            label: 'Yok',
                            value: 'Yok',
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormSelect
                        name="gunluk_alkol"
                        label="Alkol Tüketimi"
                        values={[
                          {
                            label: 'Her gün',
                            value: 'Her gün',
                          },
                          {
                            label: 'Haftada 3-5 defa',
                            value: 'haftada 3-5 defa',
                          },
                          {
                            label: 'Haftada 1-2 defa',
                            value: 'Haftada 1-2 defa',
                          },
                          {
                            label: 'Yok',
                            value: 'Yok',
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.card} variant="outlined" onChange={this.handleExpand('diger_bilg')} expanded={this.state.expandList['diger_bilg'] || false}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography color="secondary" variant="button">
                    DİĞER BİLGİLER
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="onceki_diyet" label="Daha önce diyetisyene gittiniz mi" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="kilo_almaya_baslangic" label="Ne zaman kilo almaya başladınız?" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="kilo_sebebi" label="Sizce neden kilo almaya başladınız?" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="yemekleri_pisiren" label="Yemekleri kim pişirir?" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="alisveris_yapan" label="Alışverişi kim yapar?" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="anne_yas_kilo" label="Annenizin yaşı ve kilosu" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="baba_yas_kilo" label="Babanızın yaşı ve kilosu" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="es_yas_kilo" label="Eşinizin yaşı ve kilosu" />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormTextField name="kardes_yas_kilo" label="Kardeşinizin yaşı ve kilosu" />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Form>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {

  return {
    apiDanisanProfile: state.apiDanisanProfile,
    initialValues: 
      state.apiDanisanProfile[ownProps.userId] != undefined && 
      state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName] != undefined
        ? state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName].data
        : {},
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanProfile: (userId, danisanUserName) => getDanisanProfile(userId, danisanUserName),
      putDanisanProfile: (userId, danisanUserName, danisanProfile) => putDanisanProfile(userId, danisanUserName, danisanProfile),
      logout: () => logout()
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanProfileForm', enableReinitialize: true })(withStyles(styles)(withSnackbar()(Envanter))));

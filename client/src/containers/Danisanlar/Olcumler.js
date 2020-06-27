
import { Animation, ArgumentScale, EventTracker, ValueScale } from '@devexpress/dx-react-chart';
import { ArgumentAxis, Chart, Legend, LineSeries, ScatterSeries, SplineSeries, Title, Tooltip, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MobileStepper from '@material-ui/core/MobileStepper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { scaleTime } from "d3-scale";
import { symbol, symbolCircle } from 'd3-shape';
import MaterialTable from "material-table";
import moment from "moment";
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwipeableViews from 'react-swipeable-views';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import { DatePickerInput } from '../../components/DateTimePicker';
import { userService } from '../../services/user.service';
import { addDanisanMeasurement, addDanisanMeasurementWithPhoto, deleteDanisanMeasurement, getDanisanMeasurements } from '../../store/reducers/api.danisanMeasurements';
import { getDanisanProfile } from '../../store/reducers/api.danisanProfile';
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
    width: '100%'
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
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

const reduxFormSelect = props => {
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

const createTextField = (key, label, inputProps) => (
  <Field
      key={key}
      name={key}
      id={key}
      component={renderTextField}
      autoFocus={false}
      label={label}
      InputProps={inputProps}
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
      InputLabelProps={{shrink: true}}
    />
  )
  
  class FieldFileInput2  extends Component {
    constructor(props) {
      super(props)
      this.onChange = this.onChange.bind(this)

      this.state = {
        img: undefined
      }
    }
  
    onChange(e) {
      const { input: { onChange } } = this.props
      onChange(e.target.files[0])

      console.log(e.target.files)

      if (e.target.files.length == 0) {
        this.setState({img: undefined, imgUrl: undefined})
      } else {
        var imgUrl = URL.createObjectURL(e.target.files[0])
        this.setState({img: e.target.files[0], imgUrl: imgUrl})
        this.props.onNewImageAdded(e.target.files[0], imgUrl)
      }
    }
  
    render() {
      const { input: { value } } = this.props
      const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
      return(
        <ListItem button 
          onClick={() => this.fileInput.click()}
          target="_blank"
            //component={Link} to={"/c/" + danisan.name}
        >
          {this.state.img == undefined &&
            <ListItemAvatar >
              <Avatar><AddIcon /></Avatar>
            </ListItemAvatar>
          }
          {this.state.img != undefined && 
            <ListItemAvatar >
              <Avatar variant="square" src={this.state.imgUrl} />
            </ListItemAvatar>
          }
          <ListItemText 
            primary={
                // <Typography
                //     variant="subtitle1"
                //     color="textPrimary"
                // >
                this.state.img == undefined ? "Fotoğraf ekle" : "Fotoğrafı değiştir"
                // </Typography>
            } 
          />
          <input
            ref={fileInput => this.fileInput = fileInput}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={this.onChange}
            style={{display: 'none'}}
          />
        </ListItem>
      )
    }
  }

  const Point = (type, styles) => (props) => {
    const {
      arg, val, color,
    } = props;
    return (
      <path
        fill={color}
        transform={`translate(${arg} ${val})`}
        d={symbol().size([6 ** 2]).type(type)()}
        style={styles}
      />
    );
  };
  
  const DiamondPoint = Point(symbolCircle, {
    stroke: 'white',
    strokeWidth: '1px',
  });

  const LineWithDiamondPoint = props => (
    <React.Fragment>
      <LineSeries.Path {...props} />
      <ScatterSeries.Path {...props} pointComponent={DiamondPoint} />
    </React.Fragment>
  );

var MyScale = (p) => {
  // console.log('called', 'ctor', p)
  
  var scale = scaleTime()

  scale._ticks = scale.ticks;
  scale.ticks = (cnt) => {
    // console.log('called', 'ticks', cnt)
    return scale._ticks(4)
  };
  
  scale.tickFormat = function(count, specifier) {
    return (tick) => moment(tick).format('D MMM');
  };

  return scale;
}

const myScale = () => {
  return MyScale()

}


const modifyDomain = domain => {
  console.log('domain', domain)
  return [domain[0] * 0.9, domain[1] * 1.1]
};

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
    this.onNewImageAdded = this.onNewImageAdded.bind(this)

    this.state = {
      userId: props.userId || JSON.parse(localStorage.getItem('user')).id,
      images: [],
      imgBase64s: [],
      activeStep: 0,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDanisanMeasurements != undefined &&
      this.props.apiDanisanMeasurements[this.state.userId] != undefined &&
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].data != undefined;

    var loaded2 = this.props.apiDanisanProfile != undefined &&
      this.props.apiDanisanProfile[this.state.userId] != undefined &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].data != undefined;

    return loaded && loaded2;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanMeasurements(this.state.userId, this.props.danisanUserName);
      this.props.getDanisanProfile(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
    const formData = new FormData();
    Object.keys(formValues).forEach((k) => {
      console.log(k)
      formData.append(k, formValues[k])
    })
    formData['olcum_tarihi'] = moment.utc(formValues['olcum_tarihi']).format()
    console.log(formData);
    console.log(formValues)

    this.props.addDanisanMeasurementWithPhoto(this.state.userId, this.props.danisanUserName, formData);
    this.onDialogClose();
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined, uniqueFileKey: undefined})
  }

  onNewImageAdded(imgBase64, imageUrl) {
    this.state.images.push(imageUrl)
    this.state.imgBase64s.push(imgBase64)
    this.setState({ images: this.state.images, imgBase64s: this.state.imgBase64s })
  }

  render() {
    const { classes } = this.props;

    const showLoader = !this.isLoaded();
    const allMeasurements = showLoader ? undefined : this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].data;
    const danisanProfile = showLoader ? undefined : this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].data;

    var measurementChartData = []

    if (!showLoader) {
      Object.keys(allMeasurements).forEach((day, idx) => {
        const measurementsPerDay = allMeasurements[day];
        Object.keys(measurementsPerDay).forEach((mTs, midx) => {
          const measurement = measurementsPerDay[mTs];
          measurementChartData.push({
            ...measurement, 
            kalcaInt: parseInt(measurement.kalca), 
            belInt: parseInt(measurement.bel), 
            kiloInt: parseInt(measurement.kilo), 
            argument: moment(measurement.olcum_tarihi).toDate(),
            momentDate: moment(measurement.olcum_tarihi).format('D MMMM YYYY'),
            date: day,
            time: mTs,
            targetWeight: parseInt(danisanProfile.hedef_kilo)
          })
        })
      })
    }

    measurementChartData.sort((a, b) => b.olcum_tarihi.localeCompare(a.olcum_tarihi))
    // console.log(measurementChartData)

    return (
      <div className={classes.root} style={{paddingBottom: '84px'}}> 
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
          name={this.props.form}
        >  
          <SpeedDial
            icon={<PostAddIcon />}
            iconText={"YENİ ÖLÇÜM EKLE"}
            eventText={"DiyetisyenYeniOlcumEkle"}
            // hidden={this.props.pristine}
            onClickFab={() => this.setState({openDialog: true, uniqueFileKey: 'olcum_' + Date.now()})}
            // actions={[
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
            // ]}
          />

          <Dialog 
            fullWidth
            open={this.state.openDialog != undefined} 
            onClose={() => this.onDialogClose(undefined)}
          >
            <DialogTitle id="form-dialog-title">Yeni Ölçüm Ekle</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field name='olcum_tarihi' label="Ölçüm tarihi" component={DatePickerInput} />
                  {/* <ReduxFormTextField name="yas" label="Yaşı" type="number"/> */}
                </Grid>

                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="kilo"
                    component={renderTextField}
                    label="Kilo"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="boy"
                    component={renderTextField}
                    label="Boy"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="bacak"
                    component={renderTextField}
                    label="Bacak ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid> */}
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="bel"
                    component={renderTextField}
                    label="Bel ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="karin_gobek"
                    component={renderTextField}
                    label="Karın(göbek) ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="gogus"
                    component={renderTextField}
                    label="Göğüs ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="gobek"
                    component={renderTextField}
                    label="Göbek ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid> */}
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="kalca"
                    component={renderTextField}
                    label="Kalça ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                {/* {this.state.images.map((imgUrl, idx) => (
                  <Grid key={idx} item xs={6} sm={4} md={3} lg={2}>
                      <Image src={imgUrl} />
                  </Grid>
                ))} */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                    name="file"
                    component={FieldFileInput2}
                    onChange={(f) => console.log(f)}
                    onNewImageAdded={this.onNewImageAdded}
                    style={{marginBottom: '16px'}}
                  />
                  <Typography style={{paddingTop: '16px'}} variant="caption">* Yüklediğiniz fotoğraflara yalnızca diyetisyeniniz ulaşabilir.</Typography> <br />
                  <Typography variant="caption">* Diyetisyeniniz ile yaptığımız sözleşme gereğince, diyetisyeniniz fotoğraflarınızı sizden habersiz hiçbir yerde hiçbir amaçla kullanamaz.</Typography> <br />
                  <Typography variant="caption">* Yüklediğiniz fotoğrafları istediğiniz zaman kaldırabilirsiniz. Kaldırdığınız fotoğraflar sistemimizden tamamen silinirler ve bir daha hiçbir şekilde ulaşılamazlar.</Typography>
                  {/* <OlcumlerTartiPdf uniqueFileKey={this.state.uniqueFileKey} danisanUserName={this.props.danisanUserName} /> */}
                </Grid>
              </Grid> 

            </DialogContent>
            <DialogActions>
              <Button disabled={this.props.submitting} onClick={() => this.onDialogClose(undefined)} color="secondary">
                İPTAL
              </Button>
              <Button disabled={this.props.submitting} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                KAYDET
              </Button>
            </DialogActions>
          </Dialog>

          { showLoader && renderLoadingButton(classes) }
          { !showLoader &&  
            <span>
              {allMeasurements.length == 0 && <Typography variant="body2" style={{paddingTop: 'calc(50vh - 100px)', textAlign: 'center'}}>Bu danışana ait ölçüm bilgisi bulunmamaktadır.</Typography>}

              {allMeasurements.length != 0 && (
                <React.Fragment>
                  <SwipeableViews
                      enableMouseEvents={true}
                      axis={'x'}
                      onChangeIndex={(s) => this.setState({activeStep: s})}
                      index={this.state.activeStep}
                      // disabled={true}
                  >
                    <Chart
                      data={measurementChartData.filter(m => isNaN(m.kiloInt) == false)}
                    >
                      <ArgumentScale factory={myScale}/>
                      <ArgumentAxis />
                      <ValueScale modifyDomain={modifyDomain} />
                      <ValueAxis />
                      <SplineSeries
                        name="Kilo (kg)"
                        valueField="kiloInt"
                        argumentField="argument"
                        seriesComponent={LineWithDiamondPoint}
                      />
                      <LineSeries
                        name="Hedef kilo"
                        valueField="targetWeight"
                        argumentField="argument"
                      />
                      <Animation />
                      {/* <Title text="Kilo (kg)" /> */}
                      <EventTracker />
                      <Tooltip />
                      <Legend position='bottom' />
                    </Chart>
                    <Chart
                      data={measurementChartData.filter(m => isNaN(m.belInt) == false)}
                    >
                      <ArgumentScale factory={myScale}/>
                      <ArgumentAxis />
                      <ValueAxis />
                      <SplineSeries
                        valueField="belInt"
                        argumentField="argument"
                        seriesComponent={LineWithDiamondPoint}
                      />
                      <Animation />
                      <Title text="Bel (cm)" />
                      <EventTracker />
                      <Tooltip />
                    </Chart>
                    <Chart
                      data={measurementChartData.filter(m => isNaN(m.kalcaInt) == false)}
                    >
                      <ArgumentScale factory={myScale}/>
                      <ArgumentAxis />
                      <ValueAxis />
                      <SplineSeries
                        valueField="kalcaInt"
                        argumentField="argument"
                        seriesComponent={LineWithDiamondPoint}
                      />
                      <Animation />
                      <Title text="Kalça (cm)" />
                      <EventTracker />
                      <Tooltip />
                    </Chart>
                  </SwipeableViews>
                  <MobileStepper
                    style={{backgroundColor: 'white', marginBottom: '24px'}}
                    steps={3}
                    position="static"
                    variant="dots"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <span></span>
                        //<Button onClick={handleNext} disabled={activeStep === maxSteps - 1} size="small"><KeyboardArrowRight /></Button>
                    }
                    backButton={
                        <span></span>
                        //<Button onClick={handleBack} disabled={activeStep === 0} size="small"><KeyboardArrowLeft /></Button>
                    }
                  />
                </React.Fragment>
              )}

              
              {allMeasurements.length != 0 && (
                <MaterialTable
                  columns={[
                    // {
                    //   title: 'Avatar',
                    //   field: 'url',
                    //   render: rowData => <Avatar
                    //     className={classes.avatar}
                    //     src={userService.getStaticFileUri(rowData.url)}
                    //   />
                    // },
                    { title: "Ölçüm tarihi", field: "momentDate", type: 'datetime' },
                    { title: "Kilo (kg)", field: "kilo", render: rowData => isNaN(rowData.kilo) ? '' : rowData.kilo },
                    { title: "Boy (cm)", field: "boy", render: rowData => isNaN(rowData.boy) ? '' : rowData.boy },
                    { title: "Bel (cm)", field: "bel", render: rowData => isNaN(rowData.bel) ? '' : rowData.bel },
                    { title: "Karın(göbek) (cm)", field: "karin_gobek", render: rowData => isNaN(rowData.karin_gobek) ? '' : rowData.karin_gobek },
                    { title: "Kalça (cm)", field: "kalca", render: rowData => isNaN(rowData.kalca) ? '' : rowData.kalca },
                    { title: "Göğüs (cm)", field: "gogus", render: rowData => isNaN(rowData.gogus) ? '' : rowData.gogus },
                    // { title: "PremiumUntil", field: "premium_until", type: 'datetime' },
                    // { title: "AddressType", field: "addressType" },
                    // { title: "Danisan", field: "danisanCount", type: 'numeric' },
                    // { title: "Randevu", field: "randevuCount", type: 'numeric' },
                    // { title: "Blog", field: "blogCount", type: 'numeric' },
                    // { title: "PageView", field: "pageViewCount", type: 'numeric' },
                  ]}
                  data={measurementChartData}
                  title=""
                  detailPanel={measurement => {
                    return (
                      // <div style={{display:'flex', flexDirection: 'column', width: '100%', padding: '16px'}}>
                      <Grid container spacing={0} style={{padding: '8px'}}>
                        {/* <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography className={classes.pos} color="textSecondary">Bacak</Typography>
                          <Typography className={classes.pos} color="textPrimary">{measurement.bacak || ''} {measurement.bacak ? 'cm' : ''}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography className={classes.pos} color="textSecondary">Kol</Typography>
                          <Typography className={classes.pos} color="textPrimary">{measurement.kol || ''} {measurement.kol ? 'cm' : ''}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography className={classes.pos} color="textSecondary">Göğüs</Typography>
                          <Typography className={classes.pos} color="textPrimary">{measurement.gogus || ''} {measurement.gogus ? 'cm' : ''}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                          <Typography className={classes.pos} color="textSecondary">Göbek</Typography>
                          <Typography className={classes.pos} color="textPrimary">{measurement.gobek || ''} {measurement.gobek ? 'cm' : ''}</Typography>
                        </Grid> */}
                        {measurement.images && measurement.images.map((img, idx) => {
                          if (img == null || img == undefined) 
                            return;

                          console.log(img)
                          return (
                            <Grid key={idx} item xs={4} sm={4} md={3} lg={2}>
                                <img style={{width: '100%'}} src={userService.getStaticFileUri(img.path || '')} />
                            </Grid>
                        )})}
                      </Grid>
                    )
                  }}
                  actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Ölçümü Sil',
                      onClick: (event, rowData) => {
                        console.log(event, rowData)
                        this.props.deleteDanisanMeasurement(this.state.userId, this.props.danisanUserName, rowData.date, rowData.time);
                      }
                    }
                  ]}
                  options={{
                    sorting: false,
                    toolbar: false,
                    search: false,
                    paging: false,
                    emptyRowsWhenPaging: false,
                    actionsColumnIndex: -1,
                  }}
                  localization={{
                    header: {
                      actions: "Ölçüm Sil"
                    }
                  }}
                />
              )}

              {/* {Object.keys(allMeasurements).map((day, idx) => {
                const measurementsPerDay = allMeasurements[day];

                return (
                  <List
                    key={idx} 
                    disablePadding
                    subheader={
                      <ListSubheader component="span" id="nested-list-subheader">
                        <Typography component="span" variant="subtitle2" color="secondary">{moment(day).format('D MMMM YYYY')}</Typography>
                      </ListSubheader>
                  }>
                    {Object.keys(measurementsPerDay).map((mTs, midx) => {
                      const measurement = measurementsPerDay[mTs];
                      console.log(measurement)

                      return (
                        <ListItem 
                          key={midx}
                          button 
                          style={{padding: 0}}
                          // component="a" 
                          // href={userService.getStaticFileUri(file.path)}
                          // target="_blank"
                            //component={Link} to={"/c/" + danisan.name}
                        >
                          <Card variant="outlined" className={classes.card}>
                            <CardContent>
                              <Grid container spacing={1}>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Kilo</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.kilo || ''} {measurement.kilo ? 'kg' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Boy</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.boy || ''} {measurement.boy ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Bacak</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.bacak || ''} {measurement.bacak ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Kol</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.kol || ''} {measurement.kol ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Göğüs</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.gogus || ''} {measurement.gogus ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Göbek</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.gobek || ''} {measurement.gobek ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Bel</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.bel || ''} {measurement.bel ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                  <Typography className={classes.pos} color="textSecondary">Kalça</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.kalca || ''} {measurement.kalca ? 'cm' : ''}</Typography>
                                </Grid>
                                {measurement.images && measurement.images.map((img) => {
                                  if (img == null || img == undefined) 
                                    return;

                                  return (
                                    <Grid key={idx} item xs={6} sm={4} md={3} lg={2}>
                                        <Image src={userService.getStaticFileUri(img.path || '')} />
                                    </Grid>
                                )})}
                              </Grid>
                            </CardContent>
                          </Card>
                        </ListItem>
                      )
                    })}
                  </List>
                )
              })} */}
            </span>
          }
        </Form>  
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiForm: state.form,
    apiDanisanMeasurements: state.apiDanisanMeasurements,
    apiDanisanProfile: state.apiDanisanProfile,
    initialValues: { 
      olcum_tarihi: moment(moment().format('DD.MM.YYYY'), 'DD.MM.YYYY').toDate(),
    },
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanProfile: (userId, danisanUserName) => getDanisanProfile(userId, danisanUserName),
      addDanisanMeasurementWithPhoto: (userId, danisanUserName, measurement) => addDanisanMeasurementWithPhoto(userId, danisanUserName, measurement),
      addDanisanMeasurement: (userId, danisanUserName, measurement) => addDanisanMeasurement(userId, danisanUserName, measurement),
      getDanisanMeasurements: (userId, danisanUserName) => getDanisanMeasurements(userId, danisanUserName),
      deleteDanisanMeasurement: (userId, danisanUserName, date, time) => deleteDanisanMeasurement(userId, danisanUserName, date, time),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanOlcumForm', enableReinitialize: true })(withStyles(styles)(Envanter)));

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { getMaterial, setMaterialPart } from '../../store/reducers/api.materials';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Divider, CardActionArea } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MaterialFieldEdit from './MaterialFieldEdit'
import { submit } from 'redux-form'

import CamareWrapper from '../CameraWrapper'

import FileBase64 from 'react-file-base64';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
  card: {
    //maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  buttonProgress: {
    top: '50%',
    left: '50%',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      margin: '8px'
  },
  rootViewDetails: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      margin: '0px'
  },
  photothumbnail: {
    display: "flex",
    boxSizing: "border-box",
    padding: "2px",
    cursor: "pointer",
    '&:hover': {
      opacity: 0.5,
    },
    maxHeight: theme.spacing(16)
  },
  photothumbnailSm: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: theme.spacing(0.2),
    justifyContent: "center",
    cursor: "pointer",
    '&:hover': {
      opacity: 0.5,
    },
    maxHeight: theme.spacing(8),
    width: "auto",
    maxWidth: "100%"
  },
  photothumbnailSmNoClick: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: theme.spacing(0.2),
    justifyContent: "center",
    maxHeight: theme.spacing(8),
    width: "auto",
    maxWidth: "100%"
  },
  photoGrid: {
    paddingBottom: "0.2em"
  },
  divider: {
    marginBottom: "0.55em",
    marginTop: "0.55em",
  },
  subheaderTitle: {
    color: "rgba(38, 55, 70, 1)"
  },
  editGridButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "0.5em"
  },
  editGridText: {
    display: "flex",
    alignItems: "center",
  }
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

function SimpleDialog(props, classes) {
  const { onClose, onDelete, ...other } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" {...other}>
      <img width="100%" src={props.url}/>
      <DialogActions>
          <Button onClick={() => onDelete(props.url)} color="primary">
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function TakePhotoDialog(props, classes) {
  const { onClose, ...other } = props;

  function handleClose() {
    onClose();
  }

  return (
    <Dialog fullScreen open={true} 
      //classes={{container: { height: "none" }}}
      onClose={handleClose} aria-labelledby="simple-dialog-title">
      <CamareWrapper 
        handleTakePhoto={(uri) => 
        { 
            props.handleTakePhoto(uri);
        }}
      />
    </Dialog>
  );
}

const FieldDetail = props => {
  const classes = props.classes;
  const title = props.title;
  const component = props.component;
  const fieldData = props.fieldData;
  const headerOnly = props.headerOnly;
  const parent = props.parent;

  const editing = parent && parent.state.editingField == title;

  return (
    <span>
      <Grid container>
        <Grid item xs={9} sm={9} md={9} xl={9} className={classes.editGridText}>
          <Typography variant="subtitle1" className={classes.subheaderTitle}>{title}</Typography>
        </Grid>

        { !headerOnly && !editing &&
          <Grid item xs={3} sm={3} md={3} xl={3} className={classes.editGridButton} onClick={() => parent.setState({editingField: title})}>
            <IconButton aria-label="Add to favorites">
              <EditIcon />
            </IconButton>
          </Grid>
        }
        { !headerOnly && editing &&
          <Grid item xs={3} sm={3} md={3} xl={3} className={classes.editGridButton} onClick={() => parent.props.remoteSubmitForm(title)}>
            <IconButton aria-label="Add to favorites">
              <SaveIcon />
            </IconButton>
          </Grid>
        }
      </Grid>

      { !headerOnly && !editing && component}
      { !headerOnly && editing && 
        <MaterialFieldEdit 
          form={title} 
          fieldData={fieldData}
          open={true}
          handleClose={ (values) => {
            parent.props.setMaterialPart(parent.props.userId, parent.props.materialHeaderData.id, title, values);
            parent.setState({editingField: null});
          }}
        />
      }
    </span>
  )
};

const renderTextField = (fieldData) => {
  return fieldData.split('\n').map((item, i) => {
    return (
      <Typography key={i} variant="body2" color="textPrimary" align="justify">
        {item == '' ? '\u00A0' : item}
      </Typography>
    )
  })
}

class MaterialCard extends React.Component  {

    constructor(props) {
        super(props)

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleCollapseImg = this.handleCollapseImg.bind(this);
        this.handleExpandImg = this.handleExpandImg.bind(this);
        this.handleTakePicture = this.handleTakePicture.bind(this);
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);

        this.state = {
          addingField: undefined,
          expanded: false,
          files: [],
        }
    }

    componentDidMount() {
        //this.props.getMaterial(this.props.userId, this.props.materialHeaderData.id)
    }

    handleExpandClick() {
      if (this.props.apiMaterials[this.props.materialHeaderData.id] == undefined) {
        this.props.getMaterial(this.props.userId, this.props.materialHeaderData.id)
      }

      this.setState({expanded: !this.state.expanded})
    }

    handleCollapseImg() {
      this.setState({ selectedImageUrl: undefined, selectedImageTitle: undefined });
    }

    handleExpandImg(title, url) {
      this.setState({ selectedImageUrl: url, selectedImageTitle: title });
    }

    handleDeleteImage(title, url) {
      console.log(url);
      const materialId = this.props.materialHeaderData.id;
      const material = this.props.apiMaterials[materialId].items[materialId];
      material.data[title].value.splice(material.data[title].value.indexOf(url), 1)
      this.props.setMaterialPart(this.props.userId, materialId, title, material.data[title]);
      this.setState({ selectedImageUrl: undefined, selectedImageTitle: undefined });
    }

    handleTakePicture(takePictureFor) {
      this.setState({ takingPicture: true, takingPictureFor: takePictureFor });
    }

    handlePhotoUpload(title, files) {
      console.log(files);
      const materialId = this.props.materialHeaderData.id;
      const material = this.props.apiMaterials[materialId].items[materialId];
      material.data[title].value.push(files.base64);
      this.props.setMaterialPart(this.props.userId, materialId, title, material.data[title]);
    }

    render() {
        const classes = this.props.classes;
        const expanded = this.state.expanded;
        const materialHeaderData = this.props.materialHeaderData;
        const materialId = materialHeaderData.id;

        const showLoader = 
          this.props.apiMaterials[materialId] == undefined || 
          this.props.apiMaterials[materialId].items == undefined || 
          this.props.apiMaterials[materialId].isGetLoading;
          
        const material = showLoader ? undefined : this.props.apiMaterials[materialId].items[materialId];

        if (this.state.takingPicture) {
          return (
            <TakePhotoDialog 
              handleTakePhoto={(uri) => 
              { 
                  console.log(uri); 
                  material.data[this.state.takingPictureFor].value.push(uri);
                  this.props.setMaterialPart(this.props.userId, materialId, this.state.takingPictureFor, material.data[this.state.takingPictureFor]);
                  this.setState({ takingPicture: false, takingPictureFor: undefined }); 
              }}
            />
          )
        }

        return (
          <Card className={classes.card}>
            <CardActionArea
              onClick={this.handleExpandClick}>
              <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar} width="100%" src={materialHeaderData.headerImg} />
                  }
                  action={
                    <IconButton
                      disabled={true}
                      className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                      })}
                      //onClick={this.handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                  title={materialHeaderData.header}
                  subheader={
                    <Typography variant="caption" color="textSecondary">
                      {materialHeaderData.state} at {materialHeaderData.purity}{materialHeaderData.purityUnit} purity, left {materialHeaderData.weight}{materialHeaderData.weightUnit}
                    </Typography>
                  }
                    //{<Chip size="small" color="secondary" label="Basic Chip" className={classes.chip} />}
              />
              {/* { !expanded && (
                <CardContent>
                  <div className={classes.rootViewDetails}>
                    Click to view details
                  </div>
                </CardContent>
              )} */}
            </CardActionArea>
            { expanded && (
              <CardContent>
                { showLoader && renderLoadingButton(classes) }

                { !showLoader && (
                  <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <FieldDetail 
                      classes={classes} 
                      title="Procedure" 
                      fieldData={material.data['Procedure'].value}
                      parent = {this}
                      component={renderTextField(material.data['Procedure'].value)}
                    />
                    <br />

                    { 
                      <Grid container className={classes.photoGrid}>
                        {
                          material.data['ProcedurePhotos'].value.map((url, idx) => {
                            return (
                              <Grid key={idx} item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnailSm} onClick={() => this.handleExpandImg('ProcedurePhotos', url)}>
                                <img height="100%" style={{maxHeight: "100%", maxWidth: "100%"}} src={url} />
                              </Grid>
                            )
                          })
                        }
                        <Grid item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnailSmNoClick} >
                        {/* <ButtonGroup  aria-label="small outlined button group"> */}
                          <IconButton size="small" style={{alignItems: "center"}} onClick={() => this.handleTakePicture('ProcedurePhotos')} aria-label="Add to favorites">
                            <AddAPhotoIcon />
                          </IconButton>
                          <IconButton size="small" style={{alignItems: "center"}} aria-label="Add to favorites" component="label">
                            <CloudUploadIcon />
                            <span style={{ display: "none" }}>
                              <FileBase64
                                multiple={ false }
                                onDone={ (files) => this.handlePhotoUpload('ProcedurePhotos', files) } 
                              />
                            </span>
                          </IconButton>
                        {/* </ButtonGroup> */}
                        </Grid>
                      </Grid>
                    }
                    <br />
                    <Divider className={classes.divider}/>

                    <FieldDetail 
                      classes={classes} 
                      title="Purification" 
                      fieldData={material.data['Purification'].value}
                      parent = {this}
                      component={renderTextField(material.data['Purification'].value)}
                    />
                    <br />
                    <Divider className={classes.divider} />

                    <FieldDetail 
                      classes={classes} 
                      title="NMRs"
                      headerOnly={true}
                    />
                    <Grid container className={classes.photoGrid}>
                      {
                        material.data['NMR'].value.map((url, idx) => {
                          return (
                            <Grid key={idx} item xs={6} sm={6} md={6} xl={6} className={classes.photothumbnail} onClick={() => this.handleExpandImg('NMR', url)}>
                              <img height="100%" src={url} />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    <Divider className={classes.divider}/>

                    <FieldDetail 
                      classes={classes} 
                      title="MSDSes"
                      headerOnly={true}
                    />
                    <Grid container className={classes.photoGrid}>
                      {
                        material.data['MSDS'].value.map((url, idx) => {
                          return (
                            <Grid key={idx} item xs={6} sm={6} md={6} xl={6} className={classes.photothumbnail} onClick={() => this.handleExpandImg('MSDS', url)}>
                              <img height="100%" src={url} />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    <Divider className={classes.divider}/>

                    <FieldDetail 
                      classes={classes} 
                      parent = {this}
                      title="Hints" 
                      fieldData={material.data['Hints'].value}
                      component={renderTextField(material.data['Hints'].value)}
                      //   material.data['Hints'].value.split('\n').map((item, i) => {
                      //     return (
                      //       <Typography key={i} variant="body2" color="textPrimary" align="justify">
                      //         {item == '' ? '\u00A0' : item}
                      //       </Typography>
                      //     )
                      //   })
                      // }
                    />

                    { this.state.selectedImageUrl &&   
                      <SimpleDialog 
                        url={this.state.selectedImageUrl}
                        open={this.state.selectedImageUrl != undefined}
                        maxWidth="lg"
                        onClose={this.handleCollapseImg}
                        onDelete={(url) => this.handleDeleteImage(this.state.selectedImageTitle, url)} />
                    }

                  </Collapse>
                )}
              </CardContent>
            )}
            { expanded && (
              <CardActions>
                <Chip
                  size="small"
                  avatar={<Avatar alt="Natacha" src="http://oceaneos.org/wp-content/uploads/2016/11/Neil-1.png" />}
                  label="Neil Branda"
                />
                <Chip
                  size="small"
                  avatar={<Avatar alt="Natacha" src="https://media.licdn.com/dms/image/C5603AQH1moo_3ahUCQ/profile-displayphoto-shrink_800_800/0?e=1570060800&v=beta&t=2SnmtGhBvH_A78gOYGs9vudRFmOaLVciEGsmMU3gwZ4" />}
                  label="Cagla Istanbulluoglu"
                />

                <span style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                  <IconButton aria-label="Add to favorites">
                    <ShareIcon />
                  </IconButton>
                </span>

              </CardActions>
            )}
          </Card>
        );
    }   
}

const mapStateToProps = state => {
    return {
      apiMaterials: state.apiMaterials,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        setMaterialPart: (userId, groupId, partId, groupVal) => setMaterialPart(userId, groupId, partId, groupVal),
        getMaterial: (userId, materialId) => getMaterial(userId, materialId),
        remoteSubmitForm: (formId) => dispatch(submit(formId)),
      },
      dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MaterialCard));

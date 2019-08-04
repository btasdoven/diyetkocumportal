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
import { getMaterialHeaders } from '../../store/reducers/api.materialHeaders';
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
import { submit } from 'redux-form'

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

class DataExpensionPanel extends React.Component  {

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
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const projectId = this.props.match.params.projectId;
        if (this.props.apiMaterialHeaders.items == undefined ||
            this.props.apiMaterialHeaders.items[projectId] == undefined)
        {
            this.props.getMaterialHeaders(userId);
        }

        if (this.props.apiMaterials[projectId] == undefined)
        {
            this.props.getMaterial(userId, projectId);
        }
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
        const materialId = this.props.match.params.projectId;
        const classes = this.props.classes;

        const showLoader = 
          this.props.apiMaterials[materialId] == undefined || 
          this.props.apiMaterials[materialId].items == undefined || 
          this.props.apiMaterials[materialId].isGetLoading ||
          this.props.apiMaterialHeaders.items == undefined || 
          this.props.apiMaterialHeaders.items[materialId] == undefined;
        
        const materialHeaderData = 
            this.props.apiMaterialHeaders.items == undefined || 
            this.props.apiMaterialHeaders.items[materialId] == undefined 
            ? undefined 
            : this.props.apiMaterialHeaders.items[materialId];

        const material = showLoader ? undefined : this.props.apiMaterials[materialId].items[materialId];

        this.props.setTitle(materialHeaderData && materialHeaderData.id);
        this.props.setBackButton(true);

        return (
            <div>
                { showLoader && renderLoadingButton(classes) }
                { !showLoader && 
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar} width="100%" src={materialHeaderData.headerImg} />
                                }
                                title={materialHeaderData.header + "sadasd"}
                                subheader={
                                    <Typography variant="caption" color="textSecondary">
                                    {materialHeaderData.state} at {materialHeaderData.purity}{materialHeaderData.purityUnit} purity, left {materialHeaderData.weight}{materialHeaderData.weightUnit}
                                    </Typography>
                                }
                                    //{<Chip size="small" color="secondary" label="Basic Chip" className={classes.chip} />}
                            />
                        </CardActionArea>
                    </Card>
                }
            </div>
        );
    }   
}

const mapStateToProps = state => {
    return {
        apiMaterialHeaders: state.apiMaterialHeaders,
        apiMaterials: state.apiMaterials,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        setMaterialPart: (userId, groupId, partId, groupVal) => setMaterialPart(userId, groupId, partId, groupVal),
        getMaterial: (userId, materialId) => getMaterial(userId, materialId),
        getMaterialHeaders: (userId) => getMaterialHeaders(userId),
        remoteSubmitForm: (formId) => dispatch(submit(formId)),
      },
      dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(DataExpensionPanel));

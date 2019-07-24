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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { getMaterial, itemsPutData } from '../store/reducers/api.materials';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Divider, CardActionArea } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

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
    border: "solid 1px rgba(38, 55, 70, 0.6)",
    boxSizing: "border-box",
    marginRight: "-1px",
    marginTop: "-1px",
    cursor: "pointer",
    '&:hover': {
      opacity: 0.5,
    }
  },
  divider: {
    marginBottom: "0.35em",
    marginTop: "0.35em",
  },
  subheaderTitle: {
    color: "rgba(38, 55, 70, 1)"
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
  const { onClose, ...other } = props;
  const emails = ['username@gmail.com'];

  function handleClose() {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <img width="100%" src={props.url}/>
    </Dialog>
  );
}

class DataExpensionPanel extends React.Component  {

    constructor(props) {
        super(props)

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleCollapseImg = this.handleCollapseImg.bind(this);
        this.handleExpandImg = this.handleExpandImg.bind(this);

        this.state = {
          addingNewField: false,
          editingFieldId: null,
          expanded: false,
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
      this.setState({ selectedImageUrl: undefined });
    }

    handleExpandImg(url) {
      this.setState({ selectedImageUrl: url });
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
        const bull = <span className={classes.bullet}>•</span>;

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
                    <Typography color="textSecondary">
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

                {/* { !showLoader && (
                  <Grid container spacing={8}>
                    {
                      Object.keys(material.data).map(fieldId => {
                        const field = material.data[fieldId];
                        if (field.type == "text") {
                          return (
                            <Grid item xs={6} sm={6} md={4} xl={3}>
                              <Typography inline color="textSecondary">{field.name}</Typography>{bull}
                              <Typography inline>{field.value}</Typography>
                            </Grid>
                          )
                        }
                      })
                    }
                  </Grid>
                )} */}
                { !showLoader && (
                  <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <Typography variant="subheading" className={classes.subheaderTitle} gutterBottom>Procedure</Typography>
                    
                    <Typography variant="body1" color="textPrimary">
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>

                    <Divider className={classes.divider} />

                    <Typography variant="subheading" className={classes.subheaderTitle} gutterBottom>Hints</Typography>
                    
                    <Typography variant="body1" color="textPrimary">
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>

                    <Divider className={classes.divider} />

                    <Typography variant="subheading" className={classes.subheaderTitle} gutterBottom>NMRs</Typography>
                    
                    <Grid container>
                      {
                        material.data['NMR'].value.map((url, idx) => {
                          return (
                            <Grid key={idx} item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnail} onClick={() => this.handleExpandImg(url)}>
                              <img width="100%" src={url} />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    
                    <SimpleDialog 
                      url={this.state.selectedImageUrl}
                      open={this.state.selectedImageUrl != undefined}
                      maxWidth="lg"
                      onClose={this.handleCollapseImg} />

                    <Divider className={classes.divider}/>

                    <Typography variant="subheading" className={classes.subheaderTitle} gutterBottom>MCDSes</Typography>

                    <Grid container>
                      <Grid item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnail}>
                        <img width="100%" src="https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png" />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnail}>
                        <img width="100%" src="https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png" />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} xl={3} className={classes.photothumbnail}>
                        <img width="100%" src="https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png" />
                      </Grid>
                    </Grid>

                    <Divider className={classes.divider}/>

                    <Typography variant="subheading" className={classes.subheaderTitle} gutterBottom>Notes</Typography>
                    
                    <Typography variant="body1" color="textPrimary">
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>

                  </Collapse>
                )}
              </CardContent>
            )}
            { expanded && (
              <CardActions>
                <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                <ShareIcon />
                </IconButton>
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
        itemsPutData: (userId, groupId, groupVal) => itemsPutData(userId, groupId, groupVal),
        getMaterial: (userId, materialId) => getMaterial(userId, materialId),
      },
      dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(DataExpensionPanel));

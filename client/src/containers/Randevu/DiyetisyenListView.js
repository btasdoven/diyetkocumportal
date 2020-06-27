
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { addDanisan, getDanisanPreviews } from '../../store/reducers/api.danisanPreviews';










const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    //backgroundColor: 'red',
  },
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  field: {
    width: '100%',
    float: 'left'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.spacing(4), //theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.025),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    flex: 1
  },
  searchIconStart: {
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  yeniDanisanBtn: {
    margin: theme.spacing(1)
  },
  divider: {
    height: 44,
    margin: 4,
  },
  iconButton: {
    margin: theme.spacing(1),
  },
  searchWrapper: {
    display: 'flex', 
    alignItems: 'center',
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

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleOnSearchChange = this.handleOnSearchChange.bind(this);
    this.handleCloseAddDanisan = this.handleCloseAddDanisan.bind(this);
    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      newDanisan: false,
      searchKey: '',
      userId: 5
    }
  }

  isLoaded() {
    var loaded = this.props.apiDanisanPreviews != undefined &&
      this.props.apiDanisanPreviews[this.state.userId] != undefined &&
      this.props.apiDanisanPreviews[this.state.userId].isGetLoading != true &&
      this.props.apiDanisanPreviews[this.state.userId].data != undefined;

      return loaded;
  }
  
  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanPreviews(this.state.userId);
    }
  }

  handleOnSearchChange(e) {
    this.setState({ searchKey: e.currentTarget.value.toLowerCase()})
  }

  handleCloseAddDanisan(values) {

    if (values != undefined) {
      this.props.addDanisan(this.state.userId, values);
      this.props.history.push('/c/' + values.username)
    }

    this.setState({newDanisan: false});
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var danisans = showLoader ? undefined : this.props.apiDanisanPreviews[this.state.userId].data;

    return (
        <div className={classes.root}>
        <div className={classes.main}>
          <div className={classes.searchWrapper}>
            {/* <IconButton onClick={() => this.setState({newDanisan: true})} color="inherit" className={classes.iconButton} aria-label="directions">
              <PersonAddIcon/>
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" /> */}
            <InputBase
              onChange={this.handleOnSearchChange}
              className={classes.search}
              placeholder="Danışan Ara..."
              value={this.state.searchKey}
              startAdornment={
                <InputAdornment className={classes.searchIconStart} position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={this.state.searchKey != '' &&
                (<InputAdornment position="end">
                  <ClearIcon onClick={() => this.setState({ searchKey: '' })} />
                </InputAdornment>)
              }
            />
            {/* <Button startIcon={<AddIcon />} className={classes.yeniDanisanBtn} component="span" size="small" variant="outlined" color="primary">
              DANIŞAN EKLE
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Danışan Ara..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}
          </div>
          <Divider />

          { showLoader && renderLoadingButton(classes) }
          {/* { !showLoader && (danisans == undefined || Object.keys(danisans).length == 0) && (
            <IntroInstaVideo 
              noItemText={"Şu an için hiç kayıtlı danışanınız yok 😞"}
              infoHighlightSrc={"/static/danisan/thumbnail.png"}
              sources={[
                '/static/randevu_1.mp4',
                '/static/randevu_2.mp4',
                '/static/randevu_3.mp4',
                '/static/randevu_4.mp4',
                '/static/randevu_5.mp4',
              ]}
              topMargin={'140px'}
            />
          )} */}
          { !showLoader && 
            <List disablePadding>
              {Object.keys(danisans).map( (danisanKey, idx) => {

                var danisan = danisans[danisanKey];

                if (this.state.searchKey != '' &&
                    danisan.name.toLowerCase().indexOf(this.state.searchKey) == -1)
                {
                  return;
                }
                // <Card key={idx} className={classes.card}>
                  //   <CardActionArea>
                  //     <CardHeader
                  //       avatar={
                  //           <Avatar className={classes.avatar} src={danisan.url} />
                  //       }
                  //       action={
                  //         <div>
                  //           <IconButton aria-label="settings" onClick={this.handleClick}>
                  //             <MoreVertIcon />
                  //           </IconButton>
                  //           <Menu
                  //             id="simple-menu"
                  //             anchorEl={this.state.anchorEl}
                  //             keepMounted
                  //             open={this.state.anchorEl != undefined}
                  //             onClose={this.handleClose}
                  //           >
                  //             <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                  //           </Menu>
                  //         </div>
                  //       }
                  //       title={<Typography color="primary" variant="h6">{danisan.name}</Typography>}
                  //       subheader={<Typography color="initial" variant="body2">86kg, 167cm, Son görüşme 6 gün önce</Typography>}
                  //     />
                  //   </CardActionArea>
                  // </Card>  

                return (
                  <span key={idx}>
                    <ListItem button component={ExtendedLink} to={"/c/" + danisan.name}>
                      <ListItemAvatar>
                      <Avatar src={danisan.url} />
                      </ListItemAvatar>
                      <ListItemText primary={danisan.name} />
                      {/* <Typography color="initial" variant="caption">{danisan.aktivite}</Typography> */}
                    </ListItem>
                    <Divider component="li" />
                  </span>
                )
              })}  
            </List>
          }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDanisanPreviews: state.apiDanisanPreviews,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanPreviews: (userId) => getDanisanPreviews(userId),
      addDanisan: (userId, newDanisanPreview) => addDanisan(userId, newDanisanPreview),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Envanter)));

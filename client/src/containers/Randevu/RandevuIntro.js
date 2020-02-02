import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  appBar: {
    backgroundColor: 'rgb(255,255,255)',
    color: 'rgb(38,55,70)'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    backgroundColor: '#3897f0'
  },
  loginButton2: {
    borderColor: '#3897f0',
    color: '#3897f0',
    marginRight: theme.spacing(1),
  },
  heroUnit: {
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgb(38,55,70)'
  },
  heroContent: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  layoutToolbar: {
    width: 'auto',
    color: '#262626',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layout: {
    width: 'auto',
    color: '#262626',
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    padding: 0,
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(3)}px 0 0 0`,
  },
  card: {
    paddingLeft: '8px',
    height: '100%',
    display: 'flex',
  },
  featureCardMedia: {
    width: '100px'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    padding: theme.spacing(6),
  },

  avatarWrapper: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'linear-gradient(to left,#7b4397,#dc2430)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar: {
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
    padding: '2px',
    top: '3px',
    left: '3px',
    background: '#fafafa',
    cursor: 'pointer'
  },
  avatarWrapper2: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'rgba(0,0,0,0.1)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar2: {
    width: 'calc(100% - 4px)',
    height: 'calc(100% - 4px)',
    padding: '2px',
    top: '2px',
    left: '2px',
    background: '#fafafa',
    cursor: 'pointer'
  },
  info: {
    marginTop: theme.spacing(2)
  },
  root: {
    height: "calc(100vh - 72px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    //backgroundColor: 'red',
  },
});

const storySourcesOld = [
    '/static/story1.mp4',
    '/static/story2.mp4',
    '/static/story3.mp4',
    '/static/story4.mp4',
    '/static/story5.mp4',
  ];

  const storySources = [
    '/static/highlights/highlight1.jpg',
    '/static/highlights/highlight2.jpg',
    '/static/highlights/highlight3.jpg',
    '/static/highlights/highlight4.jpg',
  ];

class RandevuIntro extends React.Component
{
    constructor(props)
    {
        super(props)

        this.videoRef = React.createRef();
        this.setActiveImg = this.setActiveImg.bind(this);

        this.state = {
          activeStory: 0,
          duration: 10,
          openDialog: false,
          width: 0,
          t: undefined,
          source: storySources,
        }
    }

    setActiveImg() {
        console.log('basliyor', this.state)
        if (this.state.t != undefined) {
            console.log('clearing timeout')
            clearTimeout(this.state.t);
        }

        var t = setTimeout((idx) => {
            console.log(idx, this.state.activeStory, 'timeout', this.state)

            if (this.state.activeStory == idx) {
                if (this.state.activeStory + 1 == this.state.source.length) {
                  this.setState({width: 0, duration: 0, t: undefined, openDialog: false})
                } else {
                  this.setState({width: 0, duration: 0, t: undefined, activeStory: this.state.activeStory + 1})
                }
            }
        }, 10000, this.state.activeStory)

        this.setState({t: t, width: '100%', duration: 10})
    }

    render()
    {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <div className={classes.main}>
                {/* <video 
                    muted
                    playsInline
                    //controls={true}
                    type='video/mp4'
                    //poster="/static/favicon.png"
                    onLoadedData={() => console.log('loaded data for next of ', this.state.activeStory)}
                    onPlay={() => console.log('playing')}
                    onEnded={() => console.log('ended')}
                    src={
                        this.state.source[this.state.openDialog == false 
                        ? this.state.activeStory 
                        : this.state.activeStory + 1 == this.state.source.length 
                            ? 0 
                            : this.state.activeStory + 1]}
                    preload="auto" 
                    style={{zIndex: -1, position: 'absolute', top: 0, width: 0, height: 0}}>                 
                </video> */}
                <Dialog
                    PaperProps={{style: {
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 0,
                    padding: 0,
                    backgroundColor: '#262626',
                    borderRadius: 0,
                    }}}
                    fullWidth={true}
                    open={this.state.openDialog}
                >
                    <div style={{zIndex: 9999, position: 'absolute', width: '100%', display: 'flex', padding: '12px 6px'}}>
                    {this.state.source.map((src, idx) => {
                        if (idx == 0)
                            console.log('render', this.state);

                        return (
                        <div key={idx} style={{flexGrow: 1, height: '2px', marginRight: '2px', background: 'rgba(255, 255, 255, 0.35)'}}>
                            {idx == this.state.activeStory &&
                            (<div style={{transition: `width ${this.state.duration}s linear`, width: this.state.width, height: '100%', backgroundColor: 'white'}}></div>)
                            }
                            {/* {idx < this.state.activeStory &&
                            (<div style={{transition: `width 0s linear`, width: '100%', height: '100%', backgroundColor: 'white'}}></div>)
                            } */}
                        </div>
                        )
                    })}
                    </div>
                    <DialogContent style={{height: '100%', borderRadius: 0, color: 'white', padding:0, margin: 0}}>
                    <Grid style={{height: '100%'}} container spacing={0}>
                        <Grid 
                        style={{display: 'flex', zIndex: 9998}} item xs={3}
                        onClick={() => {
                            this.state.activeStory > 0 && this.setState({width: 0, duration: 0, activeStory: this.state.activeStory - 1})
                        }}
                        >
                        {this.state.activeStory > 0 &&
                            <IconButton 
                            disableRipple
                            style={{color: 'rgba(255, 255, 255, 1)'}}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        }
                        </Grid>
                        <Grid 
                        item xs={9}
                        style={{display: 'flex', height: '100%', justifyContent: 'flex-end', zIndex: 9998}} 
                        onClick={() => {
                            console.log(this.state.activeStory, 'right')
                            if (this.state.activeStory + 1 == this.state.source.length) {
                              this.setState({duration: 0, openDialog: false})
                            } else {
                              this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                            }
                        }}
                        >
                        <IconButton 
                            disableRipple
                            style={{color: 'rgba(255, 255, 255, 1)'}}>
                            <ChevronRightIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                    
                    <IconButton 
                        style={{position: 'absolute', zIndex: 9999, top: '14px', right: '8px', color: 'rgba(255, 255, 255, 1)'}} 
                        onClick={() => this.setState({duration: 0, openDialog: false})}>
                        <CloseIcon />
                    </IconButton>
                    <img 
                        // muted
                        // playsInline
                        // autoPlay
                        // //controls={true}
                        // type='video/mp4'
                        // onLoadedData={() => console.log('loaded data for ', this.state.activeStory)}
                        // ref={this.videoRef}
                        //poster="/static/favicon.png"
                        // onPlay={() => this.state.openDialog && this.setState({width: '100%', duration: this.videoRef.current.duration})}
                        // onEnded={() => {
                        // if (this.state.activeStory + 1 == this.state.source.length) {
                        //     this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                        // } else {
                        //     this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                        // }
                        // }}
                        src={this.state.source[this.state.activeStory]}
                        onLoad={() => this.setActiveImg()}
                        // preload="auto" 
                        style={{position: 'absolute', top: 0, width: '100%', height:' 100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}              
                    />
                    </DialogContent>
                </Dialog>
                
                <Grid container spacing={0} >
                    <Grid item xs={12}>
                        <div style={{position: 'relative', margin: 'auto', maxWidth: '150px', width: '25%'}}>
                            <style>
                            {`@keyframes rotate {
                                from{ transform: rotate(0deg); }
                                to{ transform: rotate(360deg); }
                            }`}
                            </style>
                            <div style={{animation: 'rotate 3s linear infinite'}} className={classes.avatarWrapper}>
                            </div>
                            <Avatar onClick={() => this.setState({width: 0, duration: 0, activeStory: 0, openDialog: true})} alt="Remy Sharp" src="/static/highlights/highlight1.jpg" className={classes.avatar} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="div" style={{padding: '16px', textAlign: 'center'}} color="textSecondary" variant="body1">Çok üzgünüz, şu an için hiç randevun yok 😞</Typography>
                    </Grid>
                </Grid>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(RandevuIntro);
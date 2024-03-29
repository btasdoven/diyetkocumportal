import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { registerEvent } from './Signin/PageTracker';

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
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
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

class RandevuIntro extends React.Component
{
    constructor(props)
    {
        super(props)

        this.videoRef = React.createRef();
        this.videoRefBfr = React.createRef();

        this.state = {
          activeStory: 0,
          duration: 12,
          openDialog: false,
          source: this.props.sources,
          width: 0,
          down: false,
          text: 'Test 1'
        }
    }

    render()
    {
        const { classes } = this.props;

        var w = 0; //this.props.introName == "RandevuList" ? 0 : '40px'
        var activeBuffer = this.state.activeStory % 2;
        var nextVideoIndex = this.state.activeStory + 1 == this.state.source.length ? 0 : this.state.activeStory + 1;
        var videoRefCalc = activeBuffer == 0 ? this.videoRef : this.videoRefBfr;
        var videoRefNextCalc = activeBuffer == 1 ? this.videoRef : this.videoRefBfr;

        if (videoRefCalc != undefined && videoRefCalc.current != undefined && this.state.down == false) {
          videoRefCalc.current.play();
          videoRefNextCalc.current.pause();
        }

        return (
            <div className={classes.main}>
                {/* {this.state.activeStory + 1 < this.state.source.length && (
                  <video 
                    muted
                    playsInline
                    preload="auto" 
                    //controls={true}
                    type='video/mp4'
                    onLoadedData={() => {
                      console.log('loaded data for next of ', this.state.activeStory)
                      alert('loaded data for ' + this.state.source[this.state.activeStory] + ' ' + this.state.activeStory)
                    }}
                    onPlay={() => console.log('playing')}
                    onEnded={() => console.log('ended')}
                    src={
                      this.state.source[this.state.openDialog == false 
                        ? this.state.activeStory 
                        : this.state.activeStory + 1 == this.state.source.length 
                          ? 0 
                          : this.state.activeStory + 1]}
                    style={{zIndex: 10000, position: 'absolute', top: '50%', left: '50%', width: w, height: w}}>                 
                  </video>
                )} */}

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
                  {/* <div style={{zIndex: 10001, position: 'absolute', width: '100%', display: 'flex', padding: '12px 6px'}}>
                    <pre style={{color: 'orange', textShadow: '1px 1px 2px black, 0px 0px 1px black'}}>{this.state.text}</pre>
                  </div> */}
                  <div style={{zIndex: 9999, position: 'absolute', width: '100%', display: 'flex', padding: '12px 6px'}}>
                    {this.state.source.map((src, idx) => {
                      return (
                        <div key={idx} style={{flexGrow: 1, height: '2px', marginRight: '2px', background: 'rgba(255, 255, 255, 0.35)'}}>
                          {idx == this.state.activeStory &&
                            (<div style={{transition: `width ${this.state.duration}s linear`, width: this.state.width, height: '100%', backgroundColor: 'white'}}></div>)
                          }
                          {idx < this.state.activeStory &&
                            (<div style={{transition: `width 0s linear`, width: '100%', height: '100%', backgroundColor: 'white'}}></div>)
                          }
                        </div>
                      )
                    })}
                  </div>
                  <DialogContent style={{height: '100%', borderRadius: 0, color: 'white', padding:0, margin: 0}}>
                    <Grid style={{height: '100%'}} container spacing={0}>
                      <Grid 
                        style={{display: 'flex', zIndex: 9998}} item xs={4}
                        onTouchStart={() => {
                          this.setState({mouseDownStart: Date.now(), down: true})
                          videoRefCalc.current.pause()
                        }}
                        onTouchEnd={() => {
                          videoRefCalc.current.play()
                          this.setState({down: false})
                        }}
                        onMouseDown={() => {
                          this.setState({mouseDownStart: Date.now(), down: true})
                          videoRefCalc.current.pause()
                        }}
                        onMouseUp={() => {
                          videoRefCalc.current.play()
                          this.setState({down: false})
                        }}
                        onClick={() => {
                          var pressLength = Date.now() - this.state.mouseDownStart;
                          console.log('left', pressLength);

                          if (pressLength < 250 && this.state.activeStory > 0) {
                            this.setState({width: 0, duration: 0, activeStory: this.state.activeStory - 1})
                          }
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
                        item xs={8}
                        style={{display: 'flex', height: '100%', justifyContent: 'flex-end', zIndex: 9998}} 
                        onTouchStart={() => {
                          this.setState({mouseDownStart: Date.now(), down: true})
                          videoRefCalc.current.pause()
                        }}
                        onTouchEnd={() => {
                          videoRefCalc.current.play()
                          this.setState({down: false})
                        }}
                        onMouseDown={() => {
                          this.setState({mouseDownStart: Date.now(), down: true})
                          videoRefCalc.current.pause()
                        }}
                        onMouseUp={() => {
                          videoRefCalc.current.play()
                          this.setState({down: false})
                        }}
                        onClick={() => {
                          var pressLength = Date.now() - this.state.mouseDownStart;
                          console.log('right', pressLength);

                          if (pressLength < 250) {
                            if (this.state.activeStory + 1 == this.state.source.length) {
                              this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                            } else {
                              this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                            }
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
                      onClick={() => this.setState({width: 0, duration: 0, openDialog: false})}>
                        <CloseIcon />
                    </IconButton>

                    <video 
                      key={activeBuffer == 0 ? `key-video-${this.state.activeStory}` : `key-video-${nextVideoIndex}`}
                      muted
                      playsInline
                      preload="auto" 
                      autoPlay
                      //controls={true}
                      type='video/mp4'
                      onLoadedData={() => {
                        console.log('loaded data for ', this.state.activeStory)
                        this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] loaded ustteki'})
                        // alert('loaded ustteki')
                        if (this.state.activeStory == 0 && activeBuffer == 0) {
                          this.videoRef.current.play()
                        }
                      }}
                      ref={this.videoRef}
                      onPause={() => {
                        if (activeBuffer == 0) {
                          this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] paused ustteki'})
                          var progress = this.videoRef.current.currentTime * 100.0 / this.videoRef.current.duration;                      
                          console.log(this.videoRef.current.currentTime, progress)
                          this.setState({width: `${progress}%`, duration: this.videoRef.current.duration - this.videoRef.current.currentTime})
                        }
                      }}
                      poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      onPlay={() => {
                        if (activeBuffer == 0) {
                          this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] play ustteki'})
                          this.state.openDialog && this.setState({width: '100%', duration: this.videoRef.current.duration - this.videoRef.current.currentTime})
                        }
                      }}
                      onEnded={() => {
                        if (this.state.activeStory + 1 == this.state.source.length) {
                          this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                        } else {
                          this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                        }
                      }}
                      src={this.state.source[activeBuffer == 0 ? this.state.activeStory : nextVideoIndex]}
                      style={{zIndex: activeBuffer == 0 ? 9997 : 9996, position: 'absolute', top: '26px', width: '100%', height: 'calc(100% - 26px)'}}>                
                    </video>
                    <video 
                      key={activeBuffer == 1 ? `key-video-${this.state.activeStory}` : `key-video-${nextVideoIndex}`}
                      muted
                      playsInline
                      preload="auto" 
                      autoPlay
                      poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      //controls={true}
                      type='video/mp4'
                      onLoadedData={() => {
                        console.log('loaded data for 2.', this.state.activeStory)
                        this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] loaded alttaki'})
                      }}
                      ref={this.videoRefBfr}
                      onPause={() => {
                        if (activeBuffer == 1) {
                          this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] paused alttaki'})
                          var progress = this.videoRefBfr.current.currentTime * 100.0 / this.videoRefBfr.current.duration;                      
                          console.log(this.videoRefBfr.current.currentTime, progress)
                          this.setState({width: `${progress}%`, duration: this.videoRefBfr.current.duration - this.videoRefBfr.current.currentTime})
                        }
                      }}
                      //poster="/static/favicon.png"
                      onPlay={() => {
                        if (activeBuffer == 1) {
                          this.setState({text: this.state.text + '\n[' + new Date().getSeconds() + '] play alttaki'})
                          this.state.openDialog && this.setState({width: '100%', duration: this.videoRefBfr.current.duration - this.videoRefBfr.current.currentTime})
                        }
                      }}
                      onEnded={() => {
                        if (this.state.activeStory + 1 == this.state.source.length) {
                          this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                        } else {
                          this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                        }
                      }}
                      src={this.state.source[activeBuffer == 1 ? this.state.activeStory : nextVideoIndex]}
                      style={{zIndex: activeBuffer == 1 ? 9997 : 9996, position: 'absolute', top: '26px', width: '100%', height: 'calc(100% - 26px)'}}>                
                    </video>
                  </DialogContent>
                </Dialog>
                
                {/* <Grid container spacing={0} >
                    <Grid item xs={12}>
                        <div style={{position: 'relative', margin: 'auto', minWidth: '128px', maxWidth: '144px', width: '33%'}}> */}
                        <div style={{width: '100%', paddingTop: '100%'}}></div>
                        <div style={{position: 'absolute', top:0, bottom: 0}}>
                            <style>
                            {
                              `@keyframes rotate {
                                  from{ transform: rotate(0deg); }
                                  to{ transform: rotate(360deg); }
                              }
                              .MuiAvatar-fallback {
                                width: 100%;
                                height: 100%;
                              }`
                            }
                            </style>
                            {this.props.border != false && 
                              <div style={{animation: 'rotate 3s linear infinite'}} className={classes.avatarWrapper}>
                              </div>
                            }
                            <Avatar 
                              imgProps={{style: {borderRadius: '50%', backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='}}} 
                              onClick={() => {
                                registerEvent("WatchIntroVideo_" + this.props.introName)
                                this.setState({activeStory: 0, openDialog: true})
                              }} 
                              src={this.props.infoHighlightSrc} 
                              className={classes.avatar} />
                        </div>
                        {/* </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="div" style={{padding: '16px', textAlign: 'center'}} color="textSecondary" variant="body1">{this.props.noItemText}</Typography>
                    </Grid>
                </Grid> */}
            </div>
        )
    }
}

export default withStyles(styles)(RandevuIntro);

import { AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import withWidth from '@material-ui/core/withWidth';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import classNames from "classnames";
import React from 'react';
import { userService } from '../../services/user.service';
import ExtendedLink from "../ExtendedLink";

const styles = theme => ({
    floatingPoint: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      position: 'absolute',
    },
    paperProps: {
      width: '100%', 
      top: '8px',
      left: '8px',
      [theme.breakpoints.up(750 + theme.spacing(6))]: {
        width: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        left: 0,
      },
    },
    layoutToolbar: {
      width: 'auto',
      color: '#262626',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      padding: 0,
      // flexDirection: 'row',
      // display: 'flex',
      justifyContent: 'space-between',
      minHeight: theme.spacing(7),
    //   [theme.breakpoints.up(750 + theme.spacing(6))]: {
    //     width: 750,
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //   },
    },
    maxWidthToolbar: {
        width: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    appBar: {
      backgroundColor: 'transparent',
      color: 'rgb(38,55,70)',
    },
});

class HeaderV2 extends React.Component {

    constructor(props) {
        super(props)

        this.handleMenuClose = this.handleMenuClose.bind(this)
        this.handleMenuOpen = this.handleMenuOpen.bind(this)

        this.state = {
            anchorEl: undefined,
            user: localStorage.getItem('user') == undefined ? undefined : JSON.parse(localStorage.getItem('user')),
        }
    }

    componentDidMount() {
        var user = localStorage.getItem('user') == undefined ? undefined : JSON.parse(localStorage.getItem('user'));

        if (this.state.user != user) {
            this.setState({user: user})
        }
    }

    handleMenuOpen(event)
    {
        this.setState({anchorEl: event.currentTarget})
    }

    handleMenuClose()
    {
        this.setState({anchorEl: undefined})
    }

    render() {
        const { classes } = this.props;

        // console.log('sidebar', 'headerv2', this.props)
        const leftOffset = this.props.permanentDrawer && this.state.user != undefined && this.props.sideBar != false ? '240px' : '0px';

        return (
            <div style={{height: '54px', display: 'block'}}>
                <div style={{position: this.props.static ? 'fixed' : 'relative', zIndex: 1200, width: '100%'}}>
                    <div style={{position:'absolute', left: leftOffset, top:0, width: `calc(100% - ${leftOffset})`, height: '54px', overflow: 'hidden', background: 'linear-gradient(150deg,#281483 15%,#8f6ed5 70%,#d782d9 94%)'}}>

                        <span className={classes.floatingPoint} style={{width: '150px', height: '150px', left: '-4%', bottom: 'auto'}}></span>
                        <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '4%', top: '10%'}}></span>
                        <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '5%', top: '280px'}}></span>
                        <span className={classes.floatingPoint} style={{width: '75px', height: '75px', right: '7%', top: '320px'}}></span>
                        <span className={classes.floatingPoint} style={{width: '100px', height: '100px', left: '1%', top: '38%'}}></span>
                        <span className={classes.floatingPoint} style={{width: '200px', height: '200px', left: '10%', top: '44%'}}></span>
                        <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '36%', bottom: '50%'}}></span>
                        <span className={classes.floatingPoint} style={{width: '100px', height: '100px', right: '2%', bottom: '70px'}}></span>
                        <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '2%', bottom: '1%'}}></span>
                        <span className={classes.floatingPoint} style={{width: '100px', height: '100px', left: '1%', bottom: '1%'}}></span>
                    </div> 

                    <AppBar elevation={0} position="fixed" style={{left: leftOffset}} className={classes.appBar}>
                        <Toolbar 
                            className={classNames(classes.layoutToolbar, {
                                [classes.maxWidthToolbar]: this.props.permanentDrawer && (this.state.user == undefined || this.props.sideBar == false)
                            })}
                        >
                        
                        {this.props.title && (
                            <Typography variant="h6" style={{position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', left: 0, width: `calc(100% - ${leftOffset})`, top: 0, height: '56px', fontWeight: 400, color: 'white', textAlign: 'center', fontFamily: 'Open Sans,sans-serif'}}>
                                {this.props.title}
                            </Typography>
                        )}
                        { this.props.backButton && (
                            <IconButton edge="start" component={ExtendedLink} to={this.props.backButton} style={{color: 'white'}}>
                                <ChevronLeftIcon style={{width: '32px', height: '32px'}} />
                            </IconButton>
                        )}
                        { this.props.onBackButtonClick && (
                            <IconButton edge="start" onClick={this.props.onBackButtonClick} style={{color: 'white'}}>
                                <ChevronLeftIcon style={{width: '32px', height: '32px'}} />
                            </IconButton>
                        )}
                        
                        {!this.noButton && !this.props.backButton && !this.props.onBackButtonClick && (
                            <span edge="start" style={{display: 'flex'}}>
                                <Avatar alt="diyet koçum diyetisyen asistan" edge="start" src='/static/favicon.png' style={{marginRight: '4px', width: '32px', height:'32px'}}/>
                                {!this.props.title && (
                                    <Typography variant="h6" style={{position: 'absolute', display: 'flex', alignItems: 'center', left: '36px', width: 'calc(100% - 36px)', top: 0, height: '56px', fontWeight: 100, color: 'white', textAlign: 'center', fontFamily: 'Prompt,sans-serif'}}>
                                        diyetkoçum
                                    </Typography>
                                )}
                            </span>
                        )}

                        {(!this.props.permanentDrawer || this.state.user == undefined || this.props.sideBar == false) &&
                            <IconButton onClick={this.props.overrideMenuClick ? () => this.props.overrideMenuClick() : this.handleMenuOpen} component="span" style={{color: 'white'}}>
                                <Badge variant="dot" badgeContent={this.props.showBadge ? 1 : 0} color="secondary">
                                    <MenuRoundedIcon style={{width: '32px', height: '32px'}} />
                                </Badge>
                            </IconButton>
                        }
                        {/* {this.props.permanentDrawer && this.state.user == undefined &&
                            <span edge="end">
                                <Button color="secondary" style={{fontFamily: 'Prompt, sans-serif', color: 'white', marginRight: '8px'}} component={ExtendedLink} to="/enler">
                                    HAFTANIN ENLERİ
                                </Button>
                                <Button color="secondary" style={{fontFamily: 'Prompt, sans-serif', color: 'white', marginRight: '8px'}} component={ExtendedLink} to="/blog">
                                    BLOG YAZILARI
                                </Button>
                                <Button variant="contained" style={{backgroundColor: 'rgb(252, 81, 133)', color: 'white'}} component={ExtendedLink} to="/signin">
                                    GİRİŞ YAP
                                </Button>
                            </span>
                        } */}
                        </Toolbar>
                    </AppBar>

                    <Menu
                        id="fade-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={this.state.anchorEl != undefined}
                        onClose={this.handleMenuClose}
                        TransitionComponent={Fade}
                        style={{width: '100%'}}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            { top: 8, left: 8 }
                        }
                        PaperProps={{
                            className: classes.paperProps
                        }}
                    >
                        {this.state.user && 
                            <MenuItem component={ExtendedLink} to={"/"} onClick={this.handleMenuClose}>
                                <ListItemIcon>
                                    <Avatar src={userService.getStaticFileUri(this.state.user.url)}/>
                                </ListItemIcon>
                                {this.state.user.name}
                            </MenuItem>
                        }
                        {this.state.user && 
                                <Divider style={{marginTop: '8px'}}/>
                        }
                        <MenuItem component={ExtendedLink} to={"/"} onClick={this.handleMenuClose}>Anasayfa</MenuItem>
                        {!this.state.user && <MenuItem component={ExtendedLink} to={"/signin"} onClick={this.handleMenuClose}>Diyetisyen Girişi</MenuItem>}
                        {!this.state.user && <MenuItem component={ExtendedLink} to={"/signup"} onClick={this.handleMenuClose}>Diyetisyen Kaydı</MenuItem>}
                        {/* <MenuItem component={ExtendedLink} to={"/enler"} onClick={this.handleMenuClose}>Haftanın Enleri</MenuItem> */}
                        <MenuItem component={ExtendedLink} to={"/blog"} onClick={this.handleMenuClose}>Blog Yazıları</MenuItem>
                        {/* {this.state.user && <MenuItem onClick={this.props.logout}>Logout</MenuItem>} */}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withWidth()(withStyles(styles)(HeaderV2));
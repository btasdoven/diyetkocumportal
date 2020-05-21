import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import { userService } from '../../services/user.service'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AppBar, Toolbar, Box } from "@material-ui/core";

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
      [theme.breakpoints.up(750 + theme.spacing(6))]: {
        width: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
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

        console.log(this.state)

        return (
            <div style={{height: '54px', display: 'block'}}>
                <div style={{position: this.props.static ? 'relative' : 'relative', width: '100%'}}>
                    <div style={{position:'absolute', top:0, width: '100%', height: '54px', background: 'linear-gradient(150deg,#281483 15%,#8f6ed5 70%,#d782d9 94%)'}}>

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

                    <AppBar elevation={0} position="static" className={classes.appBar}>
                        <Toolbar className={classes.layoutToolbar}>
                        
                        {this.props.title && (
                            <Typography variant="h6" style={{position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', left:0, width: '100%', top: 0, height: '56px', fontWeight: 400, color: 'white', textAlign: 'center', fontFamily: 'Open Sans,sans-serif'}}>
                                {this.props.title}
                            </Typography>
                        )}
                        { this.props.backButton && (
                            <IconButton edge="start" component={Link} to={this.props.backButton} style={{color: 'white'}}>
                                <ChevronLeftIcon style={{width: '32px', height: '32px'}} />
                            </IconButton>
                        )}
                        { this.props.onBackButtonClick && (
                            <IconButton edge="start" onClick={this.props.onBackButtonClick} style={{color: 'white'}}>
                                <ChevronLeftIcon style={{width: '32px', height: '32px'}} />
                            </IconButton>
                        )}
                        { !this.props.backButton && !this.props.onBackButtonClick && (
                            <span edge="start" style={{display: 'flex'}}>
                                <Avatar edge="start" src='/static/favicon.png' style={{marginRight: '4px', width: '32px', height:'32px'}}/>
                                {!this.props.title && (
                                    <Typography variant="h6" style={{position: 'absolute', display: 'flex', alignItems: 'center', left: '36px', width: 'calc(100% - 36px)', top: 0, height: '56px', fontWeight: 100, color: 'white', textAlign: 'center', fontFamily: 'Prompt,sans-serif'}}>
                                        diyetkoçum
                                    </Typography>
                                )}
                            </span>
                        )}
                        <IconButton onClick={this.handleMenuOpen} component="span" style={{color: 'white'}}>
                            <MenuRoundedIcon style={{width: '32px', height: '32px'}} />
                        </IconButton>
                        {/* <Button size="small" className={classes.loginButton} variant="contained" color="primary" component={Link} to="/signin">
                            KAYDOL
                        </Button> */}
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
                            <MenuItem component={Link} to={"/"} onClick={this.handleMenuClose}>
                                <ListItemIcon>
                                    <Avatar src={userService.getStaticFileUri(this.state.user.url)}/>
                                </ListItemIcon>
                                {this.state.user.name}
                            </MenuItem>
                        }
                        {this.state.user && 
                                <Divider style={{marginTop: '8px'}}/>
                        }
                        <MenuItem component={Link} to={"/"} onClick={this.handleMenuClose}>Anasayfa</MenuItem>
                        {!this.state.user && <MenuItem component={Link} to={"/signin"} onClick={this.handleMenuClose}>Giriş Yap</MenuItem>}
                        {!this.state.user && <MenuItem component={Link} to={"/signup"} onClick={this.handleMenuClose}>Kayıt Ol</MenuItem>}
                        <MenuItem component={Link} to={"/enler"} onClick={this.handleMenuClose}>Haftanın Enleri</MenuItem>
                        <MenuItem component={Link} to={"/blog"} onClick={this.handleMenuClose}>Blog Yazıları</MenuItem>
                        {/* {this.state.user && <MenuItem onClick={this.props.logout}>Logout</MenuItem>} */}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HeaderV2);
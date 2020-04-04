import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { Form, Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDanisanMessages, addDanisanMessage } from '../../store/reducers/api.danisanMessages'
import withWidth from '@material-ui/core/withWidth';

import { userService } from '../../services/user.service'

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
    },
    paper: {
      padding: theme.spacing(1)
    },
    root: {
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    },
    rootLoading: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        width: '100%',
        alignItems: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        //textAlign: 'center',
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    search: {
      position: 'relative',
      borderRadius: theme.spacing(4), //theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.95),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.99),
      },
      margin: theme.spacing(1),
      padding: theme.spacing(0.5),
      flex: 1
    },
  });

  
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
    <InputBase
      label={label}
      error={touched && invalid}
      {...input}
      {...custom}
      color="primary"
    />
  )

class DefaultChatMsg extends React.Component {
    
    messagesEndRef = React.createRef()

    constructor(props) {
        super(props);
    
        this.isLoaded = this.isLoaded.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.onSubmitInternal = this.onSubmitInternal.bind(this);
    }

    isLoaded() {
      console.log(this.props);
  
      var loaded = this.props.apiDanisanMessages != undefined &&
        this.props.apiDanisanMessages[this.props.userId] != undefined &&
        this.props.apiDanisanMessages[this.props.userId][this.props.danisanUserName] != undefined && 
        //this.props.apiDanisanMessages[this.props.userId][this.props.danisanUserName].isGetLoading != true &&
        this.props.apiDanisanMessages[this.props.userId][this.props.danisanUserName].data != undefined;
  
        console.log(loaded);
        return loaded;
    }
  
    componentDidMount() {
      if (!this.isLoaded()) {
        this.props.getDanisanMessages(this.props.userId, this.props.danisanUserName);
      }

      this.scrollToBottom()
    }

    componentDidUpdate () {
      this.scrollToBottom()
    }

    scrollToBottom = () => {
        if (!this.messagesEndRef.current) {
            return;
        }

        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    onSubmitInternal(formValues) {
        console.log(formValues);
        var message = {
            id: Date.now(),
            sentByDietitian: this.props.isDanisanView != true,
            danisanUserName: this.props.danisanUserName,
            unread: 0,
            message: formValues.message,
            type: 'text',
        }

        if (formValues.message != undefined) {
          this.props.addDanisanMessage(this.props.userId, this.props.danisanUserName, message);
        }
        
        this.props.reset();
    }

    render() {
        const { classes } = this.props;
        const showLoader = !this.isLoaded();

        const messages = showLoader ? undefined : this.props.apiDanisanMessages[this.props.userId][this.props.danisanUserName].data;
        console.log(messages);
        var prevMsgs = [];
        var dietitianUrl = undefined;
        var danisanUrl = undefined;

        return (
            <div>
                <div className={classes.root}>
                    {messages && Object.keys(messages).map( (mid, idx) => {
                        var msg = messages[mid];
                        
                        dietitianUrl = msg.dietitianUrl ? userService.getStaticFileUri(msg.dietitianUrl) : dietitianUrl;
                        danisanUrl = msg.danisanUrl ? msg.danisanUrl : danisanUrl;
                        console.log(dietitianUrl);

                        prevMsgs.push(msg)
                        if (Object.keys(messages).length > idx + 1) {
                            var nextMid = Object.keys(messages)[idx+1]
                            if (msg.sentByDietitian == messages[nextMid].sentByDietitian) {
                                return;
                            }
                        }
                        
                        var msgs = prevMsgs.map((m) => m.message);
                        prevMsgs = [];

                        var isMe = (msg.sentByDietitian && this.props.isDanisanView != true) || (!msg.sentByDietitian && this.props.isDanisanView == true);

                        return (
                            <ChatMsg
                                key={idx}
                                avatar={msg.sentByDietitian ? dietitianUrl : danisanUrl}
                                side={isMe ? 'right' : 'left'}
                                messages={msgs}
                            />
                        )
                    })}
                    <div ref={this.messagesEndRef} />
                </div>
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                    name={this.props.name}
                >
                    <AppBar style={{ width: this.props.width != 'xs' && this.props.width != 'sm' ? 'calc(100% - 240px)' : '100%', left: this.props.width != 'xs' && this.props.width != 'sm' ? '240px' : 0}} elevation={0} position="fixed" color="inherit" className={classes.appBar}>
                        <Divider />
                        <Toolbar variant="dense" disableGutters={true} >
                            <Field
                                name="message"
                                className={classes.search}
                                component={renderTextField}
                                placeholder="Mesaj yaz..."
                                // value={this.state.searchKey}
                                // startAdornment={
                                //     <InputAdornment className={classes.searchIconStart} position="start">
                                //         <SearchIcon />
                                //     </InputAdornment>
                                // }
                                // endAdornment={this.state.searchKey != '' &&
                                //     <InputAdornment position="end">
                                //         <ClearIcon onClick={() => this.setState({ searchKey: '' })} />
                                //     </InputAdornment>
                                // }
                            />
                            <IconButton type="submit" onClick={this.props.handleSubmit(this.onSubmitInternal)} color="primary" className={classes.iconButton}>
                                <SendIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Form>
            </div>
        )
    }
};  


const mapStateToProps = (state, ownProps) => {  
    return {
      apiDanisanMessages: state.apiDanisanMessages
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getDanisanMessages: (userId, danisanUserName) => getDanisanMessages(userId, danisanUserName),
        addDanisanMessage: (userId, danisanUserName, message) => addDanisanMessage(userId, danisanUserName, message)
      },
      dispatch
    );
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: 'MesajForm', enableReinitialize: true })(withStyles(styles)(withWidth()(DefaultChatMsg))));
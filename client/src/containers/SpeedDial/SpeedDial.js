import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';
import { registerEvent } from '../../components/Signin/PageTracker';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  speedDial: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(undefined);

  const handleClick = () => {
    
    registerEvent("ClickSpeedDial_" + props.eventText)
    props.onClickFab && props.onClickFab();

    if (props.actions) {
      setOpen(prevOpen => !prevOpen);
      setAction(undefined);
    }
  };

  const handleBlur = () => {
    // console.log("handleBlur")
    setOpen(false)
  };

  const handleClose = () => {
    // console.log("handleClose")
    setOpen(false)
  };

  const handleOpen = () => {
    // console.log("handleOpen")
    setOpen(true);
  };

  const handleMouseEnter = () => {
    // console.log("handleMouseEnter")
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // console.log("handleMouseLeave")
    // console.log(action);
    action != undefined && action[0](action[1]);
    //action != undefined && action();
    setAction(undefined);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        {/* <Fab color="primary" style={{display: props.hidden == true ? 'none' : 'inline-flex'}} className={classes.speedDial} variant="extended">
          Navigate
          {props.icon}
        </Fab> */}
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={props.iconText != undefined
            ? <div style={{display: 'inline-flex'}}>{props.iconText} <SpeedDialIcon style={{marginLeft: '8px'}} icon={props.icon}/></div>
            : <SpeedDialIcon icon={props.icon}/>
          }
          onBlur={handleMouseLeave}
          onClick={handleClick}
          onClose={handleClose}
          hidden={props.hidden || false}
          // onFocus={handleOpen}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          open={open}
          direction="up"
          FabProps={props.iconText != undefined ? {variant: 'extended'} : {}}
        >
          {props.actions && props.actions.map((act, idx) => (
            <SpeedDialAction
                tooltipOpen
                key={act.name}
                icon={act.icon}
                tooltipTitle={<Typography variant="caption">{act.name}</Typography>}
                onClick={() => 
                {
                  // console.log("actionCLick", act.onClick)

                  if (act.onClick != undefined) {
                      setAction([act.onClick, act.name]); 
                  }
                  //e.preventDefault();
                  setOpen(prevOpen => !prevOpen);
                }}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}

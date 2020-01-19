import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import { capitalize } from '@material-ui/core/utils';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  exampleWrapper: {
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
    props.onClickFab && props.onClickFab();
    if (props.actions) {
      setOpen(prevOpen => !prevOpen);
      setAction(undefined);
    }
  };

  const handleBlur = () => {
    console.log("handleBlur")
    setOpen(false)
  };

  const handleClose = () => {
    console.log("handleClose")
    setOpen(false)
  };

  const handleOpen = () => {
    console.log("handleOpen")
    setOpen(true);
  };

  const handleMouseEnter = () => {
    console.log("handleMouseEnter")
    setOpen(true);
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave")
    console.log(action);
    action != undefined && action[0](action[1]);
    //action != undefined && action();
    setAction(undefined);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={props.icon || <SpeedDialIcon />}
          onBlur={handleMouseLeave}
          onClick={handleClick}
          onClose={handleClose}
          hidden={props.hidden || false}
          // onFocus={handleOpen}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          open={open}
          direction="up"
        >
          {props.actions && props.actions.map((act, idx) => (
            <SpeedDialAction
                // tooltipOpen
                key={act.name}
                icon={act.icon}
                tooltipTitle={act.name}
                onClick={() => 
                {
                  console.log("actionCLick")
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

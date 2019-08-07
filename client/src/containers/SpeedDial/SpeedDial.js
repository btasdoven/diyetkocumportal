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
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(9),
  },
}));

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    props.onClickFab && props.onClickFab();
    setOpen(prevOpen => !prevOpen);
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

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          // onBlur={handleBlur}
          onClick={handleClick}
          // onClose={handleClose}
          // onFocus={handleOpen}
          // onMouseEnter={handleOpen}
          // onMouseLeave={handleClose}
          open={open}
          direction="up"
        >
          {props.actions.map(action => (
            <SpeedDialAction
                tooltipOpen
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => 
                {
                  console.log("actionCLick")
                    if (action.onClick != undefined) {
                        action.onClick(action.name); 
                    }

                    setOpen(prevOpen => !prevOpen);
                }}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}

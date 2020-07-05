import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  rootLoading: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    width: '100%',
    alignItems: "center",
    padding: theme.spacing(5)
  },
  buttonProgress: {
    top: '50%',
    left: '50%',
  },
});

export default withStyles(styles)((props) =>
  <div className={props.classes.rootLoading}>
    <CircularProgress size={24} className={props.classes.buttonProgress} />
  </div>
);
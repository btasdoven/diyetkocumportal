import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PaletteIcon from "@material-ui/icons/Palette";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { Badge } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import dateFnsFormat from 'date-fns/format';

import SpeedDial from "./SpeedDial/SpeedDial"
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

import DairyList from './Dairy/DairyList'

const styles = theme => ({
  toolbarRoot: {
    // paddingRight: theme.spacing(1),
    // paddingLeft: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
  },
  icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    margin: theme.spacing(1.25),
    display: 'flex'
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar: {
  },
  prevButton: {
    transform: 'rotate(90deg)',
  },
  nextButton: {
    transform: 'rotate(270deg)',
  }
});

function History(props) {
    const [selectedDate, handleDateChange] = React.useState(new Date());
    const classes = props.classes;

    const ChangeDate = (dayDiff) => {
      selectedDate.setDate(selectedDate.getDate() + dayDiff)
      handleDateChange(new Date(selectedDate));
    }

    return (  
      <span>
        <span className={classes.toolbarRoot}>
          <IconButton
            className={classes.prevButton}
            onClick={() => ChangeDate(-1)}
          >
            <ExpandMoreIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="inherit"
            noWrap
            className={classes.title}
          >
            { dateFnsFormat(selectedDate, 'd MMMM yyyy') }
          </Typography>
          <IconButton
            className={classes.nextButton}            
            onClick={() => ChangeDate(1)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </span>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="static"
            disableToolbar={true}
            value={selectedDate}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
              //const date = makeJSDateObject(day); // skip this step, it is required to support date libs
              const isSelected = isInCurrentMonth && selectedDays.includes(selectedDate.getDate());

              // You can also use our internal <Day /> component
              return <Badge badgeContent={isSelected ? "🌚" : undefined}>{dayComponent}</Badge>;
            }}
          />
        </MuiPickersUtilsProvider> */}

        <DairyList />

        <SpeedDial 
          onClickFab={() => 
          {
            console.log('default')
          }}
          actions={[
            { icon: <FileCopyIcon />, name: 'Copy', onClick: (btnName) => console.log(btnName)},
            { icon: <SaveIcon />, name: 'Save', onClick: (btnName) => console.log(btnName) },
            { icon: <PrintIcon />, name: 'Print', onClick: (btnName) => console.log(btnName) },
            { icon: <ShareIcon />, name: 'Share', onClick: (btnName) => console.log(btnName) },
            { icon: <DeleteIcon />, name: 'Delete', onClick: (btnName) => console.log(btnName) },
          ]}
        />
      </span>
    )
}

export default withStyles(styles)(History);
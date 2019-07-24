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

function History() {
    const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
    const [selectedDate, handleDateChange] = useState(new Date());

    const handleMonthChange = async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };

    return (  
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      </MuiPickersUtilsProvider>
    )
}

export default History;
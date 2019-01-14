import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { itemsFetchData, itemsPutData } from '../store/reducers/api.fields';
import { groupsFetchData } from '../store/reducers/api.groups';

import { withStyles } from '@material-ui/core/styles';

import UserDataExpensionPanel from '../components/UserDataExpansionPanel'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../services";

import { Field } from "redux-form";

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    verticalAlign: 'middle',
  },
  table: {
    align: 'left'
  },
});

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      multiline
      label={label}
      {...input}
      {...custom}
      margin="dense"
      fullWidth
    />
)


function getFieldRefValue(self, fieldId) {
  var parts = fieldId.split('/');
  if (parts.length < 2) {
    return;
  }

  var groupId = parts[0];
  console.log(groupId);

  if (self.props.apiFields &&
    self.props.apiFields[groupId] && 
    self.props.apiFields[groupId].items.data[fieldId]) {
      var refField = self.props.apiFields[groupId].items.data[fieldId];
      console.log(refField);
      if (refField.type === "link") {
        console.log("link type")
        console.log(refField.link);
        getFieldRefValue(self, refField.link)
      } else {
        self.setState({
          refId: fieldId,
          refValue: refField.value
        });
      }
  } else {
    self.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id, groupId);
    self.setState({
      refId: fieldId
    });
  }
}

class LinkField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refId: '',
      refValue: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  componentDidMount() {
    if (this.props.fieldRef) {
      getFieldRefValue(this, this.props.fieldRef);
    }
  }

  handleOnChange(event) {
    if (this.props.fieldRef) {
      return;
    }

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    } 

    var fieldId = event.target.value;
    var parts = fieldId.split('/');

    if (parts.length >= 2) {
      var self = this;
      this.setState({
        typingTimeout: setTimeout(function () {
          getFieldRefValue(self, fieldId);
        }, 1000)
      });
    }
  }

  render() {
    console.log('linkfield')
    console.log(this.props);

    var key = this.props.fieldId
    var refValue = this.state.refValue;
    var parts = this.state.refId.split('/');

    if (!refValue && parts.length >= 2) {
      var groupId = parts[0];
      if (this.props.apiFields &&
        this.props.apiFields[groupId] && 
        this.props.apiFields[groupId].items &&
        this.props.apiFields[groupId].items.data[this.state.refId]) {
          var refField = this.props.apiFields[groupId].items.data[this.state.refId];
          if (refField.type === "link") {
            getFieldRefValue(this, refField.link);
          } else {
            refValue = this.props.apiFields[groupId].items.data[this.state.refId].value;
          }
      }
    }

    if (this.props.fieldRef) {
      var {fieldId, fieldRef, inputProps, className, disabled, multiline, id, name, label, helperText} = this.props;
      return <TextField
            disabled={disabled}
            key={key}
            name={name}
            id={id}
            inputProps={inputProps}
            multiline={multiline}
            className={className}
            label={label}
            value={'(' + fieldRef + ') ' + refValue}
            helperText={helperText}
      />
    } else {
      return (
        <Field
            key={key}
            name={key + '_link'}
            id={key + '_link'}
            component={renderTextField}
            label="Link"
            onChange={this.handleOnChange}
            helperText={refValue || ""}
        />
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    apiFields: state.apiFields
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      itemsFetchData: (userId, groupId) => itemsFetchData(userId, groupId)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LinkField));
